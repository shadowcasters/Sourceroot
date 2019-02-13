
/**
 * Implentation of a browser payne that can be used to display web pages within the browser
 * context at hand.
 */
BrowserPanel.prototype = new Panel;
BrowserPanel.prototype.widgetName = "BrowserPanel";
BrowserPanel.prototype.constructor = BrowserPanel;
BrowserPanel.prototype.defaultProperties={
 corners:"bevel",
 width:400,
 height:500
}

function BrowserPanel(configObject){
    this.initWidget(configObject);
    this.init();
    this.initBrowserPanel();
}

BrowserPanel.prototype.initBrowserPanel = function(){
    this.frame = document.createElement("IFRAME");
    this.frame.style.width = "100%";
    this.frame.style.height = "100%";
   
    this.frame.style.border="none";
    this.doEmbedMainPanel();
    this.addChild(this.frame);
}

BrowserPanel.prototype.navigate = function(url){
    this.frame.src = url;
}

BrowserPanel.prototype.stop = function(){
    this.frame.src = "#";
}
/**
 * Prevents a user from accessing the underlying content, as well as preventing the loss of mouse events when the
 * mouse is over the embeded frame. 
 */
BrowserPanel.prototype.lock = function(url){
    this.setRenderFilm();
}