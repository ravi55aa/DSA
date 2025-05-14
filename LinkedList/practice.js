class Node{
    constructor(data){
        this.data=data;
        this.next=null;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        this.nodeCount = 0;
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
            this.nodeCount++;
        }

        current.next = node;  // {data:value, next : {data :value,next:null} }
        this.nodeCount++;
        return true;
    }

    checkIsValidIndex(index){
        if( index > this.nodeCount || isNaN(index)){
            return false;
        }
        return true;
    }

    addAtIndex(index,value){
        if(!this.checkIsValidIndex){
            return false; // provide the valid count;
        }
        if(!this.head){ // no-head, make this as head
            this.addANode(value);
            return true;
        }
        let node = new Node(value);

        let count = 0;
        let current = this.head;
        
        while(count < index ){
            current = current.next;
        }
        node.next = current.next.next;
        current.next = node;
        
        this.nodeCount++;
        return true;
    }

    //read
    readNode(index) {
        if(!this.checkIsValidIndex){ //validation;
            return false;
        }
        const current = this.head;
        
        if(!current || !current.next){
            return this.head;
        }
        
        let count  = 0;
        while(count <= index && current.next){
            current = current.next;
            count++;
        }
        return count;
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


