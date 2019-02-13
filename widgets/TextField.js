/* 
 *Theme tiles should be maped automaticly by default. The definition should be
 *binding an element to a theme imageMap.
 */

TextField.prototype = new FoundationWidget;
TextField.prototype.widgetName = "textField";
TextField.prototype.constructor = TextField;
TextField.prototype.defaultProperties={
   font:"primary"
}

function TextField(configObject){
    this.initWidget(configObject);
    this.initTextField();
}

TextField.prototype.initTextField = function(){
    this.textField = document.createElement('INPUT');
    this.textField.style.position = "static";
    this.textField.style.width = "100%";
    this.textField.style.border = "none";
    this.textField.style.outline="none";
    
    this.setFont("primary");
    
    
    this.textField.type = 'text';
    var lidem = this.theme.getImageSize("left");
    var ridem = this.theme.getImageSize("right");
    this.layout = SRLayout.getHorizontalLayout(2,lidem.width,ridem.width);
    this.layout.setAutoSize(true);
    this.layout.setHeight(24);
    this.layout.style.width="100%";
   

    
    this.layout.cell1.style.background = this.theme.getImageStyle("left");
   // this.textField.style.color="ffffff";
    this.layout.cell3.style.background = this.theme.getImageStyle("right");
    this.textField.style.background = this.theme.getHorizontalStyle("background");
    this.textField.style.height = (lidem.height)+"px";
    this.layout.setHeight(lidem.height);
    this.layout.addChild(this.textField);
    this.text = "";
    this.addChild(this.layout);
    this.renderPayne.style.height = "";
    this.setAutoSize(true);
    this.renderPayne.style.width="100%";
    
    
}

TextField.prototype.getText = function(){
    return this.textField.value;
}

TextField.prototype.isSelectable = function(bool){
    if(bool)
        _SRSetDragable(this.textFiled);
    else
        _SRSetUndragable(this.textField);
}
//
///**
// * Fires The function that you pass as the only parameter when the enter key is pressed.
// */
TextField.prototype.setOnEnterAction = function(func){

this.setKeyboardHook();
// enter key action
this.key_13 = func;
}

TextField.prototype.setText = function(text){
    this.text = text;
    this.textField.value =  this.text;

     return this;
}

TextField.prototype.appendText = function(text){
    this.text += text;
    this.setText(this.text);

    return this;
}

