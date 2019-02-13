

/* 
 * The autohint widget is not actually a widget, it dosnt need the bloat of a full on widget.
 * text: (Manditory) the text that appears in the hint
 * schema:(default=primary) a valid schema handle or object.
 */

var AutoHint = function(text, delay, duration, schema){
    this.border = "dashed";
    this.offset = 5;

    if(!schema)
        if(WidgetSettings.autoHint && WidgetSettings.autoHint.schema){
            schema = WidgetSettings.autoHint.schema;
        }else{
            schema = theme.schema.primary;
        }
    
    this.renderPayne = SRLayout.getDiv();
    this.renderPayne.style.width = "";
    this.renderPayne.style.height = "";
    this.setSchema(schema);
    this.setText(text);
    this.block = 1;
    this.delay = delay || 1000;
    this.duration = duration || 3000;

}
AutoHint.prototype.setSchema = function(schema){
    this.schema = typeof schema=="string"?theme.schema[schema]:typeof schema=="object"?schema:theme.schema.primary;
    this.font = this.schema.font;
    this.renderPayne.style.backgroundColor = this.schema.base;
    this.renderPayne.style.position = "absolute";
    this.renderPayne.style.padding = "3px";
    this.renderPayne.style.textAlign = "center";
    this.renderPayne.style.border = "solid 1px #"+this.schema.contrast;
    this.renderPayne.style.fontFamily = this.font.family;
    this.renderPayne.style.color = this.font.color;
    this.renderPayne.style.fontSize = this.font.size;
}
AutoHint.prototype.setCursorOffset = function(value){
    this.offset = value;
}

AutoHint.prototype.setText = function(text){
    this.text = text||"undefined text";
    this.renderPayne.setChildren(document.createTextNode(this.text));
}

AutoHint.prototype.show = function(position, delay, duration){
    this.delay=delay||this.delay;
    this.duration= duration ||this.duration;

    var pos = position || this.position;
    this.block = 0;
    var _parent = this;

   
    if(pos)
    this.timerThread = setTimeout(
        function(){

        if(_parent.block == 0){

            _parent.renderPayne.setPosition(pos.x+_parent.offset,pos.y+_parent.offset);
            rootPayne.addChild(_parent.renderPayne);
           _parent.block = 1;
           _parent.delay += _parent.delay/2;
           if(_parent.duration)
            setTimeout(function(){
                _parent.cancel();
            },_parent.duration);
              
        }

        },this.delay);
    
}

AutoHint.prototype.cancel = function(){
this.block = 1;
    if(this.timerThread)
        clearTimeout(this.timerThread);

this.timerThread = null;

rootPayne.removeComponent(this.renderPayne);
}

AutoHint.prototype.setAutoHint = function(bool){
    var _parent = this;
    // switch ///
    if(bool == true){
     var tick = function(cursorPos){
           _parent.show(cursorPos);
        }
         
        _SRGetCursorPosition(tick);
     
    }else{
        this.cancel();
    }

}

