
/* 
 * Thesse are the Items that we instanate and add to toolBars, DockingBars and menuBars. These are not
 * widgets in and of themselvs
 */
MenuItem.prototype = new UIWidget;
MenuItem.prototype.widgetName = "menuItem";
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.defaultProperties = {
    height:32,
    width:32,
    submenuIcon:true
}

function MenuItem (PropertiesObject){
    this.initWidget(PropertiesObject);

    this.layout = new GridLayout(1, 1,"100%","100%");
    this.layout.setHorizontalAlignment();
    this.layout.setVerticalAlignment();
    this.addChild(this.layout);


       this.renderFilm = SRLayout.getDiv(this.width,this.height).setAbsolute();
       this.renderFilm.style.zIndex = 2;
       this.renderFilm.style.captionSide = "top";
       this.renderFilm.style.backgroundColor = "white";
       _SRSetOpacity(this.renderFilm,1);
   
  
}


/**
 * Obviously this is the icon that will be displayed, you may submit an effects
 * icon or image. If you submit an effects Icon such as a toggle icon with hover effects
 * the toggle will take place when the action is fired and toggle back when signaled through the
 * setActive() method.
 */
MenuItem.prototype.setIcon = function(icon){
     
     if(!this.icon){
        this.icon = new Icon(icon);
        this.iconPanel = SRLayout.getTable(1,1);
        this.iconPanel.icon = this.icon;
        this.iconPanel.getCell(1,1).addChild(this.icon);
        
     }else{
        this.icon.setIcon(icon);
     }
}

/**
 * caption when a mouse moves over the Icon. This is ideal for toolbars with no
 * text
 */
MenuItem.prototype.setCaption = function(captionText){
    this.caption = captionText;

     if(this.isRendered)
        this.renderFilm.title = this.caption;
}

/**
 *  highlights the menuItems surface.
 */
MenuItem.prototype.setHighlight = function(bool){
    this.hasHighlight = bool;
}
/**
 * If you define a menu item with a label, the label will appear to the right of the
 * icon by default. You may specify an alignment that determins where the text will appear
 * in relation to the Icon.
 *
 * valid options for alignment are
 * "top","bottom","left","right"
 *
 */
MenuItem.prototype.setText = function(text, alignment){
    this.text = text;
    this.textAlign = alignment || "right";

    if(this.textPayne)
        this.textPayne.setText(text);
    

}

///**
// *
// * MENU ITEMS ARE NOT ALWAYS TOOL BAR ITEMS. THEY ARE ALSO MENU BARS IN WINDOWS!!!
// *
// */
MenuItem.prototype.setSubmenuIcon = function(bool){this.submenuIcon = bool;}

/**
 * adds a menuPanel to the action of this Icon, if a menupanel is defined then the action
 * for this module is always to expand the menu.
 *
 * todo: An extention should be made to allow for an aditional action when clicked.
 * 
 */
MenuItem.prototype.setMenuPanel = function(menuPanel){

    if(!menuPanel) menuPanel = new MenuPanel();
        this.menuPanel = menuPanel;

    if(menuPanel.widgetName && menuPanel.widgetName == "menuPanel"){
        this.renderPayne.style.overflow = "visible";
        menuPanel.renderPayne.style.top = this.renderPayne.style.height;
        menuPanel.setVisible(false);
        
        this.menuPanel = menuPanel;
        if(this.isRendered){
            this.renderPayne.addChild(menuPanel);
        }

       if(this.isRendered){
           if(this.text)
            this.menuPanel.setTop("100%");
           else
            this.menuPanel.setTop(this.height-3);
       }

       if(this.onSetMenuPanel)
           this.onSetMenuPanel();

        return  menuPanel;

    }else{
        throw "(MenuItem.setMenuPanel) Atempt to add a menuPanel to the menu item failed because the panel was not a menuPanel widget";
    }
 
}


MenuItem.prototype.setActive = function(bool){
    this.isActive = bool;

    if(this.icon.setActiveState)
        this.icon.setActiveState(bool);

    if(bool){
        if(this.menuPanel) this.menuPanel.expand();
    }else{
        if(this.menuPanel) this.menuPanel.contract(true);
    }
}

MenuItem.prototype.onInsert = function(){
    this.doRender();
}

/**
 * The primary action taken when the submenu has been clicked
 * 
 */
MenuItem.prototype.setAction = function(func){
    this.addOnClickAction(func);
}

MenuItem.prototype.addOnClickAction = function(func){
        if(!this.clickArr)
            this.clickArr = new Array;

    this.clickArr.push(func);
}

MenuItem.prototype.addMouseOverAction = function(func){
        if(!this.mouseoverArr)
        this.mouseoverArr = new Array;

    this.mouseoverArr.push(func);
}

MenuItem.prototype.addMouseOutAction = function(func){
     if(!this.mouseoutArr)
        this.mouseoutArr = new Array;

     this.mouseoutArr.push(func);
}

MenuItem.prototype.doRender = function(){

    if(this.iconPanel){
        this.layout.addChild(this.iconPanel,1,1);
        if(this.menuPanel != null && this.setSubmenuIcon){
            this.subMenuIcon = this.theme.getImage("subMenu").setRelative();
            this.setWidth(this.width + this.subMenuIcon.width);
            this.iconPanel.addColumn();
            var ts = this.iconPanel.getCell(1,2);
            ts.addChild(this.subMenuIcon);
        }
    }

    if(this.text){
        if(this.icon)
            this.layout.addRow(this.theme.font.size);

        this.textPayne = SRLayout.getTextDiv(this.text);
        this.layout.renderPayne.style.fontSize = this.theme.font.size;
        this.layout.renderPayne.style.color = this.theme.font.color;
        this.layout.renderPayne.style.fontFamily = this.theme.font.family;
        this.layout.addChild(this.textPayne,this.layout.numRows,1);
    }

    if(this.menuPanel){
        this.addChild(this.menuPanel);
            // because of the way text is displayed in varous browsers.. we had to make this hack
        
            this.menuPanel.setTop("100%");
        

    }

    this.layout.table.style.tableLayout = "auto";
    
    this.renderPayne.style.display = "block";
    this.renderPayne.style.width = "100%";
    this.renderPayne.style.height = "100%";
 //   this.setAutoSize();
    var _parent = this;
    this.renderFilm.onmouseover = function(){

        if(_parent.mouseoverArr)
            for(var i=0; i<_parent.mouseoverArr.length; i++){
                if(_parent.mouseoverArr[i])
                    _parent.mouseoverArr[i](_parent);
            }
    }

    this.renderFilm.onmouseout = function(){
        
        if(_parent.mouseoutArr){
            for(var i=0; i<_parent.mouseoutArr.length; i++){
                if(_parent.mouseoutArr[i])
                    _parent.mouseoutArr[i](_parent);
            }
        }
        _SRSetOpacity(this,1);
    }

    this.renderFilm.onclick = function(){

        if(_parent.clickArr)
            for(var i=0; i<_parent.clickArr.length; i++){
                if(_parent.clickArr[i])
                    _parent.clickArr[i](_parent);
            }
    }
 this.renderFilm.setWidth(this.width);
 this.renderFilm.setHeight(this.height);
 this.renderFilm.setPosition(0, 0);

 if(this.caption)
     this.renderFilm.title = this.caption;

 this.renderPayne.appendChild(this.renderFilm);
}
