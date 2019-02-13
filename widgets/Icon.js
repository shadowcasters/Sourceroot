
var Icon = function(iconStr){

    if(!iconStr)
        return null;

    if(typeof iconStr == Object && iconStr.widgetName && iconStr.widgetName == "icon")
        return iconStr;

    this.renderPayne = SRLayout.getDiv().setRelative();
    this.renderPayne.style.overflow = "hidden";
    this.setIcon(iconStr);
    return this;
}
Icon.prototype.widgetName = "icon";
Icon.prototype.setIcon=function(iconStr){
  if(iconStr == null) return null;

  if(typeof iconStr == "object" && iconStr.widgetName == this.widgetName){
     this.icon = iconStr;
     return iconStr;
  }

  if(!this.dataMap)
    this.icon = _SRImageMapUtils.getIconMap(iconStr);
  else
    this.icon = _SRImageMapUtils.getImageMap(iconStr, this.dataMap);

  if(this.icon == null) throw "Unable to get Icon: "+iconStr;

  this.handle = iconStr;
  this.width = this.icon[1];
  this.height = this.icon[2];

  this.renderPayne.setSize(this.width,this.height);

  var bgStyle = _SRImageMapUtils.getBackgroundStyle(this.icon[0]);
  this.renderPayne.style.background = bgStyle.style;
  this.renderPayne.style.zIndex = 1;

  return this;
}
Icon.prototype.setDataMap = function(dataMap){this.dataMap = dataMap;}
Icon.prototype.setVisible = function(bool){this.renderPayne.setVisible(bool);}
Icon.prototype.setPosition = function(left,top){this.renderPayne.setPosition(left,top);}
Icon.prototype.setLeft = function(value){this.renderPayne.setLeft(value);}
Icon.prototype.setTop = function(value){this.renderPayne.setTop(value);}
