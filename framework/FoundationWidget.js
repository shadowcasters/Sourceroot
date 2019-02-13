
/* 
 * Foundation Widgets, are the bare bones widget super class that provide fundimental
 * positioning and layout for the kernel. This interface is also suitable for any small
 * lightweight widgets that only contain a few objects.
 * 
 */

var FoundationWidget = function(){}
FoundationWidget.prototype.initWidget = function(PropertiesObject){
// allows you to pass your own renderPayne
     if(PropertiesObject && PropertiesObject.renderPayne){
         this.renderPayne = PropertiesObject.renderPayne;
     }else{
         this.renderPayne = SRLayout.getDiv("100%","100%");
     }
// merge objects
     if(PropertiesObject || this.defaultProperties){
        if(!PropertiesObject)
            PropertiesObject = this.defaultProperties || {};
        else{
        var settings = {};
        for(var key in this.defaultProperties)
            if(PropertiesObject[key] == null){
                settings[key] = this.defaultProperties[key];
            }
        settings = this.setProperties(settings);
        delete settings;
        settings = null;
        }
     }
// set mainPanel
	 if(PropertiesObject.mainPanel){
        if(PropertiesObject.mainPanel.setDynamic)
            this.mainPanel = PropertiesObject.mainPanel;
        else
            this.mainPanel = SRLayout.getDiv("100%","100%").setRelative();

        this.renderPayne.addChild(this.mainPanel);
     }else{
        this.mainPanel = this.renderPayne;
     }

     var _parent = this;
     this.renderPayne.onSetWidth = function(){
         _parent.width = _parent.renderPayne.width;
     }

     this.renderPayne.onSetHeight = function(){
         _parent.height = _parent.renderPayne.height;
     }

     this.renderPayne.id = this.widgetName?this.widgetName+"_"+_SRGetRandomKey(4):_SRGetRandomKey(5);
     this.renderPayne.widget = this;
     this.renderPayne.style.position = "relative";

     this.theme = new UIThemeLoader(this);
     
     // load widget settings
    if(WidgetSettings && WidgetSettings[this.widgetName]){
        if(!PropertiesObject)
            PropertiesObject = {};

            var sobj = WidgetSettings[this.widgetName];
            for(var k in sobj){
                if(PropertiesObject.k == null){
                    PropertiesObject[k] = sobj[k];
                }
            }
       }
        this.setProperties(PropertiesObject);
        
     this.schemaName = this.theme.themeObject.defaultSchema;
     this.font = new FontObject(this.schemaName,this.mainPanel);
}

/**
 * This enables or disables the container status of this object. This is used for positioning, rather than
 * trying to calculate the position and its offset each time. You simple set this to true and the renderPayne of this
 * widget becomes the offset for all other positioning inside of it.
 */
FoundationWidget.prototype.setAsContainer= function(bool){
    this.isContainer = bool;
    this.renderPayne.isContainer=bool;
}

FoundationWidget.prototype.setProperties = function(PropertiesObject){

this.properties = PropertiesObject || this.properties;
var postRender = this.isRendered || false;
   if(postRender) this.isRendered = false;

for(var key in this.properties){
    var meth = ["set",key.charAt(0).toUpperCase(),key.substr(1)].join("");

     if(this.properties[key] != null)
        if(this[meth])
           this[meth](this.properties[key]);
        else if(this.theme && this.theme[meth])
           this.theme[meth](this.properties[key]);

   }


   if(postRender){
          this.isRendered = true;
          if(this.doRender)
            this.doRender();
   }
return PropertiesObject;
}


/**
 * If you enable the keyboard hook with no arguments the mainPanel will be assigned by
 * default. Callbacks will be methods assigned to the widget with the prefix key_<key code>.
 *
 * for example if I wanted to capture the enter key you would do this.
 *
 * myWidget.key_13 = function(){alert('you pressed the enter key!);}
 **/
FoundationWidget.prototype.setKeyboardHook = function(OPT_HTMLElement){

    this.keyHookElement = OPT_HTMLElement || this.mainPanel;
    var _parent = this;
    this.keyHookElement.onkeyup = function(e){
       var KeyID = (window.event) ? event.keyCode : e.keyCode;
       if(_parent["key_"+KeyID])
           _parent["key_"+KeyID]();
    }

}

FoundationWidget.prototype.addOnFinalizeEvent = function(evt){
    if(!this.onFinalizeArray)
        this.onFinalizeArray = new Array;

    this.onFinalizeArray.push(evt);
}
FoundationWidget.prototype.destroy = function(){
    this.renderPayne.destroy();
    if(this.mainPanel)
       this.mainPanel.destroy();
}
FoundationWidget.prototype.finalize = function(){

     if(this.onFinalizeArray)
         for(var i=0; i<this.onFinalizeArray.length; i++)
             this.onFinalizeArray[i]();
}

FoundationWidget.prototype.setVisible = function(bool){
    this.renderPayne.setVisible(bool);
}

FoundationWidget.prototype.setChildren = function(child,handle){
    this.mainPanel.removeComponent("*");
    this.addChild(child, handle);
}

FoundationWidget.prototype.addChild = function(child,handle){
  if(handle && this[handle])
      throw "FoundationWidget: Attempted to add an element to this widget with a namespace that allready exists: "+handle;
  else{
      this[handle]=child;

      if(this.onAddChild)
          this.onAddChild(child);

      this.mainPanel.addChild(child,handle);
      child.layoutContainer = this.mainPanel;

  }

}

FoundationWidget.prototype.tofront = function(){
  this.renderPayne.style.zIndex = _SRGetTopIndex(rootPayne);
}

FoundationWidget.prototype.loadRenderProperties = function(propertiesObj){
    if(propertiesObj.size)
        this.setSize(propertiesObj.size);

    if(propertiesObj.position)
        this.setPosition(propertiesObj.position);
}


FoundationWidget.prototype.setSize = function(width,height){
  if(typeof width == "object"){
      if(width.height)
         height = width.height;

      if(width.width)
        width = width.width;
  }

  this.setWidth(width);
  this.setHeight(height);
}

FoundationWidget.prototype.setWidth = function(width){
  this.width = width;

  this.renderPayne.setWidth(width);

  if(this.onSetWidth && this.isRendered)
      this.onSetWidth(width);
}


FoundationWidget.prototype.setHeight = function(height){
  this.height = height;

  this.renderPayne.setHeight(height);

  if(this.onSetHeight && this.isRendered)
      this.onSetHeight(height);
}

///// Position \\\\\
FoundationWidget.prototype.setPosition = function(left,top){
  if(typeof left == "object"){
      if(left.top)
         top = left.top;
     if(left.left)
         left = left.left;
  }
  this.renderPayne.setPosition(left, top);
}

FoundationWidget.prototype.setTop = function(top){
  this.renderPayne.setTop(top);
}

FoundationWidget.prototype.setLeft = function(left){
     this.renderPayne.setLeft(left);
}
///// Add / Remove / Get sub components \\\\\\
FoundationWidget.prototype.removeChild = function(child){
  this.mainPanel.removeComponent(child);
}
/**
 * Sets the entire object for positioning according to the parent element.
 */
FoundationWidget.prototype.setAutoSize = function(bool){
    if(bool || bool==null){
		this.renderPayne.style.width = "";
		this.renderPayne.style.height = "";
		this.renderPayne.style.display = IE?"inline":"inline-block";
	}else{
		this.renderPayne.style.width = "";
		this.renderPayne.style.height = "";
		this.renderPayne.style.display = IE?"inline":"inline-block";
	}
}

/**
 * loads and sets, the font object, passed a string representing the font in the theme object or as an object
 */
FoundationWidget.prototype.setFont = function(fontHandle){
	this.font.setSchemaFont(fontHandle,this.mainPanel);
}
