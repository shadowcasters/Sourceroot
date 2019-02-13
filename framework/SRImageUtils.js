
/*
 * Simple enough.. pass in an object with <key>:<src> and I will return key:Image()
*/
var TImageBatch = new Object({

loadImages: function(Obj,handle){
    handle = handle || getUniqueId();
     _SRDebug.out(handle+"{\n");
    this.imgObj = Obj;
    this.handle = handle;
    this.processQue();
},
recived:0,
sent:0,
processQue: function(){
    // loadup our urls
    var nextImg = this.verifyStatus();
    if(nextImg.length > 0){
      this.sent = nextImg.length;
      for(var i=0; i<nextImg.length;i++)
        this.getImage(nextImg[i].key,nextImg[i].src);
    }else{
        this.imgObj.handle = this.handle;
      _SRDebug.out("\n}");
     //   evtRegistry.notify("onImageBatchLoaded",this.imgObj);
    }
},
callback: function(key,img){
this.recived += 1;
    _SRDebug.out(key+ ":{width:"+img.width+", height:"+img.height+"}");
    if(key && img)
        this.imgObj[key] = img;
    else if(key)
        this.imgObj[key] = null;
  if(this.recived == this.sent){
    this.recived = 0;
    this.processQue();
  }
},
verifyStatus: function(){
var ri = new Array;
    for(var i in this.imgObj){
       if(typeof this.imgObj[i] == "string")
          ri.push({key:i,src:this.imgObj[i]});
    }
    return ri;
},
getImage: function(key, src){
    // if the ID was not passed we set the ID to the file name.
    var _parent = this;
    var img = new Image();
    img.onload = function(){
       img.isLoaded = true;
       _parent.callback(key,img);
    }
    img.onerror = function(){
       img.isLoaded = false;
       _parent.callback(key,img);
    }
    img.onabort = function(){
      img.isLoaded = false;
      _parent.callback(img);
    }

    img.src = src;
}

});
