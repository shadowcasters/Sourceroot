

var SRWindowManager = function(){
    this.windex = new Object();
    this.topWindow=false;
}
SRWindowManager.prototype.addWindow = function(win){
        if(win.WINID){
            this.windex[win.WINID] = win;
            this.topWindow = win;
            this.setOrderOpacity();
        }else
            throw "You must pass a valid window object to the addWindow method of the layout manager";



}
SRWindowManager.prototype.removeWindow = function(win){
        if(win.WINID){
            delete this.windex[win.WINID];
            win.finalize();
            win.renderPayne.destroy();
            win = null;
            for(var nWin in this.windex){
                this.setTopWindow(this.windex[nWin]);
                break;
            }
            this.setOrderOpacity();

        }else
            throw "You must pass a valid window object to the removeWindow method of the layout manager";

}
SRWindowManager.prototype.setOrderOpacity = function(){
       for(var win in this.windex){
           win = this.windex[win];
           if(win !== this.topWindow){
               win.renderPayne.style.zIndex = 3;
               win.setFocus(false);
           }else{
               win.renderPayne.style.zIndex = 4;
               win.setFocus(true);
           }
       }
}
SRWindowManager.prototype.setTopWindow = function(winHandle){
    if(!winHandle) return null;
    
    if(winHandle.WINID) winHandle = winHandle.WINID;
    if(typeof winHandle == "object" || this.windex[winHandle]){
        var win = typeof winHandle == "string"?this.windex[winHandle]:winHandle;
        this.topWindow = win;
        this.setOrderOpacity();
    }
}
