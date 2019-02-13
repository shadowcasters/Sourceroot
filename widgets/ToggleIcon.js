
function ToggleIcon(inactiveStateIcon,activeStateIcon, dataMap){
    dataMap = dataMap || _SRIconMaps;
    this.state = "inactive";
    if(typeof inactiveStateIcon == "string"){
        this.offIco = _SRImageMapUtils.getImageMap(inactiveStateIcon, dataMap);
    }else{
        this.offIco = inactiveStateIcon
    }

    if(typeof activeStateIcon == "string"){
        this.onIco = _SRImageMapUtils.getImageMap(activeStateIcon, dataMap);
    }else{
        this.onIco = activeStateIcon;
    }
    this.renderPayne = SRLayout.getDiv(this.offIco[1],this.offIco[2]);
    // IE ... I have no idea why.. this is what finnaly works at 3am..
    this.renderPayne.style.fontSize=0;

    this.icon1 = inactiveStateIcon;
    this.icon2 = activeStateIcon;
    this.setActiveState(false);
}

ToggleIcon.prototype.widgetName = "icon"
ToggleIcon.prototype.setToggleOnHover = function(bool){
   var _parent = this;
   if(bool){
        this.renderPayne.onmouseover = function(){
            _parent.toggle();
        }

        this.renderPayne.onmouseout = function(){
            _parent.toggle();
        }

   }else{
     this.renderPayne.onmouseout = "";
     this.renderPayne.onmouseover = "";
   }
   
   return this;
}

ToggleIcon.prototype.setToggleOnClick = function(bool){
   var _parent = this;
   if(bool){
        this.renderPayne.onclick = function(){
            _parent.toggle();
        }
    
   }else{
     this.renderPayne.onclick = "";
   }
   return this;
}

ToggleIcon.prototype.setToggleOnDoubleClick = function(bool){
   var _parent = this;
   if(bool){
        this.renderPayne.ondblclick = function(){
            _parent.toggle();
        }

   }else{
        this.renderPayne.ondblclick = "";
   }
   return this;
}

/**
 * if you need to set the state of the Icon, as in icon1 or icon2 you can do that here by
 * defining true or false. True for activeStateIcon and false for inactiveStateIcon. 
 */
ToggleIcon.prototype.setActiveState = function(bool){
    if(bool){
         if(this.onActivate)
            this.onActivate();

        this.renderPayne.style.background = _SRImageMapUtils.getBackgroundStyle(this.onIco).style;
        this.activeIcon = this.icon1;
        this.renderPayne.setSize(this.onIco[1],this.onIco[2]);
        this.state = "active";
    }else{
        if(this.onDeactivate)
          this.onDeactivate();

        this.renderPayne.style.background = _SRImageMapUtils.getBackgroundStyle(this.offIco).style;
        this.activeIcon = this.icon2;
        this.renderPayne.setSize(this.offIco[1],this.offIco[2]);
        this.state = "inactive";
    }
}

ToggleIcon.prototype.toggle = function(){
 
if(this.state == "active"){
    this.setActiveState(false);
}else{
    this.setActiveState(true);
}

    if(this.onToggle)
        this.onToggle();

}

ToggleIcon.prototype.setVisible = function(bool){this.renderPayne.setVisible(bool);}
ToggleIcon.prototype.setPosition = function(left, top){this.renderPayne.setPosition(left, top);}
ToggleIcon.prototype.setLeft = function(lValue){this.renderPayne.setLeft(lValue);}
ToggleIcon.prototype.setTop = function(rValue){this.renderPayne.setTop(rValue);}