
TextLabel.prototype = new UIWidget;
TextLabel.prototype.widgetName = "label";
TextLabel.prototype.constructor = TextLabel;
function TextLabel(text, fontObj){
    this.initWidget({renderPayne:SRLayout.getTextDiv(text,fontObj)});
}
TextLabel.prototype.setText = function(text){
    this.renderPayne.setText(text);
}
TextLabel.prototype.setFont = function(fontObj){
    this.renderPayne.setFont(fontObj);
}


Label.prototype = new UIWidget;
Label.prototype.widgetName = "label";
Label.prototype.constructor = Label;
function Label(text, icon, fontObject, iconSpace){
    
    if(text == null)
        text = "undefined label";
    
        this.LabelInit(text, icon, fontObject, iconSpace);
}

Label.prototype.LabelInit = function(text, icon, fontObject, iconSpace){
 if(!text.match && typeof text == "object")
    this.initWidget(text);
 else
     this.initWidget({});
 
 this.renderPayne.setDynamic();


 if(iconSpace == null || !isNumeric(iconSpace))
    iconSpace=5;


 this.iconSpacing = iconSpace;

 this.text = text;
 if(fontObject != null){
    fontObject = (typeof fontObject == "string")?theme.fonts[fontObject]:fontObject;
 }else
    fontObject = theme.fonts.primary;

 this.fontObject = fontObject;

if(icon){
     if(typeof icon == "string")
        this.icon = new Icon(icon);
     else
        this.icon = icon;
}else{
    this.icon = new Icon("blank");
}

this.textDiv = SRLayout.getTextDiv(this.text,this.fontObject);
this.layout = SRLayout.getHorizontalLayout(3);  

 this.layout.table.tBody.vAlign = "middle";
 this.layout.table.tBody.Align = "left";

 this.iconColumn = this.layout.staticCell1;

 this.spaceColumn = this.layout.staticCell2;
 this.textColumn = this.layout.mainPanel;

  if(IE){
    this.icon.renderPayne.style.position =  "fixed";
  }
  this.layout.addChild(1,this.icon);
  this.layout.addChild(2,SRLayout.getDiv(this.iconSpacing,"100%"));
  this.layout.addChild(3,this.textDiv);

  this.layout.setAutoSize(true);
  this.addChild(this.layout);
  
}

Label.prototype.setText = function(text){
    this.text = text;
    this.textDiv.setText(text);
}

Label.prototype.getText = function(){
    return this.text;
}

Label.prototype.setIconSpacing = function(numPix){
 this.iconSpacing = numPix;
 this.spaceColumn.style.width = this.iconSpacing+"px";
}

Label.prototype.setIcon = function(iconHandle){
      this.icon.setIcon(iconHandle);
      if(this.icon != null && this.iconSpacing == null)
        this.setIconSpacing(numPix)
}

Label.prototype.setFont = function(fontObj){
    this.fontObject = fontObj;
    this.textDiv.setFont(fontObj);
}

Label.prototype.setLabel = function(text,icon){
    if(text) this.setText(text);
    if(icon) this.setIcon(icon);
}

Label.prototype.getWidth = function(){
    var tFontSize =  this.fontObject.size || 12;
    var rWidth = getTextDimentions(this.text || "undefined", tFontSize);
    if(this.icon)
        rWidth += this.icon.width;
    if(this.iconSpacing)
        rWidth += this.iconSpacing;
    return Math.round(rWidth);

}

Label.prototype.setAutoHint = function(bool, optionalText){
  this.autoHint = bool;
  if(bool)
    this.renderPayne.title = optionalText || this.hintText || this.text;
  else
    this.renderPayne.title = null;
}

//// override setWidth
Label.prototype.truncateWidth = function(width){
    this.staticWidth = width;
    this.truncate = true;
    this.setText();
}

Label.prototype.setSchema = function(schemaHandle){

    this.theme.setSchemaTheme(schemaHandle);
    this.textDiv.setFont(this.theme.font);
    


}