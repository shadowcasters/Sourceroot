//
/* 
 *Global variables
 */

var IE = document.all?true:false;
var _SRWindowBoundry;
var _inherit = "100%";

if(IE){
   var IEVersion = navigator.userAgent.split(";")[1].split(" ")[2];
}

// add the components for VML

var _SRSetOpacity = function(e,o){
    if(IE){
         e.style.filter ="-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity="+o+")\"; filter: alpha(opacity="+o+");";
//          e.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity="+o+")";
//          e.style["-ms-filter"] = "progid:DXImageTransform.Microsoft.Alpha(opacity="+o+")";
          return e;
    }else{
        e.style.opacity = o/100;
    }
}

/**
 *Detecting wheter an object is an array or not without all the crazyness 
 */
function _SRIsArray(testObject){
  // the easy same context test, works in most instances (pun)
  if(obj)
    return testObject && !(testObject.propertyIsEnumerable('length')) && typeof testObject === 'object' && typeof testObject.length === 'number';
  else
    return false;
}
/**
 * Returns the array index (zero based) of the data specified in key.
 * 
 */
function _SRArrayIndexOf(key,array){
    var ret = null;
    if(_SRIsArray(array))
    for(var i=0; i<array.length; i++)
        if(array[i] === key)
            ret = i;

    return ret;
}

function _SRArrayRemoveElement(key_or_index,array){
    if(array == null) throw("RemoveElement Error: Array is null");
    if(key_or_index == null)
        return null;

    var idx = key_or_index;
    if(typeof key_or_index !== "number")
        idx = _SRArrayIndexOf(key_or_index,array);

    if(idx != null){
        return array.splice(idx-1,1);
    }
        return null;
}

/**
 *Detecting wheter an object is an array or not without all the crazyness
 */
function _SRIsHTMLElelment(obj){

  if(!obj) return false;

  if(obj.cloneNode && obj.innerHTML)
        return true;
  else
        return false;

}

/**
 *Detecting wheter an object is a data or method Object and not an HTML or Array without all the crazyness
 */
function _SRIsNativeObject(obj){

  if(_SRIsArray(obj))
        return false;
  if(_SRIsHTMLElelment(obj))
        return false;

  if(typeof obj == "object")
     return true;


    return null;
}

function _SRCloneObject(obj, deepProbe) {
var ret = function(w){
           for(var m in w){
               if(_SRIsArray(w[m]))
                   this[m] = w[m].split();
               else // HTML Element objects
                   if(_SRIsHTMLElelment(w[m]))
                       this[m]=w.cloneNode(true);
                   else // if it's still an object we peal back anothter layer and hope for no cross refrence. 
                       if(typeof w[m] == "object" && deepProbe)
                            this[m] = _SRCloneObject(w[m]);
                       else
                            this[m] = w[m];
              }
           }
if(obj)
    return new ret(obj);
else
    return null;
}

function _SREstimateTextWidth(text,fontSize){
    return Math.round(text.length * (fontSize/1.50) )
}

// expensive
function getTextDimentions(text,fontSize){
   
   var width=0;
   var c1 = "1iItlf!.,|\"[]{}'()";
   var c2 = "QWERTYUOPASDFGHJKLZXCVBNM<>wvx";

   for(var i=0; i<text.length; i++){
       if(c1.indexOf(text.charAt(i), 0) >= 0){
            width += fontSize / 3;
        }else{
            if(c2.indexOf(text.charAt(i), 0)>= 0)
                width += fontSize / 1.5;
            else
                if(text.charAt(i) == " ")
                    width += fontSize / 1.5;
                else
                    width += fontSize / 1.75;
        }
   }
   return  Math.round(width); //Math.round(text.length * (fontSize / 1.7));
}



function getCenterPosition(containerDim, componentDim){
   return  Math.round(((containerDim / 2) - (componentDim / 2)));
}

function _SRSetCSSFloat(element, direction){
    setCSSFloat(element, direction);
}
function setCSSFloat(element, direction){
  if(element.renderPayne) element = element.renderPayne;
  
  if(IE)
    element.style.styleFloat = direction;
  else
    element.style.cssFloat = direction;
}



var _SRFontUtils = {
   setFontObject: function(elem,obj){
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
}

}

var _SRSpriteUtils = new Object({
   
   getImage: function (ImageObject){
    if(!ImageObject){throw "call to getThemeImage(object) failed, parameter was null";}
    var img = SRLayout.getDiv(ImageObject.size.width, ImageObject.size.height);
    
    img.style.position ="absolute";
    img.style.left = "0px";
    img.style.top = "0px";
    img.style.background = _SRImageUtils.getImageBackgroundStyle(ImageObject).style;
   
    
    return img;
    },

  getBackgroundStyle: function (ImageObject, tile, spriteMapUrl){
      var ret = {};
        if(ImageObject.cssPosition){
            var imgUrl =  document.URL+spriteMapUrl;
            var ext = IE?(IEVersion<7?"gif":"png"):"png";
            ret.backgroundImage = imgUrl+"."+ext;
            ret.backgroundPosition = ImageObject.cssPosition;

            if(!tile){
               imgUrl += "images";
               ret.style = "url('"+ret.backgroundImage+"') "+ret.backgroundPosition+" no-repeat";
            }else if(tile == "vertical"){
               imgUrl += "htile";
               ret.style =  "url('"+ret.backgroundImage+"') "+ret.backgroundPosition+" repeat-y";
            }else if(tile == "horizontal"){
               imgUrl += "vtile";
               ret.style =  "url('"+ret.backgroundImage+"') "+ret.backgroundPosition+" repeat-x";
            }

            return ret;
        }else{
            return null;
        }
    }
})

window.onresize = function(e){
    _SRWindowBoundry = _SRGetWindowBoundry();
  //  evtRegistry.notify("window.onresize");
}

function _SRInsertElementAtCursor(elem,offset){
    offset = offset || 0;
    var gPos = function(cursorPos){
    
    var e = elem;
           if(elem.renderPayne){
              e=elem.renderPayne; 
           }
            e.style.position = "absolute";
            e.style.left = [cursorPos.x+offset,"px"].join("");
            e.style.top = [cursorPos.y+offset,"px"].join("");
            rootPayne.addChild(elem);
        }
        _SRGetCursorPosition(gPos);
}

function _SRGetCursorPosition(callback){
    //var callback = callbackObject;
 //       if(IE)
 //       document.captureEvents(Event.MOUSEMOVE);

    var _X = 0;
    var _Y = 0;
    var cleanup = function(){
        document.onmousemove = null;
        _X=null;
        _Y=null;
    }

    document.onmousemove = function(e){
   
        if (IE) { // grab the x-y pos.s if browser is IE
            _X = event.clientX + document.body.scrollLeft;
            _Y = event.clientY + document.body.scrollTop;
        }
        else {  // grab the x-y pos.s if browser is other
            _X = e.pageX;
            _Y = e.pageY;
        }

     callback({x:_X,y:_Y});
     cleanup();
    }

    
}

var CSSUtils={
    addCSSClass:function(title){
        var cssNode = document.createElement('style');
        cssNode.type = 'text/css';
        cssNode.rel = 'stylesheet';
        cssNode.media = 'screen';
        cssNode.title = 'dynamicSheet';
        document.getElementsByTagName("head")[0].appendChild(cssNode);
        return cssNode;
    }
}

function _SRAddStyleSheet(url,id){
    if(!document.getElementById(id)){
        var ss = document.createElement("link");
        ss.setAttribute("type", "text/css");
        ss.setAttribute("rel", "stylesheet");
        ss.setAttribute("id", id);
        ss.setAttribute("href",url);
        document.body.appendChild(ss);
    }
}


_SRObjectText = function(obj){
    if(_SRGetUserAgent() == "FIREFOX")
        return obj.toSource();

    var str = ["{"];
    for(var i in obj){
        str.push([i,":",obj[i],","].join(""));
    }
    str.push("SRTimeStamp:"+getTime()+"}");
    str.join("");
return str;
}

////// Debug out
var _SRDebug = new Object({
    width:800,
    height:500,
    enabled:false,
    bugOut: document.createElement("div"),
    init: function(){
       
        document.body.appendChild(this.bugOut);
        this.bugOut.style.width = this.width+"px";
        this.bugOut.style.height = this.height+"px";
        this.bugOut.style.overflow = "auto";
        this.bugOut.style.fontSize = "small";
        this.bugOut.style.border = "solid";
        this.bugOut.style.position = "absolute";
        this.bugOut.className = "test";
        this.bugOut.style.top = "100%";

        var panel = this.bugOut;
        this.bugOut.ondblclick = function(){panel.innerHTML = "";}
        this.bugOut.onclick = function(){
           panel.zIndex = _SRGetTopIndex(document.body);
        }
        this.enabled = true;
    },
    out:function(msg, decode){
        if(typeof msg == "object" && decode)
            msg = _SRObjectText(msg);
        this.bugOut.innerHTML += "<br>";
        msg += "\n";
        this.bugOut.appendChild(document.createTextNode(msg));
    },
    write: function(msg){
        this.bugOut.innerHTML = "-> "+msg;
    },
    seg: function(msg, title){
        _SRDebug.out("<br> <b><i>"+(title?title:"segment")+":</i></b> <br>================================<BR>"+msg+"<br>================================<BR>");
    },
    addElement: function(elem){
        if(elem.renderPayne)
            this.bugOut.appendChild(elem.renderPayne);
        else
            this.bugOut.appendChild(elem);
    }

});
//_SRDebug.init();
//_SRDebug.out("Debugger");
///////////////////////////////


function _SRGetTransport() {
    try{return new XMLHttpRequest();}
    catch(e){
        return new ActiveXObject('Microsoft.XMLHTTP');
    }
}

var _SRFetch = function(Url, callback){
    try{
        var http = _SRGetTransport();
        http.open("GET", Url, true);

        //Send the proper header information along with the request
        http.setRequestHeader ("Content-type", "text/*; text/html");
        http.setRequestHeader("Cache-Control", "no-cache");
        http.onreadystatechange = function() {

            if(http.readyState == 4) {
                if(callback){
                    if(typeof callback === "function")
                        callback(http.responseText);
                    else
                        if(typeof callback == "object" && callback.onAfterXHR){
                            callback.onAfterXHR(http.responseText);
                        }
                }
            }
        }
        http.send("");

    }catch(e){alert(e + " : " + Url);}

}

function _SRGetTopIndex(container){
    container = container?container:document.body;
    var topI = 0;
    var elems = container.getElementsByTagName("div");
    for(var i=0; i < elems.length; i++){
        var e = elems[i];
        if(e.style){
            var zi = e.style.zIndex || 0;
            if(zi > topI)
                topI = parseInt(zi);
        }
    }
    return topI>0?topI:1;
}

function _SRSortNumericArray(arr, option){

    if(option && (option == 'DESC' || option.toLowerCase() == "descending"))
        return  arr.sort(function(a,b){return b - a});
    else
        return  arr.sort(function(a,b){return a - b});

}

function _SRGetWindowBoundry(){
    return{top:{x:0,y:0},bottom:{x:document.body.clientWidth,y:document.body.clientHeight}};
}

//_SRWindowBoundry = _SRGetWindowBoundry();

/////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function _SRGetUniqueId(){
    var id;
    do{
        id = _SRGetRandomKey(4);
    }while(document.getElementById(id) != null)
        return id;
}


function _SRInsertBeforeEvent(evt,func){
    if(evt){
       
        var f = new function(m){
            var exec = [func,evt];
            exec[0](m);
            exec[1](m);
        };
    }else{
        evt = func;
    }

}

function _SRGetRandomKey(size){
    if(!size) size = 11;

    var chars = "a,A,b,B,c,C,d,D,e,E,f,F,g,G,h,H,i,I,j,J,k,K,l,L,m,M,n,N,o,O,p,P,q,Q,r,R,s,S,t,T,u,U,v,V,x,X,y,Y,z,Z,1,2,3,4,5,6,7,8,9,0";
    var charsArr = chars.split(",");
    var returnKey = "";
    for(var i=0;i<=size;i++){
        var randomnumber=Math.floor(Math.random()*charsArr.length);
        returnKey += charsArr[randomnumber];
    }
    return returnKey;
}

function _SRGetRandomNumber(max,min){
    max = max || 100;
    min = min || 0;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _SRGetImage(_src){
    var img = new Image();
    img.src = _src
    return img;
}


function _SRGetObjectLength(_obj){
    var r = 0;
    if(typeof _obj == "object")
    for(var t in _obj)
        r++;

    return r;
}

/**
 * returns absolute dimensions relative to the top(0) left (0) corner of the visable HTML document.
 */
function _SRGetAbsoluteCoords(e, setProperties){
    if(!e) throw "getAbsolutePosition(element) was passed a null value. ";
    if(e.isSet && !e.isSet()) throw "_SRGetAbsolutePosition: Cannot factor position of dynamic element before it has been rendered. > getAbsolutePosition(e)";
    var obj = e
    var ret = {top:0,left:0,bottom:0,right:0,width:e.clientWidth,height:e.clientHeight};
    do{
        if(e != document.body){
            ret.left += e.offsetLeft;
            ret.top += e.offsetTop;
        }
    }while ((e = e.offsetParent))
        ret.right = ret.left + ret.width;
    ret.bottom = ret.top + ret.height;
        
    if(setProperties){
        obj.width = ret.width;
        obj.height = ret.height;
        obj.top = ret.top;
        obj.left = ret.left;
        obj.bottom = ret.bottom;
        obj.right = ret.right;
    }

    return ret;
   
}
/**
 * returns absolute dimensions relative to the top(0) left (0) corner of the parent object.
 */
function _SRGetRelativeCoords(e, setProperties){
    if(!e) throw "getAbsolutePosition(element) was passed a null value. ";
    if(e.isSet && !e.isSet()) throw "_SRGetRelativePosition: Cannot factor position of dynamic element before it has been rendered. > _SRGetRelativePosition(e)";
    var ret = {top:0,left:0,bottom:0,right:0,width:e.clientWidth,height:e.clientHeight};
    var child = _SRGetAbsoluteCoords(e);
    var parent = _SRGetAbsoluteCoords(e.parentNode);

    ret.left = child.left - parent.left;
    ret.top = child.top - parent.top;
    ret.right = ret.left + ret.width;
    ret.bottom = ret.top + ret.height;

    if(setProperties){
        e.width = ret.width;
        e.height = ret.height;
        e.top = ret.top;
        e.left = ret.left;
        e.bottom = ret.bottom;
        e.right = ret.right;
    }

    return ret;
}

function _SRGetAbsoluteDim(e, setSize){
    var ret = {width:false,height:false};
    if(e.isSet && !e.isSet())
        throw "_SRGetAbsoluteDim(): Cannot factor dimensions of dynamic element before it has been rendered.";
    ret.width = e.clientWidth;
    ret.height = e.clientHeight;
    if(setSize){
        e.width = ret.width;
        e.height = ret.height;
    }
    return ret;
}

function _SRSetUndragable(e){
    e.onselectstart=function(){return false;}
    e.unselectable = "on";
    if(e.style) e.style.MozUserSelect="none";

    return e;
}

function _SRSetDragable(e){
    e.onselectstart=function(){}
    e.unselectable = "off";
    if(e.style) e.style.MozUserSelect="text";

    return e;
}
function _SRRemoveElement(e){
    var td;

    if(IE){
        if(e && e.tagName != 'BODY'){
            td = td || document.createElement('div');
            td.appendChild(e);
            td.innerHTML = '';
        }
    }else{
        if(e && e.parentNode && e.tagName != 'BODY'){
            e.parentNode.removeChild(e);
        }
    }

}

function _SRClearElement(elm){
    // remove all of the components children
      for(var i=0; i<elm.childNodes.length; i++){
           elm.removeChild(elm.childNodes[i]);
         }
}
function _SRSetStyle(elm,style){
    if(IE){
        elm.setAttribute( 'className', style );
    }else{
        elm.setAttribute( 'class', style );
    }
}

function getObjectLength(obj){
    var i=0;
    for (var k in obj)
    {
        i++;
    }
    return i;
}


function _SRGetUserAgent(){
    var ua = navigator.userAgent.toLowerCase();
    var ret = {userAgent:"",version:""}
    if(isSubString(ua,"msie", true) > 0){
        ret.userAgent = "IE";
        if(isSubString(ua,"6.", true) > 0)
            ret.version = 6;
        if(isSubString(ua,"7.", true) > 0)
            ret.version = 7;
        if(isSubString(ua,"8.", true) > 0)
            ret.version = 8;
    }
    if(isSubString(ua,"firefox", true) > 0){
        ret.userAgent = "FIREFOX";
    }
    if(isSubString(ua,"chrome", true) > 0 || isSubString(ua,"chromium", true)){
        ret.userAgent = "CHROME";
    }
    if(isSubString(ua,"safari", true) > 0){
        ret.userAgent = "SAFARI";
    }
    if(isSubString(ua,"opera",true) > 0){
        ret.userAgent = "OPERA";
    }
        return ret;

    return "NA";

}

function isNumeric(q){
    return _SRStringUtils.isNumeric(q);
}
function isSubString(haystack,needle,ignoreCase){
    return _SRStringUtils.isSubString(haystack,needle,ignoreCase);
}

var _SRStringUtils = new Object({


isAlphaNumeric: function(str, except, ignoreCase){

    if(except)
        str = str.replace(except, "", (ignoreCase?"gi":"g"));
        
    return str.match(new RegExp("^([a-zA-Z0-9])+$",(ignoreCase?"gi":"g"))) == null?false:true;
},

isAlpha: function(str, except){
 
    if(except)
        str = str.replace(except, "", "g");

    return str.match(new RegExp("^([a-zA-Z])+$","g") ) == null?false:true;
},

isNumeric: function(str, except, ignoreCase){
   if(typeof str == "number" && isFinite(str)){
       return true;
   }else
       if(typeof str == "string"){
       if(except)
         str = str.replace(except, "", (ignoreCase?"gi":"g"));
    return str.match(new RegExp("^([0-9])+$","g")) == null?false:true;
    }
return false;
},

isSubString: function(haystack,needle,ignoreCase){
    haystack = haystack.toString();
    needle = needle.toString();

    return haystack.match(new RegExp(needle,(ignoreCase?"gi":"g"))) == null?false:true;
},

replaceAll: function(str,replaceStr,withStr){
   return str.replace(new RegExp(replaceStr,("g")), withStr);
},

replaceFirst: function(str,replaceStr,withStr){
   return str.replace(replaceStr,withStr);
},

capitolizeFirstChar: function(key){
  return [key.charAt(0).toUpperCase(),key.substr(1)].join("");
},
stringToHex: function(d){
    var hex = "0123456789ABCDEF";
    return hex[d >> 8] + hex[d & 0x0F];
},
escape: function(string){
   return string.replace(/[\x00-\x1F'\\]/g,
   function (x)
        {
          if (x == "'" || x == "\\") return "\\" + x;
          return "\\x" + ToHex(String.charCodeAt(x, 0));
        })
  },
truncate: function(text, width, fontSize){

    text = text || "undefined";
    width = width || 100;
    fontSize = fontSize || 12;
    var nText = "";
    var tw = 0;

    if(_SREstimateTextWidth(text+".." <= width) )
        return text;

    for(var i=0; i< text.length; i++){
        tw = getTextDimentions(nText+"....", fontSize);
        if(tw >= width ){
            nText += "...";
            break;
        }else{
            nText += text.charAt(i);
        }
    }

    return nText;

}

});


