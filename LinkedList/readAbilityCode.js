const findAndValidateOrder = async(orderId)=>{
    let error = {};

        if (!orderId) {
            error[status] = HttpStatus.BAD_REQUEST;
            error[message] =  "OrderId not found";
            return error;
        }

        const order = await orderModel.findOne({ orderId: orderId }).populate("userId");

        if (!order) {
            error[status] = HttpStatus.NOT_FOUND;
            error[message] =  "Order not found";
            return error;
        }

        if (order.refundProcessed) {
            error[status] = HttpStatus.BAD_REQUEST;
            error[message] =  "Refund already processed for this order";
            return error;
        }

        order.status = "Order Returned";
        order.refundProcessed = true;
        await order.save();
        return true;
}

const incrementStock =async(orderId)=>{
    const order = await orderModel.findOne({orderId : orderId}).populate("userId");;
    const allTheReturnedItems = await orderItemModel.find({
        orderId: order._id,
        status: "Delivered",
    });

    await Promise.all(
        allTheReturnedItems.map(async (item) => {
            await productModel.findByIdAndUpdate(
                item.product,
                {
                    $inc: { quantity: item.quantity },
                    $set: { status: "available" },
                },
                { new: true }
            );
        })
    );

    await orderItemModel.updateMany(
        { orderId: order._id, status: "Delivered" },
        { status: "Returned" }
    );
}

const handle_order_delivered_returnRequest = async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findOne({orderId:orderId});

    const validateOrder = await findAndValidateOrder(orderId);

    if(validateOrder.length > 0){
        res
        .status(validateOrder.status)
        .json( 
            {
                mission:"failed",
                message:validateOrder.message
            } 
        );
        return false;
    }
    
    try {
        // Increment stock
        await incrementStock(orderId);

        // Wallet Credit Logic (Unified for all payment methods)
        const refundAmount = order.paymentAmount;
        const refundDescription = `Refund for returned order #${orderId}`;
        const userWallet = await walletModel.findOne({ userId: order.userId });

        const newTransaction = {
            type: "credit",
            amount: refundAmount,
            description: refundDescription,
            orderId: order._id,
            transactId: generateTheRandomId(userWallet ? userWallet.transactions.length : 0),
        };

        if (!userWallet) {
            const wallet = await new walletModel({
                userId: order.userId,
                balance: refundAmount,
                transactions: [newTransaction],
            }).save();

            if (!wallet) {
                return res.status(HttpStatus.CONFLICT).json({
                    mission: "failed",
                    message: "Cannot create wallet for refund",
                });
            }
        } else {
            const updatedWallet = await walletModel.updateOne(
                { userId: order.userId },
                {
                    $inc: { balance: refundAmount },
                    $push: { transactions: newTransaction },
                }
            );

            if (updatedWallet.modifiedCount <= 0) {
                return res.status(HttpStatus.CONFLICT).json({
                    mission: "failed",
                    message: "Failed to process refund to wallet",
                });
            }
        }

        return res.status(HttpStatus.OK).json({
            mission: "success",
            message: "Order returned and wallet credited successfully",
        });

    } catch (err) {
        console.log(err.message);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            mission: "failed",
            message: "ServerError",
            Error: err.message,
        });
    }
};