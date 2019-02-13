

TextPanel.prototype = new Panel; //UIWidget;
TextPanel.prototype.widgetName = "textPanel";
TextPanel.prototype.constructor = TextPanel;
TextPanel.prototype.defaultProperties=
    {
     width:200,
     height:300,
     margin:5,
    }

function TextPanel(configObject){
    this.initWidget(configObject);
    this.init();
    
    this.textArray = new Array;
    
}

TextPanel.prototype.setScrollable = function(){
	this.mainPanel.style.overflow = "auto";
}

TextPanel.prototype.setWordWrap = function(bool){
 if(bool){
		SRLayout.enableWordWrap(this.mainPanel);
	}else{
		SRLayout.disableWordWrap(this.mainPanel);
	}
}

TextPanel.prototype.doWriteHTML = function(text){

    if(this.byteLimit <= this.mainPanel.innerHTML.length){
         this.clear();
    }

     var t = document.createElement("div");
     this.textArray[this.textArray.length] = t;
     t.index = this.textArray.length;
     t.innerHTML = (text);
    
     this.addChild(t);
}

TextPanel.prototype.doWriteln = function(text){
     if(this.autoClear && this.byteLimit >= this.mainPanel.innerHTML.length)
         this.clear();

     var t = SRLayout.getPreText(text,true);
     this.textArray[this.textArray.length] = t;
     t.index = this.textArray.length;
     t.setText(text);
     t.setWidth("100%");
     this.addChild(t);
}

TextPanel.prototype.getLine = function(index){
    return this.textArray[index];
}

TextPanel.prototype.clear = function(){
    this.mainPanel.innerHTML = "";
    this.textArray = new Array;
}

TextPanel.prototype.setAutoClear = function(bool, byteLimit){
    this.autoClear = bool;
    this.byteLimit = byteLimit;
}

TextPanel.prototype.setMargin = function(val){
    this.margin = val;
    this.mainLayout.setColumnWidth(1,val);
	this.mainLayout.setColumnWidth(3,val);
	this.mainLayout.setRowHeight(1,val);
	this.mainLayout.setRowHeight(3,val);
	
}

TextPanel.prototype.onInsert = function(){
    this.doRender();
}
