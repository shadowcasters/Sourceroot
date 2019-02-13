
/*
 * A docked toolbar for windows and panels.
 */
Sprite.prototype = new UIWidget;
Sprite.prototype.widgetName = "sprite";
Sprite.prototype.constructor = Sprite;
Sprite.prototype.defaultProperties = {
    frameRate:8
}

function Sprite(PropertiesObject){
    this.init(PropertiesObject);
}

Sprite.prototype.init = function(PropertiesObject){
    if(typeof PropertiesObject == "string"){
        this.setSprite(PropertiesObject);
        PropertiesObject = {};
    }

   this.initWidget(PropertiesObject);

   this.renderPayne.style.background = _SRImageMapUtils.getBackgroundStyle(this.spriteData[0][1]).style;
   
   var t = _SRStringUtils.replaceAll(this.spriteData[0][1][0],"px", "");
   t = _SRStringUtils.replaceAll(t,"-","");
   t = t.split(" ");
   
   this.offsetLeft = t[0]; 
   this.offsetTop =  t[1]; 
   this.mapWidth = this.spriteData[0][1][1];
   this.mapHeight = this.spriteData[0][1][2];
   
   this.setFramesPerSecond(this.spriteData[2][1][0]);
   this.setSize(this.spriteData[1][1][0],this.spriteData[1][1][1]);

}

/**
 *Sets an image, icon, toggle icon etc to be displaied when the animation is not
 *running.
 */
Sprite.prototype.setRestImage = function(img, show){
    if(!img.widgetName)
        throw "Sprite.setRestImage: Argument must be a valid image object. Icon, Image, Toggle Icon etc...";

    if(this.restImage)
        this.removeChild(this.restImage);
    
    this.restImage = img;
    this.restImage.renderPayne.setAbsolute();
    this.restImage.renderPayne.style.zIndex = 1;
    
    if(!show)
        this.restImage.renderPayne.setVisible(false);
    this.renderPayne.addChild(this.restImage,"restImage");
    
    return this;
}

/**
 * Load Still Image
 */
Sprite.prototype.showRestImage = function(){
    this.restImage.setVisible(true);
}

/**
 * Sets the number frames cycled in one second. The frame rate limit is 50
 */
Sprite.prototype.setFramesPerSecond = function(frames_per_second){
    this.framesPerSecond = frames_per_second;
}

/**
 *  Sets the number loops if auto terminate is desired.
 */
Sprite.prototype.setLoopCount = function(numLoops){
    this.loopCount = numLoops;
}

Sprite.prototype.setSprite = function(spriteHandle){
   if(typeof spriteHandle == "string"){
        this.spriteData =  _SRImageMapUtils.getImageMap(spriteHandle, _SRSpriteMaps);
            if(!this.spriteData)
                throw "Sprite map not defined: "+spriteHandle;
   }else
       if(spriteHandle.splice && spriteHandle.length > 0 && spriteHandle.map){
           this.spriteData = spriteHandle;
       }else
            throw "Sprite.setSprite error: invalid parameter: "+spriteHandle+". Specify a string which coresponds to a sprite in SpriteMap registry.";
  
}

/**
 * starts the animation loop. 
 * params:
 * fps = an optional parameter to alter the frames per second from this command.
 * numLoops = optional, number of loops if auto-terminate is desired.
 */
Sprite.prototype.doStart = function(fps, numLoops){
    this.restImage.setVisible(false);

    fps = fps || this.framesPerSecond || 10;
    numLoops = numLoops || this.loopCount;
    var imap = this.renderPayne;
    var fwidth = this.width;
    var fheight = this.height;
    // do the simple math out here, so we dont choak the loop
    var nCols = Math.round((this.mapWidth/fwidth));
    var nRows = Math.round((this.mapHeight/fheight));

    // loop tracking vars
    var col = 0;
    var row = 0;
    var i = 0; // itteration marker

    var offsetLeft = parseInt(this.offsetLeft);
    var offsetTop = parseInt(this.offsetTop);

    var pos = ["-",offsetLeft,"px -",offsetTop,"px"];
    var lastloop = false;
    var _parent = this;
    this.loop = setInterval(function(){

        if(col >= nCols){
        
        col=0;
        if(row < nRows -1){
                row++;
           //     _SRDebug.out("new row: "+row);
        }else{
                // reset the vars for next itteration
                i++;
          //        _SRDebug.out("itteration number: "+i+" max: "+numLoops);
                col = 1;
                row = 0;

                if(numLoops && i >= numLoops){
                  lastloop = true;
                }
            }
        }

    if(lastloop){
        pos[1] = offsetLeft;
        pos[3] = offsetTop;
    }else{
        pos[1] = (offsetLeft + (col*fwidth));
        pos[3] = (offsetTop + (row*fheight));
    }
     
    imap.style.backgroundPosition = pos.join("");
  
        // when reading left to right, which is all we do at this point.
        col++;
        if(lastloop)
            _parent.doStop();

    },(1000/fps));

    if(this.onStart)
        this.onStart();
}

/**
 * stops the animation and displays the still image or the first column, first row in the map.
 * An optional parameter may be passed which will define the still image to display.
 */
Sprite.prototype.doStop = function(){
    clearInterval(this.loop);
    this.restImage.setVisible(true);
    if(this.onStop)
        this.onStop();


    
}
