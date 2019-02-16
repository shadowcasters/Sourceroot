


function _SRLoadSchema(div, schemaObj){
    if(typeof schemaObj == "string")
        schemaObj = theme.schema[schemaObj]

    if(!schemaObj)
        throw "_SRLoadSchema: Schema "+schemaObj+" is null";
    
    div.style.backgroundColor = schemaObj.base;
    div.style.borderColor = schemaObj.contrast;
    div.style.color = schemaObj.font;
}


var UIThemeLoader = function(parent){
    this.parent = parent;

    this.font = new UIFont(this.parent);

    if(theme[this.parent.widgetName]){
        this.themeObject = theme[this.parent.widgetName];
    }else
        this.themeObject = {};


    // creates preliminary font object
    if(this.themeObject.defaultFont)
        this.fontObject = theme.fonts[this.themeObject.defaultFont];
    else
        this.fontObject = {};

    // set specified font attributes for this theme, if one is defined
   
    if(this.themeObject.font){
       if(typeof this.themeObject.font == "object"){
            for(var fo in this.themeObject.font){
               this.fontObject[fo] = this.themeObject.font[fo];
            }
       }else{
           if(typeof this.themeObject.font == "string"){
                this.fontObject = theme.fonts[this.themeObject.font];
           }
       }

        this.setFont(this.fontObject);
    }

    this.imageSetData = new Array;

    if( _SRImageMapUtils.getImageMap(this.parent.widgetName) && _SRImageMapUtils.getImageMap(this.parent.widgetName).slice)
        this.imageSetData = _SRImageMapUtils.getImageMap(this.parent.widgetName).slice();
    
    if(this.themeObject.imageGroup){
      if(typeof this.themeObject.imageGroup == "string")
           this.addImageGroup(this.themeObject.imageGroup);
      else
       if(this.themeObject.imageGroup.splice)
        for(var i=0; i<this.themeObject.imageGroup.length; i++)
           this.addImageGroup(this.themeObject.imageGroup[i]);

        i=null;
    }
       
        if(this.imageSetData){
            this.mapArray = this.imageSetData;
            if(this.themeObject.defaultImageSet)
                this.setImageSet(this.themeObject.defaultImageSet);
        }

    this.setSchemaTheme(this.themeObject.defaultSchema || "primary");
   
    return this;
}

UIThemeLoader.prototype.addImageGroup = function(OGroup){
 
    if(_SRImageMapUtils.getImageMap(OGroup) == null)
        throw "theme.addImageGroup: requested group ("+OGroup+") is non-existent";

        var grp = _SRImageMapUtils.getImageMap(OGroup);
        for(var i =0; i< grp.length; i++)
            this.imageSetData.push(grp[i]);

}

UIThemeLoader.prototype.getSchemaObj = function(schemaTitle){
    
    if(typeof schemaTitle == "object"){
      return schemaTitle;
    }else{
        if(typeof schemaTitle == "string"){
             if(!theme.schema[schemaTitle])
                throw "UIThemeLoader.getSchemaObj: there is no schema defined with the handle: "+schemaTitle;

             return theme.schema[schemaTitle.toLowerCase()];
        }
    }
    
   throw "Could not locate schema: "+schemaTitle;
}


UIThemeLoader.prototype.setSchemaTheme = function(schemaTitle){

if(typeof schemaTitle == "object" && schemaTitle.alt){
    this.schema = schemaTitle;
    this.schemaTitle = schemaTitle.title;
}else{
    this.schemaTitle = schemaTitle || this.schemaTitle;
    this.schema = this.getSchemaObj(this.schemaTitle);
}

if(this.schema.font){
    this.fontObject.color = this.schema.font;
    this.setFont(this.fontObject);
}

if(this.schema.alt){
    this.altSchema = this.getSchemaObj(this.schema.alt);
}
else
    throw "ThemeLoader.setSchema error: No alt Schema has been defined, every schema object requires an alt:'schema_name' node in it's object"


// reload the imageSet
if(this.imageSetData)
    this.loadImageSet();

 if(this.parent.onSetSchema)
        this.parent.onSetSchema(this.schema);

 this.schema.title = this.schemaTitle;
 this.parent.schema = this.schema;
}


UIThemeLoader.prototype.setFont = function(fontObj){
    this.fontObject = fontObj;
    this.font.loadObject(fontObj);
}

//////////////// IMAGE DATA \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

UIThemeLoader.prototype.setImageSet = function(isOption){
// a little checking can save alot of loops
if(!isOption)
    return null;
else
    if(isOption == this.imageSetOption)
        return null;
    else
        this.imageSetOption = isOption;
        this.loadImageSet();
}

UIThemeLoader.prototype.loadImageSet = function(){
    if(this.imageSetOption)
        this.mapArray = _SRImageMapUtils.getImageMap(this.imageSetOption+"."+this.schemaTitle, this.imageSetData);
    
}

UIThemeLoader.prototype.getImageMap = function(img){
    var imr = _SRImageMapUtils.getImageMap(img,this.mapArray);
    if(!imr) imr = _SRImageMapUtils.getImageMap(img,this.imageSetData);

    if(imr == null)
        throw "Image not found: "+img;

    return imr;
}

UIThemeLoader.prototype.getImageStyle = function(img){
    return _SRImageMapUtils.getBackgroundStyle(this.getImageMap(img)).style;
}

UIThemeLoader.prototype.getImageSetDataMap = function(img){
    return this.imageSetData;
}

UIThemeLoader.prototype.getHorizontalStyle = function(img){
    return _SRImageMapUtils.getBackgroundStyle(this.getImageMap("hTile."+img),"horizontal").style;
}

UIThemeLoader.prototype.getVerticalStyle = function(img){
    return _SRImageMapUtils.getBackgroundStyle(this.getImageMap("vTile."+img),"vertical").style;
}

UIThemeLoader.prototype.getToggleImage = function(inactiveImage, activeImage){
    return new ToggleIcon(inactiveImage, activeImage, this.imageSetData);
}

UIThemeLoader.prototype.getImage = function(img){
    var imr = _SRImageMapUtils.getImage(img,this.mapArray);
    if(imr == null)
      imr =  _SRImageMapUtils.getImage(img,this.imageSetData);

    if(imr == null)
        throw "Image not found: "+img;
    
    return imr;
}

/**
 * returns an object containing two integer values, width and height;
 */
UIThemeLoader.prototype.getImageSize = function(img){
     return {width:this.getImageMap(img)[1],height:this.getImageMap(img)[2]}
}

 

UIThemeLoader.prototype.getTile = function(img, tile){
    if(tile){
        img = (tile=="vertical"?"vTile."+img:"hTile."+img);
        img =  _SRImageMapUtils.getImage(img, this.mapArray, tile);
        img.style.overflow = "hidden";
        return img;
    }else{
        throw "theme.getTile requires a tile direction be passed as the second argument: vertical/horizontal";
    }
}