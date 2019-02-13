
/* 
 * Create this object and asign a handler for action
 */

var KeyboardHook = function(HTMLElement){
    this.renderPayne = HTMLElement;
    var _parent = this;
    this.renderPayne.onkeyup = function(e){
       var KeyID = (window.event) ? event.keyCode : e.keyCode;
       if(_parent["key_"+KeyID])
           _parent["key_"+KeyID]();
    }
    
}
