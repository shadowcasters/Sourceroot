

var AppImage = function(imgStr){
    if(imgStr == null)
        throw "Null passed to AppImage";

    if(typeof imgStr == Object && imgStr.widgetName && (imgStr.widgetName == "icon" || imgStr.widgetName == "appImage") )
        return imgStr;

    this.renderPayne = SRLayout.getDiv();
    this.renderPayne.style.position = "relative";
    this.renderPayne.style.overflow = "hidden";
    this.setDataMap(_SRAppImageMaps);
    
    var _parent = this;
    this.setImage = function(imgStr){_parent(imgStr);}
    this.setImage(imgStr);
    return this;
}
AppImage.prototype = Icon;
AppImage.prototype.constructor = AppImage;
