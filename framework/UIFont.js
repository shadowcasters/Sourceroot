

function _SRLoadFontObj(elem,obj){
    if(obj.fontFamily)
        elem.style.fontFamily = (obj.fontFamily);
    if(obj.bold)
        elem.style.fontWeight = "bold";
    if(obj.italic)
        elem.style.fontStyle = "italic";
    if(obj.size)
        elem.style.fontSize = obj.size+"px";
    if(obj.color)
        elem.style.color = obj.color;
    if(obj.underline)
         elem.style.textDecoration = "underline";
}


var UIFont = function(parent){
    if(!parent.renderPayne){
        throw "Atempt to invoke UIFont by a component without a valid renderPayne or specify an alternate DIV in the second argument of this method";
    }

    this.parent = parent;
    this.renderPayne = this.parent.mainPanel || this.parent.renderPayne;
    this.setFont(theme.fonts.primary.family);
    this.setSize(theme.fonts.primary.size);
    
    return this;
}
UIFont.prototype.refresh = function(){
    this.renderPayne = this.parent.mainPanel || this.parent.renderPayne;
    this.loadObject(this.fontObj);
}

UIFont.prototype.loadObject = function(obj){
    
    if(!obj)
        throw "UIFont.loadObject: object parameter is null";

    this.fontObj = obj;

    if(obj.fontFamily)
        this.setFont(obj.fontFamily);
    if(obj.bold)
        this.setBold(true);
    if(obj.italic)
        this.setItalic(true);
    if(obj.size)
        this.setSize(obj.size);
    if(obj.color)
        this.setColor(obj.color);
    
}


UIFont.prototype.exportObject = function(){
    var _parent = this;
    var eo = {
        family: _parent.family,
        color:_parent.color,
        size:_parent.size,
        bold:_parent.isBold,
        italic:_parent.isItalic,
        underline: _parent.isUnderline
    }
    return eo;
}

UIFont.prototype.setFont = function(fontFamily){
    this.family = fontFamily;
    this.renderPayne.style.fontFamily = fontFamily;
 
}

UIFont.prototype.setSize = function(pxSize){
    this.size = pxSize;
    this.renderPayne.style.fontSize = pxSize+"px";
}

UIFont.prototype.setColor = function(color){
    this.color = color;
    this.renderPayne.style.color = color;
}

UIFont.prototype.getStyle = function(){
  var ret = " "+this.family+" "+this.color+" "+this.size+"px";
  return ret;
}

UIFont.prototype.setBold = function(bool){
    this.isBold = bool;
    this.renderPayne.style.fontWeight = bool?"bold":"normal";
}

UIFont.prototype.setItalic = function(bool){
    this.isItalic = bool;
    this.renderPayne.style.fontStyle = bool?"italic":"normal";
}

UIFont.prototype.setUnderline = function(bool){
    this.isUnderline = bool;
    this.renderPayne.style.textDecoration = bool?"underline":"none";
}
