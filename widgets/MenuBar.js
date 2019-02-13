



/**
 *  menuBar is a toolbar dirivitive. This is the standard  [ File Edit Help ] menu at the top of a window payne
 */

var MenuBar = function(PropertiesObject){
    this.initWidget(PropertiesObject);
    this.init();
    
}

MenuBar.prototype = new ToolBar;
MenuBar.prototype.widgetName = "menuBar";
MenuBar.prototype.constructor = MenuBar;
MenuBar.prototype.defaultProperties = {
    height:20,
    margin:5,
    spacing:12
}

MenuBar.prototype.collapseAll = function(){
   for(var i=0; i< this.menuItems.length; i++){
      this.menuItems[i].menuPanel.contract();
   }
}

/**
 * This is not that important...
 * Next
 */
MenuBar.prototype.addMenuArray = function(menuArray){
    if(menuArray != null){
       if(!menuArray.splice){
         throw "unable to add menu array items to Menu panel";
       }else{
         var menu = menuArray[0];
         for(var i=0; i<menuArray.length; i++){
            // Ok then... We'll get back to this..
            // TODO: implement this import function.. 
         }
       }
    }
}

MenuBar.prototype.addMenu = function(_text , _icon){
        var heit = this.height;
        var menuItem = new MenuItem({text:_text, icon:_icon, height:heit});
        
        this.addMenuItem(menuItem);
        menuItem.setMenuPanel(new MenuPanel());

        menuItem.menuPanel.onAction = function(){
            menuItem.menuPanel.contract(true);
        }

        var _parent = this;
        menuItem.menuPanel.onMenuExpand=function(){
            _parent.inUse = true;
        }
        
        menuItem.menuPanel.onMenuContract=function(){
            _parent.inUse = false;
        }

        menuItem.addOnClickAction(function(){
            menuItem.menuPanel.setVisible(true);
            menuItem.menuPanel.expand();
        });

        menuItem.addMouseOverAction(function(){
        // contracts all other expanded menus and expands this one.
            if(_parent.inUse){
                for(var i=0; i< _parent.menuItems.length; i++){
                     if(_parent.menuItems[i] && _parent.menuItems[i] !== menuItem)
                        _parent.menuItems[i].menuPanel.contract(true);
                }
             ////////////// do I need this?? //////////////
                menuItem.menuPanel.expand(true);
            }
        });
       
       return menuItem.menuPanel;
}

MenuBar.prototype.onInsert = function(){
   this.doRender();
}


MenuBar.prototype.doRender = function(){
    this.renderPayne.style.backgroundColor = this.theme.schema.contrast;
    this.layout.setHorizontalAlignment("left");
}
