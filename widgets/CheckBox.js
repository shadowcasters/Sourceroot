
/* 
 * It's a check box, pretty standard stuff. It has a variable isChecked, that's
 * of type boolean.
 *
 * callbacks
 * -------------------
 * onToggle // triggered when the item is either checked or unchecked
 * onCheck
 * onUncheck
 *
 */

CheckBox.prototype = new Label;
CheckBox.prototype.widgetName = "CheckBox";
CheckBox.prototype.constructor = CheckBox;

function CheckBox (text){

    this.icon = new ToggleIcon("checkbox.unchecked","checkbox.checked");

    this.LabelInit(text,this.icon);
    this.icon.renderPayne.style.cursor = "pointer";

    var _parent = this;

    this.icon.renderPayne.onclick = function(){
      _parent.toggle();
    }

}

CheckBox.prototype.setChecked = function(bool){
    this.isChecked = bool;
    this.icon.setActiveState(bool);
}

CheckBox.prototype.toggle = function(){

    if(this.isChecked){
        this.isChecked = false;
        this.icon.setActiveState(false);
        if(this.onUncheck)
            this.onUncheck();
    }else{
        this.isChecked = true;
        this.icon.setActiveState(true);
        if(this.onCheck)
            this.onCheck();
    }


    if(this.onToggle)
         this.onToggle();
}


