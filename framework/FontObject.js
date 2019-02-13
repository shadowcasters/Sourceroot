/* 
 * This is a font object.. it has the following properties
 * <br>
 * size: in pixels <br>
 * color: any CSS compliant color code. <br>
 * family: font family.. <br>
 * bold: boolean:true if text is bold <br>
 * italic: boolean:true if text is italic <br>
 * 
 * 
 * 
 */
FontObject.prototype.widgetName = "fontObject";
/**
 * params:
 * themeFont <br>
 * 1. a string representing one of the fonts in the theme.<br>
 * 2. a theme object.
 */
function FontObject(fontObject, boundElement){
		this.loadFont(fontObject, boundElement);
}

FontObject.prototype.loadFont = function(fontObject, boundElement){
	if(fontObject == null)
       fontObject = "primary";
	
	
	if(typeof fontObject == "string")
		this.setSchemaFont(fontObject, boundElement);
	else
		this.loadFontObject(fontObject, boundElement);
}

FontObject.prototype.setSchemaFont = function(schema, elem){	
	var fontObj = theme.fonts[schema]?theme.fonts[schema]:theme.fonts["primary"];
	this.loadFontObject(fontObj, elem);
}

FontObject.prototype.loadFontObject = function(fobj, elem){
	this.family = fobj.family || this.family;
    this.color = fobj.color || this.color;
    this.size = fobj.size || this.size;
    this.bold = fobj.isBold || this.bold;
    this.url = fobj.url;
    this.italic = fobj.isItalic || this.italic;
    this.underline = fobj.isUnderline || this.underline;
    if(elem)
		this.imposeFont(elem);
    else
    	SRLoadFontObj(this,elem);
	
}

FontObject.prototype.setFont = function(fontFamily){
    this.family = fontFamily;
}

FontObject.prototype.setSize = function(pxSize){
    this.size = pxSize;
}

FontObject.prototype.setColor = function(color){
    this.color = color;
}

FontObject.prototype.getStyle = function(){
  var ret = " "+this.family+" "+this.color+" "+this.size+"px";
  return ret;
}

FontObject.prototype.setBold = function(bool){
    this.isBold = bool;
}

FontObject.prototype.setItalic = function(bool){
    this.isItalic = bool;
}

FontObject.prototype.setUnderline = function(bool){
    this.isUnderline = bool;
}

FontObject.prototype.imposeFont = function(elem){
	SRLoadFontObj(this,elem);
}
