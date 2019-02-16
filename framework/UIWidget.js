/* 
 * the prototype for all widgets
 *
 * TEMP: Obviously this is atrocious JS code, this is only for seperation of concerns as far as instance managment goes.
 * This, like the rest of the UI libs will be loaded into a series of functions and singleton objects. what ends up getting instanated
 * will be very small. interfaces with specific parameters for their respective instances
 *
 *
 *TODO: Add auto hint to widget foundation.
 *TODO: Move everything to the WidgetUtils object.
 */

var _SRWidgetUtils = new Object({

   duplicateWidget:function(origin, target){

      var properties = this.getProperties(origin);
      this.setProperties(properties, target);
      return target;
       
   },
   getProperties:function(tWidget){
       var ret = {};
       for(var m in tWidget)
           if(typeof tWidget[m] == "number" || typeof tWidget[m] == "string" || typeof tWidget[m] == "boolean")
              ret[m] = tWidget[m];

        
       return ret;
   },
   setProperties:function(properties, target){

   // this prevents each seter from auto rendering
   var postRender = target.isRendered || false;
   if(postRender) target.isRendered = false;

     for(var key in properties){
        // look for setter functions,
        var meth = ["set",key.charAt(0).toUpperCase(),key.substr(1)].join("");
        if(target[meth]){
           target[meth](properties[key]);
        }
        // set properties for the theme..
        if(properties.theme)
            this.setProperties(properties.theme,target.theme);

        // set properties for effects
        if(properties.effects)
            this.setProperties(properties.effects,target.effects);
      }
  
  if(postRender){
    target.isRendered = true;
    target.doRender();
  }

 }

});




var UIWidget = function(){}
UIWidget.prototype = new FoundationWidget;


UIWidget.prototype.setSchema = function(schema){
    
    this.theme.setSchemaTheme(schema);

    if(this.isRendered && this.onInsert){
        this.onInsert();
    }
}



/**
 * if you have another widget of the same type and would like to simply copy this widgets
 * properties to that widget, pass it here.
 */
UIWidget.prototype.duplicatePeer=function( peerWidget ){
     return _SRWidgetUtils.duplicateWidget(this, peerWidget);
}

UIWidget.prototype.setStaticPosition = function(){this.renderPayne.setStatic(); return this;}
UIWidget.prototype.setRelativePosition = function(){this.renderPayne.setRelative(); return this;}
UIWidget.prototype.setAbsolutePosition = function(){this.renderPayne.setAbsolute(); return this;}

/**
* Returns a copy of this widget
*/

UIWidget.prototype.cloneWidget = function(){
    return _SRCloneObject(this, true);
}

UIWidget.prototype.setEffects = function(){
   this.effects = new UIEffects(this);
}


/**
 * Locks this widget into its parent container's inner boundries, or the
 * absolute coords of a boundry object if one is passed.
 * <br>
 * params: OptBoundryObject <br>
 * format: {top:[x,y],bottom:[x,y]} <br>
 *  <br>
 *  the top and bottom parameters refer to the top Left, and bottom right deltas.
 *
 */
UIWidget.prototype.setDragBoundries = function(OptBoundryObject){
   this.enableDragBoundries = true;
   this.OptBoundryObject = OptBoundryObject;
   
   if(this.isRendered){
      if(this.OptBoundryObject)
          this.renderPayne.dragBoundries = OptBoundryObject;
      else{
        var l = this.renderPayne.parentNode.clientWidth - this.width;
        var t = this.renderPayne.parentNode.clientHeight - this.height;

        this.renderPayne.dragBoundries = {top:[0,0],bottom:[l,t]};
      }
   }
}
/**
 * Render film is a transparent layer that sits atop of the zIndex hierarchy and intercepts
 * events as a proxy for the underlying renderPayne. This is very usefull for composit widgets that need
 * to act on mouse events, that get interupted by other elements on the renderPayne.
 *
 */
UIWidget.prototype.setRenderFilm = function(enableHoverGlow){
    this.renderFilm = getRenderFilm(enableHoverGlow);
    this.renderPayne.addChild(this.renderFilm);
 
}

UIWidget.prototype.doClear = function(){
    this.mainPanel.removeComponent("*");
}

/**
 * returns an array of all sub components
 */
UIWidget.prototype.getChildWidgets = function(){

var ret = new Array;
for(var i=0; i < this.renderPayne.childNodes.length; i++){
     var elem = this.renderPayne.childNodes[i];
       if(elem.parent && elem.parent.widgetName){
                 ret.push(elem.parent);
             }
       elem = null;
     }
}

UIWidget.prototype.addOnRenderEvent = function(evt){
    if(!this.onRenderArray)
        this.onRenderArray = new Array;

     this.onRenderArray.push(evt);
}

UIWidget.prototype.onWidgetRender = function(){
    this.theme.font.refresh();
    this.isRendered = true;
    
    ////////// register hooks 
    
     var _parent = this;
     
     if(_parent.onMouseOut)
     this.renderPayne.onmouseout = function(){
         if(_parent.onMouseOut)
            _parent.onMouseOut();
     }

     if(_parent.onMouseOver)
     this.renderPayne.onmouseover = function(){
          if(_parent.onMouseOver)
            _parent.onMouseOver();
     }

     if(_parent.onClick)
     this.renderPayne.onclick = function(){
        if(_parent.onClick)
            _parent.onClick();
     }

     if(_parent.onDoubleClick)
     this.renderPayne.ondblclick = function(){
        if(_parent.onDoubleClick)
            _parent.onDoubleClick();
     }
    
    if(this.enableDragBoundries)
        this.setDragBoundries(this.OptBoundryObject);
    
    if( this.onRenderArray)
         for(var i=0; i< this.onRenderArray.length; i++)
              this.onRenderArray[i]();
      
   
}


