class Node{
    constructor(data){
        this.data=data;
        this.next=null;
    }
}

/*
1.adding a node is clear;
2.adding at particular index is clear
3.readNodeAt is also valid one

reading all the node is clear
*/


class LinkedList {
    constructor(){
        this.head = null;
        this.nodeCount = 0;
    }

    checkIsValidIndex(index){
        if( index > this.nodeCount || isNaN(index)){
            return false;
        }
        return true;
    }

    addANode(value){
        const node = new Node(value) // {data:value,next:null}

        if(!this.head){
            this.head = node;
            this.nodeCount++;
            return true;
        }

        //traverse:
        let current = this.head;
        while(current.next){
            current = current.next;
        }

        current.next = node;  // {data:value, next : {data :value,next:null} }
        this.nodeCount++;
        return true;
    }


    addAt(pos,value){
        if(!this.checkIsValidIndex(pos)){
            return false; // provide the valid count;
        }

        if(!this.head){ // no-head, make this as head
            this.addANode(value);
            return true;
        }
        
        let node = new Node(value);

        if(pos <=1 ){ //handling the worst case;
            node.next= this.head;
            this.head =  node;
            return;
        }

        let count = 1;
        let current = this.head.next;
        let prev =  this.head;
        
        while(count < pos-1 && prev) {
            prev = current;
            current = current.next;
            count++;
        }

        prev.next = node;
        node.next = current;

        this.nodeCount++;
        return true;
    }

    //read
    readNodeAt(pos) {
        if(!this.checkIsValidIndex(pos)){ //validation;
            console.log(`${pos} is not valid`);
            return false;
        }
        let current = this.head;
        
        if(!current || !current.next){
            return this.head;
        }
        
        let count = 1;
        while(count < pos && current.data){
            current = current.next;
            count++;
        }

        console.log(current.data);
        return true;
    }

    readAll(){
        if(this.nodeCount <= 1){
            return this.head;
        }

        let eles = [];
        let current = this.head;

        while(current){ 
            eles.push(current.data);
            current = current.next; 
        }
        return eles;
    }

    //delete 1st index;
    deleteHead(){
        if (!this.head) {
            return false;
        }
        const current = this.head;
        this.head = current.next;
        return true;
    }

    //delete last index;
    deleteTail(){
        if (!this.head) {
            return false;
        }
        const current = this.head;
        
        while(current.next){
            current = current.next;
        }
        current =  null;
        return true;
    }

    //delete nth index;
    deleteNthNode(location){
        if (!this.head) {
            console.log("The head is null");
            return false;
        }

        if(location <=0 || !checkIsValidIndex(location)){
            console.log("Enter a valid index value");
            return false;
        }

        const current = this.head;
        const count = 0;

        while(location<count && current.next){
            current = current.next;
        }
        current.next = current.next.next;
        return true;
    }
}


const obj = new LinkedList();
obj.addANode(1); //1
obj.addANode(2); //2
obj.addANode(4); //3
obj.addANode(5); //4
 

obj.readNodeAt(1);

