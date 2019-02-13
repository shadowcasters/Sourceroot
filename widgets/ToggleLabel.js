
/* 
 *a simple label wraper that loads an alternate icon and issues a callback to
 *a specified function
 */
ToggleLabel.prototype = new Label;
ToggleLabel.prototype.widgetName = "toggleLabel";
ToggleLabel.prototype.constructor = ToggleLabel;

function ToggleLabel (text,icon,altIcon){
    if(text)
       this.ToggleLabelInit(text,icon,altIcon);
}

ToggleLabel.prototype.ToggleLabelInit = function(text,icon,altIcon){
    if(!icon || !altIcon)
        throw "ToggleLabel requires either a toggle Icon be passed as the second parameter or two strings each the handle of an icon:\n\
        text, active_state_icon:"+icon+"  inactive_state_icon:"+altIcon;
    

    this.icon = new ToggleIcon(icon,altIcon);

    this.LabelInit(text,this.icon);
    this.icon.renderPayne.style.cursor = "pointer";

    var _parent = this;

    this.icon.renderPayne.onclick = function(){
      _parent.toggle();
    }
   
}

ToggleLabel.prototype.setActiveState = function(bool){
    this.isActive = bool;
    this.icon.setActiveState(bool);
}

ToggleLabel.prototype.toggle = function(){

    if(this.isActive){
        this.isActive = false;
        this.icon.setActiveState(false);
        if(this.onDeactivate)
            this.onDeactivate();
    }else{
        this.isActive = true;
        this.icon.setActiveState(true);
        if(this.onActivate)
            this.onActivate();
    }


    if(this.onToggle)
         this.onToggle();
}
