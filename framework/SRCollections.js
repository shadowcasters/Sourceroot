
/* 
 *An object baed on the kvp array tree, developed by Richard Corsale for large
 *and presistant datasets. The core concept is to replace Objects, which are constantly
 *and inadvertantly creating mem leaks by being copied countless times, with Arrays
 *which are presistant in nature.
 */

var MapUtils = new Object({
/**
 * Fetches the value associated with key from the tree.
 *
 * in short, when I pass in "tree.branch.L1_Branch.L2_Branch.L3_Branch.leaf" it fetches that data set from the
 * Tree.
 */
getValue:function(key, mapArray, remove){
    if(!key.split || !_SRIsArray(mapArray)) return null;
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
            if(d[ii][1]){
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
    }
});

/////////////////////////////////////////////////////////////////////////
//  DataNode: The foundation for every entry into all SRCollections.
//            format: [key,[value_or_null]]
/////////////////////////////////////////////////////////////////////////
DataNode.prototype = new Array;
DataNode.prototype.constructor = DataNode;
function DataNode(key,value){
  if(key==null) throw ("DataNode Error: Key is null");
  if(typeof key != "string" && typeof key != "number") throw "DataNode requires a valid alpha/numeric key be passed as its first parameter. you passed:"+key;
  this[0] = key;
  this.name = key;
  this[1]=[];
  this.add(value);
}
DataNode.prototype = new Array;
DataNode.prototype.add = function(data){if(typeof data === "string"){data="\""+data+"\""} this[1].push(data); return this;}
DataNode.prototype.get = function(index){alert("boing"); if(index == null) return null; else return this[1][index];}

/** Returns either the index held by "key" or null if not found.*/
DataNode.prototype.getIndex = function(key){return _SRArrayIndexOf(key, this[1]);}
DataNode.prototype.remove = function(key_or_index){ return _SRArrayRemoveElement(key_or_index, this);}
DataNode.prototype.rename = function(newName){this[0]=newName; this.name = newName; return this;}
DataNode.prototype.getData = function(){if(this[1].length == 1) return this[1][0]; return this[1];}
//DataNode.prototype.toString = function(){return "[\""+this.name+"\",["+this.getData()+"]]";}


////////////////////////////////////////////////////////////////////
//  ArrayMap: Acts like a hash map, only automatic storage in a
//  ArrayList when multiple values want to use the same key
////////////////////////////////////////////////////////////////////
ArrayMap.prototype = new Array;
ArrayMap.prototype.constructor = ArrayMap;
function ArrayMap(){}
ArrayMap.prototype.put = function(key,value){
    if(this.hasNode(key)){
        this.getDataNode(key).add(value);
    }else{
        var dn = new DataNode(key,value);
        this.push(dn);
    }
}
ArrayMap.prototype.remove = function(index){
   return _SRArrayRemoveElement(index, this);
}
ArrayMap.prototype.getIndex = function(key){
   return _SRArrayIndexOf(key, this);
}
ArrayMap.prototype.get = function(key){
   var ret = this.getDataNode(key);
   if(ret != null)
       ret = ret.getData();

   return ret;
}
ArrayMap.prototype.hasNode = function(key){
    return this.getDataNode(key)==null?false:true;
}
/**
 * Returns the MapNode stored under this key
 */
ArrayMap.prototype.getDataNode = function(key){
        var idx = TreeMapUtils.getKeyIndex(key,this);
        if(idx != null){
            return this[idx];
        }else
            return null;
}
/**
 * Returns an ArrayMap of all data that is NOT a branch/dir.
 */
ArrayMap.prototype.getLeafs = function(){
        var ret = new Array;
        for(var i=0; i<this.length; i++)
            if(!_SRIsArray(this[i])){
                ret.push(this[i]);
            }
        return ret;
}
/**
 * Returns an ArrayMap of the branchs/directories as Array
 */
ArrayMap.prototype.getBranches = function(){
        var ret = new Array;
        for(var i=0; i<this.length; i++)
            if(!_SRIsArray(this[i])){
                ret.push(this[i]);
            }
        return ret;
}


//////////////////////////////////////
//  DataTreeMap                     //
//////////////////////////////////////
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
             if(_SRIsArray(barr))
                if(_SRIsArray(barr[i])){
                    alert("adding branch: "+barr[i]);
                    retArr[0].push(barr[i][0]);
                }else{
                    alert("adding value: "+barr[i]);
                    retArr[1].push(barr[i]);
                }
             
  return retArr;
}

// simple .. a node is a map..
TTree.prototype.getNode = function(key,value){
    var node = [key,[value]];

    var _parent = this;

    node.put = function(key,value){
        this[1].push(_parent.getNode(key,value));
    }

    node.putDataNode = function(value){
        this[1].push(value);
    }
    node.hasNode = function(key){return this.get(key)==null?false:true;}
    node.get = function(key){
        var idx = TreeMapUtils.getKeyIndex(key,this);
        if(idx != null)
            return _SRIsArray(this[idx][1])?this[idx][1][1]:this[idx][1];
        else
            return null;
    }
    node.getDataNodes = function(){
        var ret = new Array;
        for(var i=0; i<this.length; i++)
            if(!_SRIsArray(this[i])){
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
     //  alert("getting branch: ("+parentBranch+") and adding: ("+newBranch+")");
       var mutil =  TreeMapUtils.getValue(parentBranch,this.rootArray);
       if(mutil != null && mutil.splice){
           mutil.push([newBranch,[]]);
       }else
           alert("FastMap.addBranch failed. ParentNode is non-existant: "+parentBranch);
    }
}

// add('root.L1Branch.L2.L3.leaf',value); and it makes all of these for you
// actually, no.. we need to throw an error when inserting into a nonexistant branch.
TTree.prototype.put=function(parentBranch, key, value){

 if(key == null) throw("FastMap.put Error: Key is not defined!");
    //value = (value!== null?(value.splice?value:[value]):[]);
    var data = this.getNode(key, value);
    

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