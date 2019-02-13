

/* 
 * A docked toolbar for windows and panels.
 */
ToolBar.prototype = new UIWidget;
ToolBar.prototype.widgetName = "toolBar";
ToolBar.prototype.constructor = ToolBar;
ToolBar.prototype.defaultProperties = {
    height:37,
    margin:5,
    spacing:5,
    width:"100%"
}

function ToolBar(PropertiesObject){
    this.init(PropertiesObject);
}

 ToolBar.prototype.init = function(PropertiesObject){
    this.initWidget(PropertiesObject);
    this.layoutContainer = new GridLayout(1,1);
    this.layoutContainer.addChild = function(elem, handle){
        elem = elem.renderPayne || elem;
        this.getCell(1,1).appendChild(elem);

        if(handle)
            this[handle] = elem;
    }
    

    this.setAbsolutePosition();
    // all toolbars and their children will start at index 11;
    this.renderPayne.style.zIndex = 3;
    this.renderPayne.style.overflow = "visible";
    this.menuItems = new Array;

    this.layout = new GridLayout(1, 1,"100%","100%");
    this.layout.table.style.width = "";
    this.layout.table.width = "";

    this.layout.setColumnWidth(1, this.margin);
    this.layout.table.style.tableLayout = "auto";
    this.layout.setHorizontalAlignment("center");
    this.layout.setVerticalAlignment("middle");
    this.setDivider("bottom");
    this.layoutContainer.addChild(this.layout);

    this.addChild(this.layoutContainer);
 }
ToolBar.prototype.setMenuPanelSchema = function(schemaHandle){
    this.menuPanelSchema = schemaHandle;
}
 ToolBar.prototype.setMargin = function(intValue){this.margin = intValue;}
 ToolBar.prototype.setSpacing = function(intValue){this.spacing = intValue;}

 /**
  * sets the toolbars divider,
  * params:
  * whichSide = (string) "top","bottom","left","right"
  * orentation = (string) "inner","outer"
  *
  * the orentation param denotes the order that the colors are aranged. "outer" gives the
  * apeariance of a slight bevel while "inner" renders a slight indentation.
  *
  * default is: "bottom","outer"
  *
  */
 ToolBar.prototype.setDivider = function(whichSide,orentation){
    orentation = orentation || "outer";
    whichSide = whichSide || "bottom";
    
    var colors = [this.schema.divide.inner,this.schema.divide.outer];
    if(orentation == "outer")
        colors = [this.schema.divide.outer,this.schema.divide.inner];

    var side = "border"+_SRStringUtils.capitolizeFirstChar(whichSide);


    this.layoutContainer.table.style[side] ="1px solid #"+colors[0];
    this.renderPayne.style[side] ="1px solid #"+colors[1];

    colors = null;
    side = null;

 }

 /**
  * Inserts a seperator into the bar after the last menuItem from left -> right
  */
 ToolBar.prototype.insertBreak = function(){
    var border = document.createElement("div");
    border.style.width = "1px";
    border.style.height = "80%";
    border.style.borderLeft = "solid 1px #"+this.theme.schema.divide.inner;
    border.style.borderRight = "solid 1px #"+this.theme.schema.divide.outer;
    
    this.layout.addColumn(this.spacing + 2);
    this.layout.addChild(border, 1, this.layout.numColumns);
    
}

// set the rollover background for the menuItems. The parameter must be an appImage or Icon

ToolBar.prototype.setHighlight = function(){
    this.isHighlight = true;
}

ToolBar.prototype.closeMenuPanels = function(){
    for(var i=0; i< this.menuItems.length; i++){
      if(this.menuItems[i].menuPanel)
         this.menuItems[i].menuPanel.contract(true);
    }

}


ToolBar.prototype.addMenuItem = function(menuItem, disableHoverEffect){
     menuItem.renderFilm.setHeight(this.height);
     this.layout.addColumn();
     var lcol = this.layout.numColumns;
     var ColArr = new Array;
     var _parent = this;

     if(this.isHighlight && !disableHoverEffect){
        
         var hDim = this.theme.getImageSize("highlight.right");
         
         var cb = {};
         cb.left = this.theme.getImageStyle("highlight.left");
         cb.bg = this.theme.getHorizontalStyle("highlight");
         cb.right = this.theme.getImageStyle("highlight.right");

         ColArr[0] = lcol;
         this.layout.setColumnWidth(lcol, hDim.width);
         this.layout.addColumn();
         lcol ++;
         ColArr[1] = lcol;
         this.layout.addColumn();
         lcol++;
         ColArr[2] = lcol;
         this.layout.setColumnWidth(lcol, hDim.width);


        menuItem.addMouseOverAction(function(){
            _parent.layout.getCell(1,ColArr[0]).style.background = cb.left;
            _parent.layout.getCell(1,ColArr[1]).style.background = cb.bg;
            _parent.layout.getCell(1,ColArr[2]).style.background = cb.right;

        });
        menuItem.addMouseOutAction(function(){
            _parent.layout.getCell(1,ColArr[0]).style.background = "";
            _parent.layout.getCell(1,ColArr[1]).style.background = "";
            _parent.layout.getCell(1,ColArr[2]).style.background = "";
        
        });

     }

        if(menuItem.menuPanel){
            menuItem.menuPanel.setSchema(this.menuPanelSchema || this.schema.alt);
            
            menuItem.menuPanel.onAction = function(){
                menuItem.menuPanel.contract();
            }

            menuItem.menuPanel.onMenuExpand=function(){
                menuItem.inUse = true;
            }

            menuItem.menuPanel.onMenuContract=function(){
                menuItem.inUse = false;
            }

            menuItem.setAction(function(){
                menuItem.menuPanel.setVisible(true);
                menuItem.menuPanel.expand();
            });

        menuItem.addMouseOutAction(function(){
            menuItem.menuPanel.MA = false;
        });
        
        }

    this.layout.addChild(menuItem,1, ColArr[1] || this.layout.numColumns);
    
     if(menuItem && menuItem.widgetName && menuItem.widgetName == "menuItem"){
        menuItem.index = this.layout.numColumns;
        this.menuItems.push(menuItem);
     }

     _SRLoadFontObj(menuItem.layout.renderPayne,this.theme.fontObject);
    

     menuItem.addMouseOverAction(function(){
        _parent.closeMenuPanels();
     });
     
    
     this.layout.addColumn();

     this.layout.addChild(SRLayout.getDiv(this.spacing,"100%"), 1, this.layout.numColumns);
  
     return menuItem;

 }


