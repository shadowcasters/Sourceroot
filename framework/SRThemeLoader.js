


var SRTheme = new Object({

"renderPayne": document.body,

loadConfig: function(c){

if(!c)
    throw "You have not specified a theme configuration file.. unable to continue";
this.themeConfig = c;
_SRAddStyleSheet(c.resourceUrl+c.window.css, "SRWin_stylesheet");
_SRAddStyleSheet(c.resourceUrl+c.icons.css, "SRIcons_stylesheet");
this.icons = c.icons;
//evtRegistry.notify("onIconsLoad");
this.themeConfig = c;
this.url = this.resourceUrl;
this.theme = c;
this.windowTheme = c.window;

if(this.windowTheme.imageMap){
var imageMapUrl = c.resourceUrl+c.window.imageMap;

    for(var sec in this.windowTheme){
        if(typeof this.windowTheme[sec] == "object"){
            for(var tobj in this.windowTheme[sec])
                if(this.windowTheme[sec][tobj].hasOwnProperty("style")){
                    this.windowTheme[sec][tobj].style = [this.windowTheme[sec][tobj].style," url('"+imageMapUrl+"')"].join("");
                }
        }
    }
        
    var imageMap = new Image();
    var _parent = this;
    imageMap.onload = function(){
        _parent.windowTheme.isLoaded = true;
 //       evtRegistry.notify("onWindowThemeLoad");
    }

    imageMap.src = imageMapUrl;
    
}else{
        // load images in a batch.
        var unloaded = new Array;
        // format the Urls of the theme images
        for(var i in c.window){
            if(typeof c.window == "object"){
                for(var ii in c.window[i])
                    c.window[i][ii] = [this.url,"/theme/",c.window[i][ii]].join("");

                c.window[i].handle = i;
                unloaded.push(c.window[i]);
            }
        }
        this.windowTheme.unloaded = unloaded;
        unloaded = null;

        this.loadImages();
    }

//Load the controls theme.
    this.controlsTheme = c.controls;
    if(this.controlsTheme.imageMap){
        var controlsMapUrl = c.resourceUrl+this.controlsTheme.imageMap;
        this.controlsMapUrl = controlsMapUrl;
        for(var sec in this.controlsTheme){
        if(typeof this.controlsTheme[sec] == "object"){
            for(var tobj in this.controlsTheme[sec]){
            /// If we have a style node in the object we know its a sprite
                if(this.controlsTheme[sec][tobj].hasOwnProperty("style")){
                    this.controlsTheme[sec][tobj].style = [this.controlsTheme[sec][tobj].style," url('"+controlsMapUrl+"')"].join("");
                }else{
                    for(var fobj in this.controlsTheme[sec][tobj]){
                      if(this.controlsTheme[sec][tobj][fobj].hasOwnProperty("style")){
                            this.controlsTheme[sec][tobj][fobj].style = [this.controlsTheme[sec][tobj][fobj].style," url('"+controlsMapUrl+"')"].join("");
                        }
                    }
                }
            }
        }
    }

    var controlsImageMap = new Image();
    controlsImageMap.onload = function(){
        _parent.controlsTheme.isLoaded = true;
       // evtRegistry.notify("onControlsThemeLoad");

    }

    controlsImageMap.src = controlsMapUrl;

    }

},

// only window images at this time, This is used in place if the theme is individual images, although IE seems to hate this for some reason.
loadImages: function(){
    var _parent = this;
    var windowTheme = {};
    var imageBatchCallback = function(io){
        // for now, we just print em, what we will do next is
        var objHandle = io.handle;

        delete io.handle;
        //alert(objHandle+" : "+io.toSource());

       // _SRDebug.seg(io.toSource(),"recived imageBatchCallback "+objHandle);
        for(var i in io){
           if(io[i] && typeof io[i] == "object"){
            windowTheme[objHandle] = io;
           
            }
        }

        if(_parent.windowTheme.unloaded && _parent.windowTheme.unloaded.length >= 1)
            _parent.loadImages();
        else{
            _parent.windowTheme = windowTheme;
            _parent.windowTheme.isLoaded = true;
           // evtRegistry.notify("onThemeLoad");
        }
    }

   // evtRegistry.isListener("onImageBatchLoaded",imageBatchCallback);
//    if(!evtRegistry.isListener("onImageBatchLoaded",imageBatchCallback))
//    evtRegistry.registerListener("onImageBatchLoaded",imageBatchCallback);
    
    if(this.windowTheme.unloaded && this.windowTheme.unloaded.length >= 1){
        var o = this.windowTheme.unloaded.pop();
        var handle = o.handle;
        delete o.handle;
        _SRImageBatch.loadImages(o,handle);
    }

}

});

function _SRGetThemeImage(themeObj){
    var img = SRLayout.getDiv(themeObj.width,themeObj.height);
    img.style.background = themeObj.style;
    return img;
}

if(themeConf){
    SRTheme.loadConfig(themeConf);
}else{
    var confScr = document.body.appendChild(document.createElement("script"))
    confScr.src=_OAK.Config.debugUrl+"/theme/themeConfig.js";
}


