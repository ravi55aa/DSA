[33mcommit 184004e107e83eb672626535e9cb430e94b667d1[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmaster[m[33m, [m[1;31morigin/main[m[33m, [m[1;32mmain[m[33m)[m
Author: Ravi <rachouhan58@gmail.com>
Date:   Sun Jun 1 14:37:28 2025 +0530

    added new Class

[1mdiff --git a/LinkedList/practice.js b/LinkedList/practice.js[m
[1mindex 83398fb..700fa8b 100644[m
[1m--- a/LinkedList/practice.js[m
[1m+++ b/LinkedList/practice.js[m
[36m@@ -173,7 +173,21 @@[m [mobj.addANode(1); //1[m
 obj.addANode(2); //2[m
 obj.addANode(4); //3[m
 obj.addANode(5); //4[m
[31m- [m
 [m
 obj.readNodeAt(1);[m
 [m
[32m+[m[32m//create a dummy class and update it[m[41m [m
[32m+[m[32mclass WorkHard{[m
[32m+[m[32m    constructor(unknownVal){[m
[32m+[m[32m        this.val = unknownVal;[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    hardWork(){[m
[32m+[m[32m        console.log("You are a HardWorker");[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    lazy(){[m
[32m+[m[32m        console.log("You are a Lazy man..");[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[32m+[m
[1mdiff --git a/LinkedList/readAbilityCode.js b/LinkedList/readAbilityCode.js[m
[1mnew file mode 100644[m
[1mindex 0000000..2ba3ae3[m
[1m--- /dev/null[m
[1m+++ b/LinkedList/readAbilityCode.js[m
[36m@@ -0,0 +1,134 @@[m
[32m+[m[32mconst findAndValidateOrder = async(orderId)=>{[m
[32m+[m[32m    let error = {};[m
[32m+[m
[32m+[m[32m        if (!orderId) {[m
[32m+[m[32m            error[status] = HttpStatus.BAD_REQUEST;[m
[32m+[m[32m            error[message] =  "OrderId not found";[m
[32m+[m[32m            return error;[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        const order = await orderModel.findOne({ orderId: orderId }).populate("userId");[m
[32m+[m
[32m+[m[32m        if (!order) {[m
[32m+[m[32m            error[status] = HttpStatus.NOT_FOUND;[m
[32m+[m[32m            error[message] =  "Order not found";[m
[32m+[m[32m            return error;[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        if (order.refundProcessed) {[m
[32m+[m[32m            error[status] = HttpStatus.BAD_REQUEST;[m
[32m+[m[32m            error[message] =  "Refund already processed for this order";[m
[32m+[m[32m            return error;[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        order.status = "Order Returned";[m
[32m+[m[32m        order.refundProcessed = true;[m
[32m+[m[32m        await order.save();[m
[32m+[m[32m        return true;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mconst incrementStock =async(orderId)=>{[m
[32m+[m[32m    const order = await orderModel.findOne({orderId : orderId}).populate("userId");;[m
[32m+[m[32m    const allTheReturnedItems = await orderItemModel.find({[m
[32m+[m[32m        orderId: order._id,[m
[32m+[m[32m        status: "Delivered",[m
[32m+[m[32m    });[m
[32m+[m
[32m+[m[32m    await Promise.all([m
[32m+[m[32m        allTheReturnedItems.map(async (item) => {[m
[32m+[m[32m            await productModel.findByIdAndUpdate([m
[32m+[m[32m                item.product,[m
[32m+[m[32m                {[m
[32m+[m[32m                    $inc: { quantity: item.quantity },[m
[32m+[m[32m                    $set: { status: "available" },[m
[32m+[m[32m                },[m
[32m+[m[32m                { new: true }[m
[32m+[m[32m            );[m
[32m+[m[32m        })[m
[32m+[m[32m    );[m
[32m+[m
[32m+[m[32m    await orderItemModel.updateMany([m
[32m+[m[32m        { orderId: order._id, status: "Delivered" },[m
[32m+[m[32m        { status: "Returned" }[m
[32m+[m[32m    );[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mconst handle_order_delivered_returnRequest = async (req, res) => {[m
[32m+[m[32m    const { orderId } = req.params;[m
[32m+[m[32m    const order = await orderModel.findOne({orderId:orderId});[m
[32m+[m
[32m+[m[32m    const validateOrder = await findAndValidateOrder(orderId);[m
[32m+[m
[32m+[m[32m    if(validateOrder.length > 0){[m
[32m+[m[32m        res[m
[32m+[m[32m        .status(validateOrder.status)[m
[32m+[m[32m        .json([m[41m [m
[32m+[m[32m            {[m
[32m+[m[32m                mission:"failed",[m
[32m+[m[32m                message:validateOrder.message[m
[32m+[m[32m            }[m[41m [m
[32m+[m[32m        );[m
[32m+[m[32m        return false;[m
[32m+[m[32m    }[m
[32m+[m[41m    [m
[32m+[m[32m    try {[m
[32m+[m[32m        // Increment stock[m
[32m+[m[32m        await incrementStock(orderId);[m
[32m+[m
[32m+[m[32m        // Wallet Credit Logic (Unified for all payment methods)[m
[32m+[m[32m        const refundAmount = order.paymentAmount;[m
[32m+[m[32m        const refundDescription = `Refund for returned order #${orderId}`;[m
[32m+[m[32m        const userWallet = await walletModel.findOne({ userId: order.userId });[m
[32m+[m
[32m+[m[32m        const newTransaction = {[m
[32m+[m[32m            type: "credit",[m
[32m+[m[32m            amount: refundAmount,[m
[32m+[m[32m            description: refundDescription,[m
[32m+[m[32m            orderId: order._id,[m
[32m+[m[32m            transactId: generateTheRandomId(userWallet ? userWallet.transactions.length : 0),[m
[32m+[m[32m        };[m
[32m+[m
[32m+[m[32m        if (!userWallet) {[m
[32m+[m[32m            const wallet = await new walletModel({[m
[32m+[m[32m                userId: order.userId,[m
[32m+[m[32m                balance: refundAmount,[m
[32m+[m[32m                transactions: [newTransaction],[m
[32m+[m[32m            }).save();[m
[32m+[m
[32m+[m[32m            if (!wallet) {[m
[32m+[m[32m                return res.status(HttpStatus.CONFLICT).json({[m
[32m+[m[32m                    mission: "failed",[m
[32m+[m[32m                    message: "Cannot create wallet for refund",[m
[32m+[m[32m                });[m
[32m+[m[32m            }[m
[32m+[m[32m        } else {[m
[32m+[m[32m            const updatedWallet = await walletModel.updateOne([m
[32m+[m[32m                { userId: order.userId },[m
[32m+[m[32m                {[m
[32m+[m[32m                    $inc: { balance: refundAmount },[m
[32m+[m[32m                    $push: { transactions: newTransaction },[m
[32m+[m[32m                }[m
[32m+[m[32m            );[m
[32m+[m
[32m+[m[32m            if (updatedWallet.modifiedCount <= 0) {[m
[32m+[m[32m                return res.status(HttpStatus.CONFLICT).json({[m
[32m+[m[32m                    mission: "failed",[m
[32m+[m[32m                    message: "Failed to process refund to wallet",[m
[32m+[m[32m                });[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        return res.status(HttpStatus.OK).json({[m
[32m+[m[32m            mission: "success",[m
[32m+[m[32m            message: "Order returned and wallet credited successfully",[m
[32m+[m[32m        });[m
[32m+[m
[32m+[m[32m    } catch (err) {[m
[32m+[m[32m        console.log(err.message);[m
[32m+[m[32m        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({[m
[32m+[m[32m            mission: "failed",[m
[32m+[m[32m            message: "ServerError",[m
[32m+[m[32m            Error: err.message,[m
[32m+[m[32m        });[m
[32m+[m[32m    }[m
[32m+[m[32m};[m
\ No newline at end of file[m
