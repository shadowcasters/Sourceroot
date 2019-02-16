

/* 
 * This is a font object.. it has the following properties
 * <br>
 * size: in pixels <br>
 * color: any CSS compliant color code. <br>
 * family: font family.. <br>
 * bold: boolean:true if text is bold <br>
 * italic: boolean:true if text is italic <br>
 */

FontObject.prototype.widgetName = "fontObject";

/**
 * params:
 * themeFont <br>
 * 1. a string representing one of the fonts in the theme.<br>
 * 2. a theme object.
 */
function FontObject(fontObject){
    if(fontObject == null)
       fontObject = "primary";

    var fontObj = (typeof fontObject == "string")?theme.fonts[fontObject]:fontObject;

    this.family = fontObj.family;
    this.color = fontObj.color;
    this.size = fontObj.size;
    this.bold = fontObj.isBold;
    this.italic = fontObj.isItalic;
    this.underline = fontObj.isUnderline;
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
     _SRLoadFontObj(elem, this);
}