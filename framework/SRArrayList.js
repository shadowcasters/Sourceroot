
ArrayList.prototype = new Array;
ArrayList.prototype.constructor = ArrayList;
function ArrayList(){this.nodes=0;}
ArrayList.prototype.add = function(data){this[this.nodes]=(data); this.nodes++; return this;}
ArrayList.prototype.addAll = function(array){
     if(_SRIsArray(array))
     for(var i=0; i<array.length; i++)
         this.add(array[i]);
}
ArrayList.prototype.getIndex = function(key){
    var ret = null;
    for(var i=0; i<this.nodes; i++)
        if(this[i] === key)
            ret = i;

    if(ret != null) ret ++;
    return ret;
    
}

ArrayList.prototype.removeE = function(key_or_index){
 var retVal;

    if(key_or_index == null)
        return null;

    var idx = key_or_index;
    if(typeof key_or_index === "string")
        idx = this.getIndex(key_or_index);

    if(idx != null){
     //  retVal = this[idx-1];
       retVal = this.pop();
     //   delete this[idx-1]
       // retVal = this.splice(idx-1,1);
        this.nodes -= 1;
    }

    alert("internaly we say there is: "+this.nodes);
        return retVal;
}
/**
 * Index starts at 1. If index is omited it returns the first record.
 */
ArrayList.prototype.get = function(index){
    var ret;
    if(index != null && index > 0){
       ret = this[index -1];
    }else{
        if(index <= 0)
            throw("ArrayList Error: Index out of bounds: "+index);
        else
            ret = this[0];
    }
   
    return ret;
}
/** Returns either the index (one based) held by "key", or null if not found.*/

ArrayList.prototype.remove = function(key_or_index){ return _SRArrayRemoveElement(key_or_index, this);}
//ArrayList.prototype.getJsonObject = function(){return JSON.stringify(this);}
ArrayList.prototype.getSize = function(){return this.nodes;}
/** Inserts $data at the end of the list.*/
//ArrayList.prototype.append = function(data){this[this.nodes]=data; return this;}
/** Removes and returns the last record in this list.*/
ArrayList.prototype.getLast = function(){return this.get(this.nodes);}
ArrayList.prototype.getFirst = function(){return this.get();}
ArrayList.prototype.removeLast = function(){return this.removeE(this.nodes);}
ArrayList.prototype.asString = function(){
   var ret = "";
   var mar = ""
   var c = 0;
   while(ret = this[c]){

       mar += ret;
       c++;
   }
   return mar;
}

