
/* 
 * A button is a ...
 */

Button.prototype = new UIWidget;
Button.prototype.widgetName = "button";
Button.prototype.constructor = Button;
Button.prototype.defaultProperties={
    width:80
}
function Button(configObject){
   this.textArea = new TextLabel("Button");

   if(typeof configObject == "string")
       configObject = {text:configObject}
   this.initWidget(configObject);

   this.setRenderFilm();
}

Button.prototype.onInsert = function(){
    this.doRender();
}

Button.prototype.setAction = function(func){
   this.action = func;
}

Button.prototype.setText = function(text){
   this.textArea.setText(text);
}

Button.prototype.doRender = function(){
 if(!this.theme.imageSetData)
       throw "Image set could not be loaded.";

   this.setHeight(this.theme.getImageMap("left")[2]);
   this.textArea.theme.setFont(this.theme.font.exportObject());
   if(!this.leftCell){
       this.leftCell = this.theme.getImage("left");
       this.leftCell.setStatic();
       setCSSFloat(this.leftCell, "left");
       this.renderPayne.addChild(this.leftCell);
   }

   if(!this.centerCell){
       this.centerCell = SRLayout.getDiv(this.width - (this.leftCell.width * 2),"100%");
       this.centerCell.setLeft(this.leftCell.width);
       //this.centerCell.style.position = "absolute";
       this.centerCell.style.background = this.theme.getHorizontalStyle("background");
       this.centerCell.style.textAlign = "center";
       setCSSFloat(this.centerCell, "left");
       this.textArea.setTop((this.height - this.theme.font.size)/2);
      
       this.renderPayne.addChild(this.centerCell);
   }

   if(!this.rightCell){

       this.rightCell =  this.theme.getImage("right");
       this.rightCell.setStatic();
       setCSSFloat(this.rightCell, "right");
       this.renderPayne.addChild(this.rightCell);
   }
  
   
   this.renderFilm.style.cursor = "pointer";
   this.renderFilm.style.backgroundColor = "white";
   _SRSetOpacity(this.renderFilm,1);

   this.centerCell.addChild(this.textArea,"label");

   this.renderFilm.onmouseover = function(){_SRSetOpacity(this,14);}
   this.renderFilm.onmouseout = function(){_SRSetOpacity(this,1);}

  

   var _parent = this;
   this.renderFilm.onclick = function(){
       if(_parent.action)
           _parent.action();

       if(_parent.onClick)
           _parent.onClick();
    }
 
}