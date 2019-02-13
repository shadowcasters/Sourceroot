

/* 
 * To conserve resources, we define the functions with many parameters and then proxy
 * these functions within the effects object.
 */

/***********************************
 *params:
 * fade: "in" or "out";
 * interval: speed of the effect;
 * panel: a div panel;
 ***********************************/

function getRenderFilm(enableHoverGlow){
    var film = SRLayout.getDiv();
        film.setPosition(1,1);
        film.style.position="absolute";
        film.style.backgroundColor = "white";
        film.innerHTML = "&nbsp;";
        film.style.zIndex = 2;
        _SRSetOpacity(film,1);
        
        if(enableHoverGlow){
                film.setHoverColor = function(color){
                this.style.backgroundColor = color;
            }

            film.setSuspendHover = function(bool){
                this.suspendHover = bool;
            }

            film.onmouseover = function(){
              if(!this.suspendHover)
                _SRSetOpacity(film,20);
            }

            film.onmouseout = function(){
              if(!this.suspendHover)
                _SRSetOpacity(film,1);
            }
        }

        return film;
}

function _SRSetHoverEffect(iPanel, highlightColor, intensity){
    iPanel.highlightFilm = document.createElement("div");
    iPanel.highlightFilm.style.position = "absolute";
    iPanel.highlightFilm.style.width = "100%";
    iPanel.highlightFilm.style.height = "100%";
    iPanel.highlightFilm.style.top = "0px";
    iPanel.highlightFilm.style.left = "0px";
    iPanel.highlightFilm.style.zIndex = 1;
    iPanel.highlightFilm.style.backgroundColor = "white";
    _SRSetOpacity(iPanel.highlightFilm,1);

    iPanel.appendChild(iPanel.highlightFilm);
    
    iPanel.highlight = function(){
       _SRSetOpacity(iPanel.highlightFilm,20);
    }
    iPanel.lowlight = function(){
        _SRSetOpacity(iPanel.highlightFilm,1);
    }
    
    return iPanel;
}


function fade(fadeEffect,interval,panel,callback){

    interval = interval || 100;
    
     if(!panel) throw"You must specify a valid Div object as the second parameter of this function";
    
    var i = fadeEffect.toLowerCase() == "out"?100:0;


    var fade = setInterval(function(){
          i = fadeEffect.toLowerCase() == "out"?i-10:i+10;
          _SRSetOpacity(panel,i);
          if(i<=0 || i >= 100){
             clearInterval(fade);
             if(callback) callback();
             fade = null;
          }

      }, interval);
      
}

function _SRRollOver(element,baseSchema,highlightSchema){
    
    element.suspendRollover = function(bool){
        this.suspend = bool;
    }
    element.onmouseover = function(){
            if(!this.suspend){
                this.style.backgroundColor = highlightSchema.base;
                this.style.color = highlightSchema.font || highlightSchema.contrast;
            }
            
        }
    element.onmouseout = function(){
            if(!this.suspend){
                this.style.backgroundColor = baseSchema.base;
                this.style.color = baseSchema.font || baseSchema.contrast;
            }
        }

    element.suspendRollover(false);
        
}

/**
 * resizes a div dynamicly animated
 */
function SRDynasize(shrink_grow,vertical_horizontal,interval, panel, finalSize, callback, inc){
    vertical_horizontal = vertical_horizontal || "horizontal";
    interval = interval || 100;
    inc = inc || 10;

     if(!panel) throw"SRDynasize():You must specify a valid Div object as the second parameter of this function";
     if(!finalSize) throw"SRDynasize(): You must specify a finalSize ";

     var oTop = panel.top;

     if(!panel.resizing)
     var resize = setInterval(function(){
          panel.resizing = true;
          W = shrink_grow == "grow"?panel.width+inc:panel.width-inc;
          H = shrink_grow == "grow"?panel.height+inc:panel.height-inc;

          if(vertical_horizontal == "vertical"){
              panel.setHeight(H);
              if(oTop) panel.setTop(oTop);

              if(shrink_grow == "grow")
              if(H <= 0 || H >= finalSize){
                  panel.resizing = false;
                  panel.setHeight(finalSize);
                  clearInterval(resize);
                  if(callback) callback();
                  resize = null;
              }
            if(shrink_grow == "shrink")
              if(H <= 0 || H <= finalSize){
                  panel.resizing = false;
                  panel.setHeight(finalSize);
                  clearInterval(resize);
                  if(callback) callback();
                  resize = null;
               }

          }
                
          if(vertical_horizontal == "horizontal"){

              panel.setWidth(W);
            if(shrink_grow == "grow")
              if(W >= finalSize){
                  panel.resizing = false;
                  panel.setWidth(finalSize);
                  clearInterval(resize);
                  if(callback) callback();
                  resize = null;
               }
            if(shrink_grow == "shrink")
              if(W <= 0 || W <= finalSize){
                  panel.resizing = false;
                  panel.setWidth(finalSize);
                  clearInterval(resize);
                  if(callback) callback();
                  resize = null;
               }
            }

          

      }, interval);

}



var UIEffects = function(parent){
    this.parent = parent;
    this.onAfter = {};
    this.onBefore = {};

}


UIEffects.prototype.fadeOut = function(interval,panel){

    if(this.onFadeOut)
        this.onFadeOut();

    interval = interval || 100;
    panel = panel || this.parent.renderPayne;
    fade("out",interval, panel,this.onAfter.fadeOut);

}

UIEffects.prototype.fadeIn = function(interval,panel){

    interval = interval || 100;
    panel = panel || this.parent.renderPayne;

    _SRSetOpacity(panel,0);
    if(this.onFadeIn)
        this.onFadeIn();

    fade("in",interval, panel,this.onAfter.fadeIn);

}

UIEffects.prototype.expand = function(size, interval, panel, direction){

    if(typeof size == "object"){
        interval = size.interval;
        panel = size.panel;
        direction = size.direction;
        size = size.size;
    }

    interval = interval || 50;
    panel = panel || this.parent.renderPayne;
    size = size || parseInt(this.parent.renderPayne.parentNode.style.height) || 300;
    direction = direction || "vertical";
    var preRun  = this.onBeforeExpand;
    var postRun  = this.onAfterExpand || this.onExpand;

    if(!panel.isBusy){
        panel.isBusy = true;
        SRDynasize("grow", direction, interval, panel ,  size, function(){if(postRun)postRun();});
        panel.isBusy = false;

            if(preRun)
                preRun();
    }
}

UIEffects.prototype.contract = function(size, interval, panel, direction){
    if(typeof size == "object"){
        interval = size.interval;
        panel = size.panel;
        direction = size.direction;
        size = size.size;
    }
    interval = interval || 50;
    panel = panel || this.parent.renderPayne;
    size = size || parseInt(this.parent.renderPayne.parentNode.style.height) || 300;
    direction = direction || "vertical";
    var preRun  = this.onBeforeContract;
    var postRun  = this.onAfterContract || this.onContract;

    if(!panel.isBusy){
        panel.isBusy = true;
        SRDynasize("shrink", direction, interval, panel, size, function(){if(postRun)postRun();});
        panel.isBusy = false;

             if(preRun)
                preRun();
    }
}