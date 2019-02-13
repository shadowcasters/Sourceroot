

function SRGetFontObj(schema){
	return theme.fonts[schema]?theme.fonts[schema]:theme.fonts["primary"];
}

function SRLoadFontObj(obj,elem){
	if(typeof obj == "string")
		obj = SRGetFontObj(obj);
	
    
	if(obj.url){		
		SRLoadRemoteFont(obj.url, elem);
	}
	
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
         elseem.style.textDecoration = "underline";
}


function SRLoadRemoteFont(url, elem) {
    var wf = document.createElement('script');
   
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://'+url;
    wf.type = 'text/javascript';
    wf.async = 'true';
  
    elem.parentNode.insertBefore(wf, elem);
  }