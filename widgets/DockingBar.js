
// toolbars height property is defined by the themes toolbar background image.

DockingBar.prototype = new UIWidget;
DockingBar.prototype.widgetName = "dockingBar";
DockingBar.prototype.constructor = DockingBar;
DockingBar.prototype.defaultProperties=
    {
      width:200,
      itemWidth:36,
      itemSpacing:10,
      rightMargin:5
    }
    
function DockingBar(configObject){
    this.initWidget(configObject);
    this.init();
}

DockingBar.prototype.init = function(){

    this.layout = new GridLayout(1,3);
    this.itemsArray = new Array;

    this.addChild(this.layout);
    this.mainPanel = SRLayout.getDiv();
    this.mainPanel.setAbsolute();
    this.renderPayne.style.overflow = "visible";
    this.layout.getCell(1,2).appendChild(this.mainPanel);
    
    this.lCellWidth = this.theme.getImageMap("left.standard")[1];
    this.rCellWidth = this.theme.getImageMap("right.standard")[1];
    this.setHeight(this.theme.getImageMap("hTile.background")[2]);
   
    
}

DockingBar.prototype.setItemWidth = function(width){this.itemWidth = width; if(this.isRendered)this.doRender(); }
DockingBar.prototype.setItemSpacing = function(width){this.itemSpacing = width; if(this.isRendered)this.doRender();}
DockingBar.prototype.setRightMargin = function(width){this.rightMargin = width; if(this.isRendered)this.doRender();}

/**
 * A pre-render flag that causes the bar to have no end images and to be non-floating
 */
DockingBar.prototype.setDocked = function(bool){
    this.isDocked = bool;
    
    if(bool == true){
        this.setExpandable(false);
        this.setFloating(false);
        this.setResizable(false);
        this.layout.getCell(1,1).style.background = "";
        this.layout.setColumnWidth(1, 1);
        this.layout.getCell(1,3).style.background = "";
        this.layout.setColumnWidth(3, 1);
    }
}


DockingBar.prototype.doFactorLayout = function(){

if(this.expandable)
    this.expandWidth = (this.itemsArray.length * (this.itemWidth+this.itemSpacing))+this.rightMargin+this.lCellWidth+this.rCellWidth;

this.setWidth(this.expandWidth);
    
    if(this.resizable){
        this.rDragger.resizer.setDragBoundries(this.lCellWidth+1);
        this.resizeHandle.setWidth(this.rCellWidth);
        this.resizeHandle.setLeft(this.width - this.rCellWidth);
        //this.resizeHandle.style.backgroundColor="red";
    }

    this.layout.getCell(1, 3).style.background = this.theme.getImageStyle(this.resizable?"right.resizable":"right.standard");
    this.layout.setColumnWidth(3, this.rCellWidth);
    
//    if(this.expandable){
//
//    }
    this.layout.getCell(1, 1).style.background = this.theme.getImageStyle(this.expandable?"left.expandable":"left.standard");

}

DockingBar.prototype.setResizable = function(bool){
    this.resizable = bool;

    if(this.resizable){
        if(!this.resizeHandle){
            this.resizeHandle = SRLayout.getDiv().setAbsolute();
            this.layout.addChild(this.resizeHandle,1,3);
        }
        
        this.resizeHandle.style.cursor = this.theme.themeObject.resizeCursor;
        if(!this.rDragger)
            this.rDragger = new TResizable(this.renderPayne, this.resizeHandle, true);
        
        this.rCellWidth = this.theme.getImageMap("right.resizable")[1];
        
    }else{
       if(this.resizeHandle){
        this.resizeHandle.destroy();
        this.resizeHandle = null;
       }
        this.rDragger = null;
        this.rCellWidth = this.theme.getImageMap("right.standard")[1];

    }
    this.doFactorLayout();
   
}

DockingBar.prototype.setExpandable = function(bool){
    this.expandable = bool;
    var bLeft = this.theme.getImageMap("left.standard")[1];

  if(bool){
      if(!this.extBtn){
            this.setEffects(true);
            var _parent = this;

            this.effects.onExpand = function(){
                for(var i=0; i<_parent.itemsArray.length; i++)
                   _parent.itemsArray[i].setVisible(true);

                   _parent.contracted = false;
                   _parent.doFactorLayout();
               }
            this.effects.onBeforeContract = function(){
                for(var i=0; i<_parent.itemsArray.length; i++)
                   _parent.itemsArray[i].setVisible(false);
                   _parent.contracted = true;

               }
            this.extBtn = _SRImageMapUtils.getImage("buttons.expand", this.theme.imageSetData);
            this.extBtn.setAbsolute();
            this.extBtn.setPosition(bLeft,1);

            this.conBtn = _SRImageMapUtils.getImage("buttons.contract", this.theme.imageSetData);
            this.conBtn.setAbsolute();
            this.conBtn.setPosition(bLeft,1);

            this.layout.addChild(this.extBtn,1,1,"extBtn");
            this.layout.addChild(this.conBtn,1,1,"conBtn");

            this.lCellWidth = this.theme.getImageMap("left.expandable")[1];

            this.extBtn.onclick = function(){
               _parent.conBtn.setVisible(true);
               _parent.expand();
               this.setVisible(false);
            }

            this.conBtn.onclick = function(){
               _parent.extBtn.setVisible(true);
               _parent.contract();
               this.setVisible(false);
            }
          }
    

  }else{
    if(this.extBtn){
      this.layout.getCell(1,1).removeChild(this.conBtn);
      this.layout.getCell(1,1).removeChild(this.extBtn);

      this.extBtn = null;
      this.conBtn = null;

      this.setEffects(false);
      delete this.effects;
      this.lCellWidth = bLeft;
      this.layout.setColumnWidth(1, bLeft);
      this.mainPanel.setLeft(bLeft);

      if(this.contracted)
          for(var i=0; i<this.itemsArray.length; i++)
               this.itemsArray[i].setVisible(true);

    }
  }
  
      this.doFactorLayout();
}

DockingBar.prototype.expand = function(){
   if(!this.effects || !this.expandable) return false;
   this.effects.expand({size:this.expandWidth,interval:25,direction:"horizontal"});
}

DockingBar.prototype.contract = function(){
   if(!this.effects || !this.expandable) return false;
   this.effects.contract(this.lCellWidth+this.rCellWidth,25,this.renderPayne,"horizontal");
}


DockingBar.prototype.setFloating = function(bool){

  this.floating = bool;
      if(this.floating){
           this.dragHandle = SRLayout.getDiv().setAbsolute();
           this.layout.addChild(this.dragHandle,1,1);
           this.dragable = new TDraggable(this.renderPayne, this.dragHandle);
           this.dragHandle.style.cursor = this.theme.themeObject.dragCursor;
      }else{
          // remove the drag handle
     
      }
       
}


DockingBar.prototype.addItem = function(iconHandle, captionText, action){
    var iPanel = _SRImageMapUtils.getImage("highlight", this.theme.imageSetData);
    var icon = new Icon(iconHandle);

    icon.renderPayne.style.position = "absolute";
    icon.renderPayne.style.zIndex = 2;
    iPanel.appendChild(icon.renderPayne);
    iPanel.HLBG = this.theme.getImageStyle("highlight");
    
    iPanel.style.background="";
    icon.renderPayne.onmouseover = function(){iPanel.style.background = iPanel.HLBG;}
    icon.renderPayne.onmouseout = function(){iPanel.style.background = "";}

    if(this.itemsArray.length)
        iPanel.setLeft((this.itemsArray.length * (this.itemWidth+this.itemSpacing))+this.rightMargin);
    else
        iPanel.setLeft(this.rightMargin);
    iPanel.setTop((this.height - iPanel.height) / 2);

    icon.setLeft(Math.round(iPanel.width - icon.width)/2);
    icon.setTop((iPanel.height - icon.height)/2);

    if(action)
        icon.renderPayne.onclick = function(){action();}

    if(captionText){
        icon.renderPayne.title = captionText;
    }
    this.addChild(iPanel);
    this.itemsArray.push(iPanel);
    this.doFactorLayout();
    return iPanel;
}

DockingBar.prototype.onStartDrag = function(){
    this.layout.renderPayne.style.overflow = "hidden";
}

DockingBar.prototype.onStopDrag = function(){
    this.layout.renderPayne.style.overflow = "visible";
}

DockingBar.prototype.onInsert = function(){
    this.doRender();
}

DockingBar.prototype.doRender = function(){

 if(this.isDocked){
    this.layout.getCell(1, 2).style.background = this.theme.getHorizontalStyle("background");
    this.layout.getCell(1,1).style.background = "";
    this.layout.setColumnWidth(1, 1);
    this.layout.getCell(1,3).style.background = "";
    this.layout.setColumnWidth(3, 1);
    this.renderPayne.style.width = "100%";
    this.mainPanel.style.width = "100%";
    this.layout.table.style.width = "100%";

 }else{
    this.mainPanel.setLeft(this.lCellWidth);
       this.layout.setColumnWidth(1, this.lCellWidth);
       this.layout.setColumnWidth(3, this.rCellWidth);

       // load counter colors
       this.layout.getCell(1, 2).style.background = this.theme.getHorizontalStyle("background");
       this.layout.getCell(1, 3).style.background = this.theme.getImageStyle(this.resizable?"right.resizable":"right.standard");

       if(this.expandable != null)
           this.setExpandable(this.expandable);

       if(this.resizable != null)
           this.setResizable(this.resizable);
 }
  
   
}

