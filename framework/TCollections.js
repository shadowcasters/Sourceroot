/*
 *
 * Tofui Collections Library V1.6
 *
 * TCollection
 * TList
 * TSet
 * TMap
 * TTree
 */
///////////////////////////////////////////
// ************ TCollection ************ //
///////////////////////////////////////////
/*
*<p>
*
*The basic prototype for TList type collections. Acts as a data object intended to augment or replace Array and Object as data stores in
*client side development.
*
*All functions have been benchmarked in every major browser and verified I/O speed to be far greater than or equal/nearly equal to Array's atomic functions.
*The objective of tofui collections core, is highest throughput performance with the lowest footprint possible.
*
*</p>
*
*
*<li>isValidIndex(index) : true if $index exists, false if does not or $index is NaN, zero or null.</li>
*<li>isEmpty() : returns true if there are no records in the dataset. Returns false otherwise.</li>
*<li>append(data) : adds data to the end of the data set.</li>
*<li>prepend(data) : adds data to the beginning of the data set.</li>
*<li>eat(array) : consumes an array placing its elements at the end of the collection.</li>
*<li>get(index) : returns the element at $index</li>
*<li>getIndexOf(key) : returns the index of the element specified in $key. Null if not found.</li>
*<li>harvest(callBack): removes each element in the list and sends it to callBack. if no callBack is passed it returns an array of the list.</li>
*<li>forEach(callBack): iterates over the list and sends each record and it's index to callback(data,index)</li>
*<li>sort(descending) : sorts the dataset, default to ascending. If decending is true, then sorts descending</li>
*<li>swap(target,destination) : swaps the two records indexed position.</li>
*<li>exportObject(fromIndex, toIndex): returns the data in this collection as an Object with the index of each record being the key. Optional span may be applied.</li>
*<li>exportArray(fromIndex, toIndex): returns the data in this collection as an Array. Optional span may be applied.</li>
*<li>remove(index) : removes data at specified index.</li>
*<li>removeLast() : removes &amp; returns the last record in the list.</li>
*<li>removeFirst() : removes &amp; returns the first record in the list.</li>
*<li>getSize() : returns the size of the list.</li>
*<li>getLast() : returns the last record in the list.</li>
*<li>getFirst() : returns the first record in the list.</li>
*<li>setValue(index,value) : replaces the record at $index with $value.</li>
*<li>getArray() : returns the Array that this object is marshaling. Altering this array, alters the collection's record set.</li>
*<li>toString() : return the records in this list as a string seperated by (,) comma.</li>
*<li>finalize() : immediate dereferencing of the collections assets. &nbsp;Event Calls: onFinalize.</li>

*/

function TCollection(){this.array = new Array;}

TCollection.prototype.isValidIndex=function(index){
    if(index && typeof index === "number" && index > 0 && !isNaN(index) && index <= this.array.length)
        return true;
    else
        return false
}

/**
 * returns true if there are no records in the dataset. Returns false otherwise.
 */
TCollection.prototype.isEmpty = function(data){
    return this.array.length>0?false:true;
}

/**
 * Inserts a single record at the end of the Collection. returns new TCollection size
 */
TCollection.prototype.append = function(data){
    this.array[this.array.length]=data;
    return this.array.length;
}

/**
 * Inserts a single record to the beginning of the Collection. returns new TCollection size
 */
TCollection.prototype.prepend = function(data){
    this.array.unshift(data);
    return this.array.length;
}

/**
 * dispatches the input array and appends it's contents to the end of this.array TCollection.
 */
TCollection.prototype.eat = function(array){
    for(var i=0;i<array.length; i++)
      this.append(array[i]);

    array.length=0;
    return this.array.length;
}

/**
 * returns the record at index, or null if index is invalid;
 */
TCollection.prototype.get = function(index){
     if(index === null || isNaN(index)){
      return null;
     }

    if(index != null && index > 0){
       return this.array[index -1];
    }else{
       return this.array[0];
    }
}

/**
 * If return_last_ocurrence is set to true, this.array method will return the last
 * known index of key. Otherwise it returns the first ocurrence of key or -1 if not found.
 */
TCollection.prototype.getIndexOf = function(key){

    if(this.array.indexOf){
        var ret=this.array.indexOf(key)+1;
        return ret;
    }else{

    var len = this.array.length;
    for(var i=0; i<len; i++)
        if(this.array[i] === key)
            return (i+1);

    }
    return null;
}

/**
 * iterates through the array removing every item and passing that item to the caller function.
 * If caller is not defined an array with the former content of this.array TCollection is returned insted.
 */
TCollection.prototype.harvest = function(caller){
   if(!caller){
     return this.array.splice(0,this.array.length);
   }else{
        while(this.array.length >0){
             caller(this.array.pop());
        }
   }
}

/**
 * iterates through the array passing each item, index to the caller function.
 * <br> caller can expect two (2) parameters: function caller(value, index){ do stuf...}
 * <br>
 * filter: a function that recives the data before it's sent to the caller function.
 * if filter is defined, then only the data that filter approves will be sent to caller.
 * By "approves", I mean filter must return true, else that record is skipped.
 *
 *  ex: data = [1,2,3,4,5,6,7];
 *  var str="my data:";
 *  forEach(
 *      function(d){str+=d+",";},
 *      function(p){
 *          if(p==5)
 *              return false;
 *          else
 *              return true;
 *      }
 *  );
 *
 *  str = 1,2,3,4,6,7
 */
TCollection.prototype.forEach = function(caller,BooleanQualificationFilter){
    if(!BooleanQualificationFilter || typeof filter!=="function"){
        for(var i=0; i<this.array.length; i++){
            caller(this.array[i],i+1);
        }
    }else{
        for(var i=0; i<this.array.length; i++){
            if(BooleanQualificationFilter(this.array[i]))
                caller(this.array[i],i+1);
        }
    }

}

/**
 * Sorts the list in Ascending order by default, if sortDecending is true then
 * the list is sorted in decending order.
 */
TCollection.prototype.sort = function(sortDescending){
   if(sortDescending){
        function OD(a, b){
            if(a > b)
                return -1
            if(a < b)
                return 1
            return 0;
        }
        this.array.sort(OD);
   }else{
       this.array.sort();
   }

}

/**
 * Moves a record from $index1 to $index2. and vice versa.
 *
 * Returns the data that was moved if successful, or null if the operation fails.
 *
 */
TCollection.prototype.swap = function(index1, index2){
     if(this.isValidIndex(index1) && this.isValidIndex(index2)){
        var i1 = index1 -1;
        var i2 = index2 -1;

        var hd = this.array.splice(i1,1,"-");
        this.array[i1] = this.array.splice(i2,1,hd);

        return 1;
     }
     return null;
}

/**
 * Returns a new Object that is unassociated with this.array TCollection. The format of this.array object is
 * {
 *   currentTCollectionIndex:value,
 *   currentTCollectionIndex:value
 * }
 *
 * by current TCollection index, we meen that the index is reflecting it's position in this.array TCollection. Not relative to 1 as the first node of the object.
 * <br>
 * <i> example </i> getObject(6-8); results in
 *      {
 *      "6","im # six! yeah!",
 *      "7","im # seven. so so.. ",
 *      "8","im # eight. I'll try harder next time."
 *      }
 *
 * <br>
 *  if you need this.array object with the numbers ordered from 1-length call getObject(); with no parameters and the result will be from 1-length
 */
TCollection.prototype.exportObject = function(fromIndex, toIndex){
    if(fromIndex ==null && toIndex==null){
        for(var r={}, i=this.array.length; i; r[i]=this.array[--i]);
        return r;
    }
    if(fromIndex == null) fromIndex = 1;
    if(toIndex == null) toIndex = this.array.length;

    var ret={};
    var clo = this.array.exportArray(fromIndex, toIndex);
    var ci = 0;
    for(;fromIndex<=toIndex; fromIndex++){
     ret[fromIndex]=clo[ci];
        ci++;
    }
    return ret;
}

/** Returns a copy of a portion of this.array TCollection as an array, if the from and to methods are omited, the result is an array with the full content of this.array TCollection */
TCollection.prototype.exportArray = function(fromIndex,toIndex){
    if(fromIndex == null && toIndex == null)
        return this.array.slice();

    toIndex = toIndex?toIndex:this.array.length;
    fromIndex = fromIndex?fromIndex-1:0;
    return this.array.slice(fromIndex, toIndex);
}

/**
 * Deletes the data at $index and shrinks the collection by one. and returns the
 * record that was removed.
 */
TCollection.prototype.remove = function(index){
    if(!this.isValidIndex(index))
        return null;

        if(index == 1)
            return this.removeFirst();
        if(index == this.array.length)
            return this.removeLast();


        return this.array.splice([index-1],1);
}

/**
 *Removes and returns the last record from this Collection.
 */
TCollection.prototype.removeLast = function(){return this.array.pop();}

/**
 *Removes and returns first record from this Collection.
 */
TCollection.prototype.removeFirst = function(){return this.array.shift();}

/**
 *Returns the number of records in this Collection
 */
TCollection.prototype.getSize = function(){return this.array.length;}

/**
 *Returns the last record in this.array Collection.
 */
TCollection.prototype.getLast = function(){if(this.array.length == 0)return null;return this.array[this.array.length -1];}

/**
 *Returns the first record in this.array Collection.
 */
TCollection.prototype.getFirst = function(){return this.array[0];}

/**
 *Alters the record at <i><b>index</i></b> and sets it to <i><b>value</b></i>.
 */
TCollection.prototype.setValue = function(index, value){this.update(index,value);}
/**
 *Alters the record at <i><b>index</i></b> and sets it to <i><b>value</b></i>. same as setValue.
 */
TCollection.prototype.update = function(index, value){this.array[(index>0?(index-1):index)]=value;}


/**
 *Returns the Array that is associated with this Collection.
 *Any modifications to this array will be reflected in the Collection.
 *If you need to have an array that is independent, call exportArray();
 */
TCollection.prototype.getArray = function(){return this.array;}

/**
 * Returns the string value of this array.
 */
TCollection.prototype.toString = function(){return this.array.toString()}

/**
 * A call to this will ensure that the memory this collection is sitting on will be freed immediately.
 * If an onFinalize method is defined, that will be called as well.
 */
TCollection.prototype.finalize = function(){
    this.array.length = 0;

    if(this.onFinalize)
        this.onFinalize();
}

/**
 *
 * Appends a range of contiguous numbers to the list, from startInt through endInt.
 * <br> ex: data=[a,b,c]
 * <br> addNumericSpan(3,6);
 * <br>
 * data now = [a,b,c,3,4,5,6]
 */
TCollection.prototype.addNumericSpan = function(startInt,endInt){
    for(;startInt<=endInt; startInt++)
       this.append(startInt);

    return this.array;
}


/////////////////////////////////////////////////////
// ******************** TList ********************** //
/////////////////////////////////////////////////////
/*
 * JS Fast collections: TList.js
 * Benchmarked against atomic array functions (where applicable) and every method here is as fast, or faster,
 * With a 10-milli second margin of error, across 20 samples, 100k itterations for each sample.
 *
 * Author: Richard Corsale
 * -------------------------------------
 *
 * getChunks(size) -> splits the list into arrays of $size and returns a collection containing these arrays.
 */


TList.prototype = new TCollection();
TList.prototype.constructor = TList;
function TList(){this.array = new Array;}


/**
 * Inserts $data at position $index and pushs the remainder of the stack down 1 position.
 * If index is omited or out of bounds (less than 1 or greater than length) data is prepended
 * to the TCollection in position 1.
 */
TList.prototype.add = function(data,index){

    if(!index || index == this.array.length)
        this.append(data);

    if(index === 1){
        this.array.unshift(data);
    }else{
        //// insert data at position and push the remainder of the stack down 1 position
        var nval = this.array.splice((index-1),(this.array.length));
        nval.unshift(data);
        this.eat(nval);
    }
    return this.array.length;
}

/**
 * Selects a random record from the array.
 * if min/max is specified, then the record returned will be in that range.
 */
TList.prototype.getRandom = function(min,max){
     var rint;
     if(min ==null && max==null){
         rint = Math.floor(Math.random()*this.array.length);
     }else{
        max = max || this.array.length;
        min = min || 0;
        rint = Math.floor(Math.random() * (max - min + 1)) + min;
     }
     return this.array[rint];
}

/**
 * Shuffles the content of this.array TCollection in random order.
 */
TList.prototype.shuffle = function (){
     for(var rnd, tmp, i=this.array.length; i; rnd=parseInt(Math.random()*i), tmp=this.array[--i], this.array[i]=this.array[rnd], this.array[rnd]=tmp);
     return this.array;
}

/**
 * Reverses the indexes of this.array TCollection. ie: [1,2,3] becomes [3,2,1]
 */
TList.prototype.reverse = function (){
    this.array.reverse();
    return this.array;
};


/**
 * Returns the last known index of key, if key is found. Otherwise it returns null.
 */
TList.prototype.getLastIndexOf = function(key){
    var ret;
    if(this.array.lastIndexOf){
        ret=this.array.lastIndexOf(key)+1;
        if(ret)return ret; else return null;
    }
    var len = this.array.length;
    for(var i=0; i<len; i++)
        if(this.array[i] === key)
             ret = (i+1);

    if(ret != null) ret ++;
    return ret;
}

/**
 * Clones this list and returns a new one with the same data set.
 */
TList.prototype.clone = function(fromIndex,toIndex){
    var ret = new TList();
    ret.eat(this.exportArray(fromIndex, toIndex));
    return ret;
}

/**
 * Locates and removes first ocurrence of $key , if removeAll is set to true, it removes
 * every instance of key in the collection.
 *
 *  returns the new List Size;
 */
TList.prototype.removeKey = function(key,removeAll){
    var index;
    if(removeAll){
        while(index=this.getIndexOf(key)){
         this.remove(index);
        }
    }else{
      this.remove(this.getIndexOf(key));
    }
   return this.getSize();
}


/////////////////////////////////////////////////////
// ******************** TSet ********************** //
/////////////////////////////////////////////////////

TSet.prototype = new TCollection();
TSet.prototype.constructor = TSet;
function TSet(bool_Allow_Null_Data){
    this.allowNull = bool_Allow_Null_Data || false;
    this.array = new Array;
    delete this.prepend;this.prepend=null;
    this.append = this.put;
    this.dcheck={};
}

/**
 * Returns true if this TSet holds $value, false if it does not.
 */
TSet.prototype.has = function(value){
    if(this.getIndexOf(value))
        return true;
    else
        return false;
}

/**
 * Removes the key and returns the index which the key was located at.
 */
TSet.prototype.removeKey = function(value){
    var i = this.getIndexOf(value);
    if(this.remove(i) !== null)
        return i;
    else
        return null;
}

/**
 * Places a given value at the end of the data set.
 */
TSet.prototype.put = function(value){

var idx = this.getIndexOf(value);
//indexOf(value);
//determin if we have no duplicate
  if(idx == -1)
      this.array.push(value);
  else
      this.array[idx]=value;

}

/**
 * Clones this list and returns a new one with the same data set.
 */
TSet.prototype.clone = function(fromIndex,toIndex){
    var ret = new TSet();
    ret.eat(this.exportArray(fromIndex, toIndex));
    return ret;
}


/////////////////////////////////////////////////////
// ******************** Map ********************** //
/////////////////////////////////////////////////////
function TMap(){
    this.keys = new TSet();
    this.values = new TCollection();

    //// Remove the methods that could de-sync the relation
    this.keys.sort = null;
    this.values.sort = null;
    this.keys.swap = null;
    this.values.swap = null;
    this.keys.eat = null;
    this.values.eat = null;
}

/**
 * Iterates through the Map passing each key,value, index to the caller function.
 * <br> caller can expect two (3) parameters: function caller(key, value, index){ do stuf...}
 * <br>
 * <p>
 * filter: a function that qualifies the data before it's sent to the caller function.
 * if a filter is defined, then only the data that filter approves will be sent to caller.
 * By "approves", I mean filter must return true, else that record is skipped.
 *
 *  ex: data = {one:1,two:2,three:3,four:4,five:5,six:6,seven:7];
 *  var str="my data:";
 *  var filter = function(k,v,i){
 *          if(k==="five" && v==5)
 *              return false; // we HATE the number 5, so were leaving him out.
 *          else
 *              return true;
 *      }
 *  var processor = function(k,v,i){k+'='+v+' and is indexed at position 'i+"\r\n";}
 *
 *  forEach(
 *   processor,
 *   filter
 *  );
 *
 *  str will contain six lines each one like this:  two=2 and is indexed at position 2.
 *  Obviously there is no line for five, we filtered that bugger out.
 *  </p>
 */

TMap.prototype.forEach = function(caller,filter){
    var i=1;
    if(!filter || typeof filter!=="function"){
        for(; i<=this.keys.getSize(); i++){
            caller(this.keys.get(i),this.values.get(i),i);
        }
    }else{
        for(; i<=this.keys.getSize(); i++){
            if(filter(this.keys.get(i),this.values.get(i),i))
                caller(this.keys.get(i),this.values.get(i),i);
        }
    }
}

/**
 * Returns true if this Map holds $value, false if it does not.
 */
TMap.prototype.hasValue = function(value){
    if(this.values.getIndexOf(value))
        return true;
    else
        return false;
}

/**
 * Returns true if this Maps key set holds $key, false if it does not.
 */
TMap.prototype.hasKey = function(key){
    if(this.keys.getIndexOf(key))
        return true;
    else
        return false;
}

/**
 * Removes the record indexed at $key and returns the value. Returns null
 * if key is not found.
 */
TMap.prototype.remove = function(key){
    var idx = this.keys.removeKey(key);
    if(idx){
       return this.values.remove(idx);
    }else
        return null;
}

/**
 * Places a given key/value at the end of the data Map. returns $value if successful
 * null if the operation failed.
 */
TMap.prototype.put = function(key, value){

    if(key === null) return false;
    if(this.keys.put(key)){
       this.values.array[this.keys.getSize()-1]=value;
       return value;
    }else
        return null;
}

/**
 * returns value of $key
 */
TMap.prototype.get = function(key){
    var idx = this.keys.getIndexOf(key);
    return this.values.get(idx);
}

/**
 * Returns number of records in this map.
 */
TMap.prototype.getSize = function(){
    return this.keys.getSize();
}

/**
 * Clones this list and returns a new one with the same data Map.
 */
TMap.prototype.clone = function(fromIndex,toIndex){
    var ret = new Map();
    ret.keys = this.keys.clone(fromIndex,toIndex);
    ret.values = this.values.clone(fromIndex,toIndex);
    return ret;
}

/**
 * Returns a JSON Object string representing this Map.
 */
TMap.prototype.toJSON = function(){
  if(JSON && JSON.stringify){
      return JSON.stringify(this.exportObject());
  }else
      return this.toString();
}

TMap.prototype.toString = function(){
    var ret = "[";
    for(var i=1; i<=this.keys.getSize(); i++){
       ret+=this.keys.get(i)+"="+this.values.get(i)+(i<this.keys.getSize()?",":"]");
    }
    return ret;
}

/**
 * Exports the content of this map to an Object. {key:value,key,value}
 */
TMap.prototype.exportObject = function(fromIndex, toIndex){

    var ret={};
    var km = this.keys.exportArray(fromIndex, toIndex);
    var k;
    while(k = km.pop())
        ret[k]=this.get(k);


    return ret;
}

TMap.prototype.finalize = function(){
    this.keys.finalize();
    this.values.finalize();
    this.keys=null;
    this.values = null;
}

//////////////////////////////////////////////////////
// ******************** Tree ********************** //
//////////////////////////////////////////////////////

/*
 *An object baed on the kvp array tree, developed by Richard Corsale for large
 *and presistant datasets. The core concept is to replace Objects, which inadvertantly
 *create memory leaks by being copied countless times, with Arrays
 *which are presistant in nature and are only passed by refrence.
 */

var TreeMapUtils = new Object({
/**
 * Fetches the value associated with key from the tree.
 *
 * in short, when I pass in "tree.branch.L1_Branch.L2_Branch.L3_Branch.leaf" it fetches that data set from the
 * Tree.
 */
getValue:function(key, mapArray, remove){
    if(!key.split || !mapArray.splice) return null;
        var map = key.split("\.");

    // Quick check.. save cycles and prevents a false positive on the initial loop in FF.
    if(this.getKeyIndex(map[0],mapArray) == null)
        return null;

    var d = mapArray;
    // look for a top level match
    for(var i=0; i<map.length; i++)
        for(var ii=0; ii<d.length; ii++)
            if(d[ii] == null) return null;
            else
            if(d[ii][1] ){
                if(d[ii][0] == map[i]){
                    if(remove){
                        d=d[ii].splice(1,1);
                    }else
                        d=d[ii][1];
                    break;
                }else if(ii == d.length-1)
                        return null;
            }else{
                if(d[0] == map[i]){
                    if(remove){
                        d=d.splice(1,1);
                    }else
                        d=d[1];
                    break;
                }else if(ii == d.length-1)
                        return null;
            }

    return d;
    },
    /**
     * Returns the zero based index of key, in arr. Returns null if not found.
     */
    getKeyIndex: function(key,arr){
       var ret;
        for(var i=0; i<arr.length; i++){
            if(arr[i][0]===key)
                ret = i;
        }
        return ret;
    },
    getKeyValuePair: function(key,value){
        if(key !== null){
            KVP = new Array;
            KVP[0] = key;
            KVP.key = KVP[0];

            KVP[1] = value;
            KVP.value = KVP[1];

            return KVP;
        }
        return null;
    },
    getDataNode: function(key,value){
        if(key!==null) throw ("DataNode Error: Key is null");
        if(typeof key !== "string" && typeof key !== "number") throw "DataNode requires a valid alpha/numeric key be passed as its first parameter. you passed:"+key;

        var n = [key,[value]];
        n.key = n[0];
        n.valueNode = n[1][0]
    }
});



function TTree(){
    this.rootArray = new Array;
}

TTree.prototype.remove=function(nodeHandle){
    return TreeMapUtils.getValue(this.rootArray,nodeHandle,true);
}

TTree.prototype.list=function(parentBranch){
    var retArr = [[],[]];
    retArr.branches = retArr[0];
    retArr.dirs=retArr.branches;
    retArr.nodes = retArr[1];

    var barr = this.rootArray;
    if(parentBranch !== null)
     barr = this.get(parentBranch);

    if(barr !== null)
        for(var i=0; i<barr.length; i++)
             if(barr.splice)
                if((barr[i]).splice){
                    retArr[0].push(barr[i][0]);
                }else{
                    retArr[1].push(barr[i]);
                }

  return retArr;
}

// simple .. a node is a map..
TTree.prototype.createNode = function(key,value){
    var node = [key,[value]];

    var _parent = this;

    node.put = function(key,value){
        this[1].push(_parent.createNode(key,value));
    }

    node.putDataNode = function(value){
        this[1].push(value);
    }
    node.hasNode = function(key){return this.get(key)==null?false:true;}
    node.get = function(key){
        var idx = TreeMapUtils.getKeyIndex(key,this);
        if(idx != null)
            return (this[idx][1].splice)?this[idx][1][1]:this[idx][1];
        else
            return null;
    }
    node.getDataNodes = function(){
        var ret = new Array;
        for(var i=0; i<this.length; i++)
            if(this[i].splice){
                ret.push(this[i]);
            }
        return ret;
    }


    return node;
}

TTree.prototype.addBranch=function(parentBranch, newBranch){
    if(parentBranch && !newBranch){
        this.rootArray.push([parentBranch,[]]);
    }else{
       var mutil =  TreeMapUtils.getValue(parentBranch,this.rootArray);
       if(mutil != null && mutil.splice){
           mutil.push([newBranch,[]]);
       }else
           throw("FastMap.addBranch failed. ParentNode is non-existant: "+parentBranch);
    }
}

// add('root.L1Branch.L2.L3.leaf',value); and it makes all of these for you
// actually, no.. we need to throw an error when inserting into a nonexistant branch.
TTree.prototype.put=function(parentBranch, key, value){

 if(key == null) throw("FastMap.put Error: Key is not defined!");
    //value = (value!== null?(value.splice?value:[value]):[]);
    var data = this.createNode(key, value);


    if(parentBranch != null){
      var branch = TreeMapUtils.getValue(parentBranch,this.rootArray);
      if(branch != null){
        if(value == null){
            branch.push(key);
        }else{
            var sb = TreeMapUtils.getKeyIndex(key,branch);
            if(sb){
                branch = TreeMapUtils.getValue(key,branch);
                if(branch.splice)
                    branch.push(value);


            }else{
                branch.push(data);
            }
        }
       return branch;
      }else{
          throw("FastMap.put Error: parentBranch is not a node: "+parentBranch);
      }
    }else{
        throw("FastMap.put Error: parentBranch undefined: "+key);
    }
    return this;
}

//live data, any changes made will be reflected in the array
TTree.prototype.get=function(branch){
    return TreeMapUtils.getValue(branch, this.rootArray);
}

TTree.prototype.getSize=function(branch){
    return TreeMapUtils.getValue(branch, this.rootArray).length;
}