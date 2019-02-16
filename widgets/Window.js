
@lib("UIWindowManager");

var WindowManager = new SRWindowManager();

///////////////////////////// Window.js \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
Window.prototype = new UIWidget;
Window.prototype.widgetName = "window";
Window.prototype.constructor = Window;
Window.prototype.defaultProperties={
    width:200,
    height:200,
    titleText:"New Window",
    icon:"system.window",
    scrollable:true,
    dragable:true,
    closable:true,
    userResizable:true,
    maximizable:true,
    dragBoundries:true
}

function Window(PropertiesObject){
    this.init(PropertiesObject);
}

Window.prototype.init = function(PropertiesObject){
   this.initWidget(PropertiesObject);
   this.WINID = _SRGetUniqueId();
   this.table =  new GridLayout(3,3);

   this.renderPayne.setChildren(this.table,"frameLayout");
   this.renderPayne.winHandle = this.WINID;
   this.renderPayne.style.zIndex = 3;
   this.renderPayne.style.overflow = "visible";
   _SRSetUndragable(this.renderPayne);
   
   this.mainPanel = SRLayout.getDiv().setAbsolute();
   this.mainPanel.winHandle = this.WINID;
 //  _SRSetUndragable(this.mainPanel);

   this.table.addChild(this.mainPanel,2,2);
  
   this.titleLabel = new Label(this.titleText, this.icon);

   if(this.theme.themeObject.titleBar && this.theme.themeObject.titleBar.font)
        this.titleLabel.setFont(this.theme.themeObject.titleBar.font);
   else
        this.titleLabel.setFont({color:this.theme.altSchema.font});


   this.titleLabel.renderPayne.style.zIndex = 1;

   this.table.addChild(this.titleLabel,1,2);

   this.winState = "normal";

   this.titleBar = SRLayout.getDiv("100%",this.theme.getImageMap("titleBar.left")[2]).setAbsolute();
   this.titleBar.style.zIndex = 2;
   this.controlGrid = SRLayout.getBaseTable(1, 3);
   this.controlGrid.style.zIndex = 3;
   setCSSFloat(this.controlGrid, "right");
   this.titleBar.addChild(this.controlGrid);
 
   _SRSetUndragable(this.titleBar);
   this.renderPayne.addChild(this.titleBar);
   
}

Window.prototype.setMainPanelSchema = function(schema){
    this.mainPanel.schema = (typeof schema == "string")?schema:schema.title;
    _SRLoadSchema(this.mainPanel, schema);
}

Window.prototype.setLayout = function(gridLayout){
    this.layout = gridLayout;
    if(this.isRendered)
        this.mainPanel.setChildren(gridLayout);
}


/**
* Toggle scroll bars in the content Panel
*/
Window.prototype.setScrollable = function(bool){
    this.isScrollable = bool;
}

Window.prototype.setDragBoundries = function(bool){
     this.dragBoundries = bool;
}

Window.prototype.setMaximizable = function(bool){
     this.isMaximizable = bool;
}


Window.prototype.setDragable = function(bool){
    this.isDragable = bool;
    if(this.isRendered)
     this.doRenderDrag();
}

/**
 * MenuArrays are formated as a list of arrays each with three elements.
 * ["File",[
 *      ["open file","icon.example",function(){alert("bling1");}],
 *      ["close file","icon.example",function(){alert("bling2");}]
 *     ]
 * ]
 *
 */
Window.prototype.setMenuBar = function(){
    this.menuBar = new MenuBar();
    this.menuBar.renderPayne.style.zIndex = 5;

    this.menuBar.setSchema(this.theme.schema);

    if(this.isRendered){
        this.renderPayne.addChild(this.menuBar);
        this.menuBar.setTop(this.titleBar.height +1);
    }

    
   return this.menuBar;
}

Window.prototype.setToolBar = function(){
    this.toolBar = new ToolBar();
    this.toolBar.renderPayne.style.zIndex = 4;
    if(this.isRendered){
        this.renderPayne.addChild(this.toolBar);
        this.toolBar.setTop(this.titleBar.height + (this.menuBar?this.menuBar.height:0) + (IE?0:1) );
    }

    return this.toolBar;
}


Window.prototype.setTitleText = function(text){this.titleText = text;if(this.titleLabel)this.titleLabel.setText(text);}
Window.prototype.setIcon = function(icon){this.titleIcon = icon;if(this.titleLabel) this.titleLabel.setIcont(icon);}
Window.prototype.setTitle = function(text,icon){
   this.titleText = text;
   this.titleIcon = icon;
   if(this.titleLabel){
    this.titleLabel.setLabel(text, icon);
    this.titleLabel.icon.renderPayne.style.zIndex = 2;
   }
}

Window.prototype.toFront = function(){
     WindowManager.setTopWindow(this.WINID);
}

Window.prototype.setClosable = function(bool){
 this.isClosable = bool;
}

Window.prototype.setUserResizable = function(bool){
 this.isUserResizable = bool;
}

Window.prototype.doRenderDrag = function(){

     if(!this.isDragable){
        if(this.drag)
            this.drag.stop();
        return false;
     }else
     if(!this.drag){
           this.setAbsolutePosition();
           this.titleBar.style.cursor = this.theme.themeObject.dragCursor || "default";
           this.renderPayne.parent = this;
           this.drag = new TDraggable(this.renderPayne,this.titleBar);
           this.drag.onStartDrag = this.toFront;
        }else{
          if(this.drag)
            this.drag.stop();

           this.drag = null;
        }
}

Window.prototype.onStopDrag = function(){
  
}

Window.prototype.onStartDrag = function(){
        this.toFront();
}

Window.prototype.resize = function(width,height){

  if(this.renderPayne.dragBoundries &&  this.renderPayne.parentNode){

      if((width + this.renderPayne.left) > this.renderPayne.parentNode.clientWidth){
        width = this.renderPayne.parentNode.clientWidth - this.renderPayne.left;
      }
      if((height + this.renderPayne.top) > this.renderPayne.parentNode.clientHeight){
        height = this.renderPayne.parentNode.clientHeight - this.renderPayne.top;
      }
    
  }

  this.setSize(width,height);
  
  if(this.resizeImage)
  this.resizeImage.setPosition(this.width - (this.resizer.width + this.theme.statusBar.right.size.width), this.height - (this.resizer.height + 5));
  this.toFront();
  if(this.renderPayne.dragBoundries){
          this.renderPayne.dragBoundries.bottom[0] = this.renderPayne.parentNode.clientWidth - this.width;
          this.renderPayne.dragBoundries.bottom[1] = this.renderPayne.parentNode.clientHeight - this.height;
  }
  this.positionResizer();
  this.sizeMainPanel();

  // send instruction to sub windows
  // the intent is to establish a basic premis for managing nested windows.. this is not
  // a substitution for a true MDI widget, which would have its own instance of windowManager 
  if(this.mainPanel.childWindows){
    for(var i in this.mainPanel.childWindows){
       var w = this.mainPanel.childWindows[i];
       if(w.renderPayne.parentNode)
            w.resize(w.width,w.height);
        else
            delete this.mainPanel.childWindows[i];

       w=null;
    }
  }

}


Window.prototype.maximize = function(){

  var width = this.renderPayne.parentNode.clientWidth;
  var height = this.renderPayne.parentNode.clientHeight;


  if(!this.restoreState || this.restoreState == null)
        this.restoreState = _SRGetRelativeCoords(this.renderPayne);

    this.renderPayne.setPosition(0,0);
    this.resize(width,height);

    if(this.resizeHandle)
        this.resizeHandle.setVisible(false);

    this.winState = "maximized";
   

}

Window.prototype.positionResizer = function(){
    if(this.isUserResizable){
        var th = this.theme.getImageMap("statusBar.left");
        var left = this.width - (this.resizeHandle.width +th[1]);
        var top = (this.height -this.resizeHandle.height) - (th[2] / 4);
        this.resizeHandle.setPosition(left,top);
    }
}

Window.prototype.restore = function(){

    if(this.restoreState){
        this.resize(this.restoreState.width,this.restoreState.height);

        this.renderPayne.setPosition(this.restoreState.left,this.restoreState.top);
        this.restoreState = null;
        this.winState = "normal";
    
    if(this.resizeHandle)
            this.resizeHandle.setVisible(true);
    
    }
}

Window.prototype.close = function(){
    if(this.onClose){
        this.onClose();
    }

    WindowManager.removeWindow(this);
}

Window.prototype.loadControls = function(){

var _parent = this;
if(!this.closeButton && this.isClosable){
    this.closeButton = this.theme.getImage("controls.close");
    if(this.closeButton){
        this.closeButton.onclick = function(){_parent.close();}
        this.closeButton.title = "Close Window";
        this.closeButton.style.position="static";
        this.closeButton.style.cursor = "pointer";
        this.controlGrid.getCell(1,2).appendChild(this.closeButton);
    }
}

if(this.isMaximizable && !this.maxToggle){
       this.maxToggle = this.theme.getToggleImage("controls.max", "controls.min").setToggleOnClick(true);
       this.controlGrid.getCell(1,1).appendChild(this.maxToggle.renderPayne);
       this.maxToggle.renderPayne.style.cursor = "pointer";
       this.maxToggle.onToggle = function(){
         
           if(this.state == "active"){
             _parent.maximize();
           }else{
           
             _parent.restore();
           }
       }
 }

if(!this.resizeHandle && this.isUserResizable){
    this.resizeHandle = this.theme.getImage("statusBar.resize");
    if(this.resizeHandle){
        this.resizeHandle.style.position = "absolute";
        this.positionResizer();
    }
}


if(this.resizeHandle){
       this.renderPayne.style.position = "absolute";
       this.renderPayne.addChild(this.resizeHandle);
 
        this.renderPayne.onBeforeResize = function(){
            if(!this.sLayer)
                this.sLayer = this.addChild(SRLayout.getDiv().setAbsolute());
            else
                this.sLayer.setVisible(true);

            this.sLayer.setPosition(0,0);
            this.sLayer.style.backgroundColor = "Gray";
            this.sLayer.style.border = "dashed 1px";
            _SRSetOpacity(this.sLayer,25);

            this.restoreOverflow = this.style.overflow;
            this.restoreIndex = this.style.zIndex || 1;
            this.style.zIndex = _SRGetTopIndex() + 1;
            this.sLayer.style.zIndex = _SRGetTopIndex() + 1;
            this.style.overflow = "visible";
        }

        this.resizer = new TResizable(this.renderPayne, this.resizeHandle);
        this.resizeHandle.style.cursor = this.theme.themeObject.resizeCursor || "se-resize";
}


}

/**
 * lock: (Boolean)
 * if this is true, this window cannot be set to its previous state by user inneraction.
 * Normally the window's focus is handled by the window manager. That is not the case if the
 * window is locked. The only way to alter its state is to call setFocus again. This is used
 * in a scenario where you have say Icons to choose from in a pannel which you want in front
 * of a window that is shaded to denote that the options are manditory to continue.
 *
 * zIndex: (number)
 * If you specify a zindex that will be used to layer the shaded panel over the window. If it
 * is ommited, we will use 10. That's the natural index domain for the shade layer.
 *
 * It's strongly advised not to alter this unless you have a specific reason for doing so.
 * If you wanted to show a panel which contained a login box for example, you could alter the layer
 * in place and push something outside the shadow then pull it back in. 
 *
 */
Window.prototype.setFocus = function(bool, lock, zIndex){

if(!this.shadeLayer){
    this.shadeLayer = SRLayout.getDiv();
    this.shadeLayer.style.position = "absolute";
    // shade layer has a default value of 10, so anything over 10 will be ontop of this.
    this.shadeLayer.style.zIndex = zIndex || 10;
    this.shadeLayer.setPosition(0,0);
    this.shadeLayer.style.backgroundColor = "Gray";
    this.renderPayne.addChild(this.shadeLayer);
}

    this.shadeLayer.style.visibility = bool?"hidden":"visible";
    if(!lock){
        var _parent = this;
        this.shadeLayer.onmousedown = function(){WindowManager.setTopWindow(_parent);}
    }else{
        this.shadeLayer.onmousedown = null;
    }
    _SRSetOpacity(this.shadeLayer,this.theme.unFocusedShadowWeight || 20);
}


Window.prototype.onInsert = function(p){
    if(!this.renderPayne.parentNode.winHandle){
         WindowManager.addWindow(this);
    }else{
        if(!this.renderPayne.parentNode.childWindows)
            this.renderPayne.parentNode.childWindows = {};
       
        this.renderPayne.parentNode.childWindows[this.renderPayne.winHandle] = this;
    }
    
    this.doRender();
}

Window.prototype.sizeMainPanel = function(){
   var nHeight = this.height - (this.theme.getImageMap("titleBar.left")[2] + this.theme.getImageMap("statusBar.left")[2] + (this.menuBar?this.menuBar.height:0) + (this.toolBar?this.toolBar.height+1:0))
   this.mainPanel.setWidth(this.width - (this.theme.getImageMap("titleBar.left")[1] + this.theme.getImageMap("titleBar.right")[1]));
   this.mainPanel.setHeight(nHeight - 3);
   this.mainPanel.setPosition(this.theme.getImageMap("titleBar.left")[1],this.theme.getImageMap("titleBar.left")[2]+ (this.menuBar?this.menuBar.height:0)+ (this.toolBar?this.toolBar.height+1:0) +1);
   this.mainPanel.style.zIndex = 1;

   if(this.menuBar){
      this.menuBar.setWidth(this.mainPanel.width+(this.theme.getImageMap("titleBar.left")[1]));
      this.menuBar.setLeft(this.theme.getImageMap("titleBar.left")[1]/2);
   }

   if(this.toolBar){
       this.toolBar.setWidth(this.mainPanel.width+(this.theme.getImageMap("titleBar.left")[1]));
       this.toolBar.setLeft(this.theme.getImageMap("titleBar.left")[1]/2);
   }

  
}

/**
 * sets the status text and Icon, image or animated icon. 
 * (text, icon)
 * 
 * 
 */
Window.prototype.setStatus = function(text, icon){
    if(typeof icon == "String") icon = new Icon(icon);

    if(!this.statusBar){
       this.statusBar = SRLayout.getDiv();
       this.table.addChild(this.statusBar, 3, 2);
       this.statusBar.addChild(new GridLayout(1, 2),"label");
       _SRLoadFontObj(this.statusBar.label.getCell(1,2), theme.fonts.primary);

       var tobj = this.theme.themeObject.statusBar;
       if(tobj){
           if(tobj.font)
                _SRLoadFontObj(this.statusBar.label.getCell(1,2), tobj.font);
           if(tobj.defaultIcon){
           // TODO: create a icon object that works like the font object, where you can set the values from the theme to determin layout.
           this.statusBar.defaultIcon = new Icon(tobj.defaultIcon);
           }

       }
       
       this.statusBar.label.setColumnWidth(1, 20);
       this.statusBar.setIcon = function(icon){
           this.icon = icon || new Icon("blank");
           if(this.label.getCell(1,1).icon){
               this.label.getCell(1,1).innerHTML=""; //icon.renderPayne.destroy();
           }
           this.label.getCell(1,1).icon = icon;
           this.label.addChild(icon,1,1);

       }
       this.statusBar.setText = function(text){
           if(!this.text){
               this.text = SRLayout.getTextDiv(""+text);
               this.label.addChild(this.text,1,2);
           }else{
               this.text.setText(text);
           }
       }
      
    }

    if(this.isRendered){
        this.statusBar.setIcon(icon);
        this.statusBar.setText(text);
    }else{
        this.statusBarText = text;
        this.statusBarIcon = icon;
    }
}


Window.prototype.doRender = function(){

if(this.dragBoundries == true || this.dragBoundries == "block"){
   var l = this.renderPayne.parentNode.clientWidth - this.width;
   var t = this.renderPayne.parentNode.clientHeight - this.height;
   this.renderPayne.dragBoundries = {top:[0,0],bottom:[l,t]};
}

this.table.setColumnWidth(1, this.theme.getImageMap("titleBar.left")[1]);
this.table.setRowHeight(1, this.theme.getImageMap("titleBar.left")[2]);
this.table.setColumnWidth(3, this.theme.getImageMap("statusBar.left")[1]);
this.table.setRowHeight(3, this.theme.getImageMap("statusBar.left")[2]);

this.controlGrid.getCell(1,3).style.width = this.theme.getImageMap("statusBar.left")[1]+"px";

this.table.getCell(1,1).style.background = this.theme.getImageStyle("titleBar.left");
this.table.getCell(1,2).style.background = this.theme.getHorizontalStyle("titleBar");
this.table.getCell(1,3).style.background = this.theme.getImageStyle("titleBar.right");

this.table.getCell(2,1).style.background = this.theme.getVerticalStyle("left");
this.table.getCell(2,2).style.backgroundColor = this.theme.schema.base;
this.table.getCell(2,3).style.background = this.theme.getVerticalStyle("right");

this.table.getCell(3,1).style.background = this.theme.getImageStyle("statusBar.left");
this.table.getCell(3,2).style.background = this.theme.getHorizontalStyle("statusBar");
this.table.getCell(3,3).style.background = this.theme.getImageStyle("statusBar.right");

// calculate mainPanel Dim
this.sizeMainPanel();

this.loadControls();

 if(this.isScrollable)
    this.mainPanel.style.overflow = "auto";
 else
    this.mainPanel.style.overflow = "hidden";


if(this.theme.themeObject.mainPanel && this.theme.themeObject.mainPanel.schema && !this.mainPanel.schema)
    _SRLoadSchema(this.mainPanel, this.theme.themeObject.mainPanel.schema);

 
this.titleLabel.setLabel(this.titleText,this.titleIcon);


 this.doRenderDrag();
 this.positionResizer();

  // send instruction to sub windows
  if(this.mainPanel.childWindows){
    for(var i in this.mainPanel.childWindows){
       var w = this.mainPanel.childWindows[i];
       w.resize(w.width,w.height);
       w=null;
    }
  }

// transparencies in IE.. not so hot
if(IE)
 this.titleBar.style.background = new Icon("blank").renderPayne.style.background;

if(this.menuBar){
        this.renderPayne.addChild(this.menuBar);
        this.menuBar.setTop(this.titleBar.height);
    }

if(this.toolBar){
   this.renderPayne.addChild(this.toolBar);
   this.toolBar.setTop(this.titleBar.height + (this.menuBar?this.menuBar.height:0)+1);
}

if(this.statusBarText){
    this.statusBar.setText(this.statusBarText);
    delete this.statusBarText;
}
if(this.statusBarIcon){
    this.statusBar.setIcon(this.statusBarIcon);
    delete this.statusBarIcon;
}

if(this.layout)
    this.mainPanel.setChildren(this.layout);


}







