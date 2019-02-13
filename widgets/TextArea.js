/* 
 * 
textarea#styled {
        width: 600px;
        height: 120px;
        border: 3px solid #cccccc;
        padding: 5px;
        font-family: Tahoma, sans-serif;
        background-image: url(bg.gif);
        background-position: bottom right;
        background-repeat: no-repeat;
}
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

TextAreaInput.prototype = new Panel;
TextAreaInput.prototype.widgetName = "textAreaInput";
TextAreaInput.prototype.constructor = TextAreaInput;
TextAreaInput.prototype.defaultProperties=
    {
     width:400,
     height:300
    }
function TextAreaInput(configObject){
    this.initWidget(configObject);
    this.init();
    
    var mp = document.createElement("textarea");
    this.mainPanel.addChild(mp);
    this.mainPanel = mp;
    this.mainPanel.style.width = "100%";
    this.mainPanel.style.height = "100%";
    this.setSelectable(true);
    this.renderPayne.setAbsolute();
    
   
}

TextAreaInput.prototype.write = function(txt){
   this.mainPanel.appendChild(document.createTextNode(txt));
}

TextAreaInput.prototype.writeln = function(txt){
    this.write(txt+"\n");
}

TextAreaInput.prototype.setSelectable = function(bool){
    if(bool)
        _SRSetDragable(this.mainPanel);
    else
       _SRSetUndragable(this.mainPanel); 
}

/**
 * Returns the text in this box and if the parameter is true or not null, the
 * text in the box is deleted.
 */
TextAreaInput.prototype.getText = function(dump){
    var t = this.mainPanel.value;
    if(dump)
        this.clear();
    return t;
}

TextAreaInput.prototype.setText = function(text){

    this.mainPanel.value =  text;

     return this;
}

TextAreaInput.prototype.clear = function(){
    this.mainPanel.value = "";
    this.mainPanel.select();
    this.mainPanel.focus();
    this.mainPanel.innerHTML = "";
   
}

TextAreaInput.prototype.onInsert = function(){
	this.doRender();
    var _parent = this;
    if(this.onEnter)
        this.mainPanel.onkeyup = function(e){
            var KeyID = (window.event) ? event.keyCode : e.keyCode;
            if(e.keyCode == 13 &&  _parent.onEnter) _parent.onEnter();}
}

