

function getAppImage(handle){
  return  _SRImageMapUtils.getImage(handle, _SRAppImageMaps);
}

var _SRImageMapUtils = {
    getIconMap:function(handle){
        var map = this.getImageMap(handle, _SRIconMaps);
        return map;
    },
    getImageMap: function(str, mapArray){
    if(!str.split) return null;
    var map = str.split("\.");
    var d = mapArray || _SRImageMapArray;
    // look for a top level match
    for(var i=0; i<map.length; i++)
        for(var ii=0; ii<d.length; ii++)
            if(!d[ii]) return null;
            else
            if(d[ii][1] && d[ii][1].splice){
                if(d[ii][0] == map[i]){
                    d=d[ii][1];
                    break;
                }else if(ii == d.length-1)
                        return null;
            }else{
                if(d[0] == map[i]){
                    d=d[1];
                    break;
                }else if(ii == d.length-1)
                        return null;
            }
 
    return d;
    },
    getImage: function (ImageStr, ImgMap, tile){
        var imgData = null;

        if(typeof ImageStr == "string")
            imgData = this.getImageMap(ImageStr,ImgMap);
        else
            imgData = ImageStr;

        if(imgData == null)
            throw "ImageMapUtils.getImage: could not load requested Image: "+ImageStr;
        
        var img = SRLayout.getDiv(imgData[1], imgData[2]);
        if(!tile){
            img.style.position ="absolute";
            if(imgData[0])
                img.style.background = this.getBackgroundStyle(imgData[0]).style;
            else
                throw "ImageMapUtils.getImage: image map is incomplete for request "+ImageStr;
        }else{
            img.style.background = this.getBackgroundStyle(imgData[0], tile).style;
           
                if(tile == "vertical"){
                    img.setHeight("100%");
                    img.setWidth(imgData[1]);
                }
                if(tile == "horizontal"){
                    img.setWidth("100%");
                    img.setHeight(imgData[2]);
                }
             
        }
        img.style.overflow = "hidden";
        return img;

    },
    getBackgroundStyle:function (bgPos, tile){
     var ret = {};
     if(bgPos){
        var imgUrl =  tofui.imageDir+(tile?tile=="vertical"?"htile":"vtile":"images");
        var ext = IE?(IEVersion<7?"gif":"png"):"png";
        ret.backgroundPosition = bgPos.splice?bgPos[0]:bgPos;

        ret.backgroundImage = imgUrl+"."+ext
        ret.style = "url('"+ret.backgroundImage+"') "+ret.backgroundPosition+" no-repeat";
            if(tile){
                if(tile == "vertical")
                   ret.style =  "url('"+ret.backgroundImage+"') "+ret.backgroundPosition+" repeat-y";

                if(tile == "horizontal")
                   ret.style =  "url('"+ret.backgroundImage+"') "+ret.backgroundPosition+" repeat-x";
            }
       
            return ret;
     }else{
            return null;
          }
    }

}




