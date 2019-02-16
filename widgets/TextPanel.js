

TextPanel.prototype = new Panel; //UIWidget;
TextPanel.prototype.widgetName = "textPanel";
TextPanel.prototype.constructor = TextPanel;
TextPanel.prototype.defaultProperties=
    {
     width:200,
     height:300,
     margin:5,
     scrollable:true
    }

function TextPanel(configObject){
    this.initWidget(configObject);
    this.init();
    // in the event that a margin exceeds the panel, we do want the leaway to show the overflow
    this.renderPayne.style.overflow = "visible";
    this.textArray = new Array;
    this.clear();
}

TextPanel.prototype.doWriteHTML = function(text){

    if(this.byteLimit <= this.mainPanel.innerHTML.length){
         this.clear();
    }

     var t = document.createElement("div");
     this.textArray[this.textArray.length] = t;
     t.index = this.textArray.length;
     t.innerHTML = (text);
     t.style.marginLeft = this.margin+"px";
     this.addChild(t);
}

TextPanel.prototype.doWriteln = function(text){
     if(this.autoClear && this.byteLimit >= this.mainPanel.innerHTML.length)
         this.clear();

     var t = SRLayout.getTextDiv(text);
     this.textArray[this.textArray.length] = t;
     t.index = this.textArray.length;
     t.setText(text);
     t.style.marginLeft = this.margin+"px";
     this.addChild(t);
}

TextPanel.prototype.getLine = function(index){
    return this.textArray[index];
}

TextPanel.prototype.clear = function(){
    this.mainPanel.innerHTML = "<div width:100%; height:"+this.margin+"px;'></div>";
    this.textArray = new Array;
}

TextPanel.prototype.setAutoClear = function(bool, byteLimit){
    this.autoClear = bool;
    this.byteLimit = byteLimit;
}

TextPanel.prototype.setMargin = function(val){
    this.margin = val;
}

TextPanel.prototype.onInsert = function(){
    this.doRender();
}