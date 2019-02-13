
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

CommentBubble.prototype = new UIWidget;
CommentBubble.prototype.widgetName = "commentBubble"
CommentBubble.prototype.constructor = CommentBubble;
function CommentBubble(PropertiesObject){
   this.initWidget(PropertiesObject);
   
   this.panel = new Panel();

   this.mainPanel = this.panel.mainPanel;
   this.renderPayne.setChildren(this.panel);
   this.renderPayne.style.position = "absolute";
   this.theme=this.panel.theme;
   this.table = this.panel.layout;
   
  // this.setSchema("dark");
   //this.panel.setOpacity(80);

   if(!this.maxWidth) this.setMaxWidth(100);

}

CommentBubble.prototype.setArchSize = function(archSize){
    this.panel.setArchSize(archSize);
}

CommentBubble.prototype.setMaxWidth = function(width){
    this.maxWidth = width;
}

CommentBubble.prototype.setText = function(text){
   this.comment = text;
}

CommentBubble.prototype.onInsert = function(){
    this.doRender();
}

CommentBubble.prototype.doRender = function(){
    this.panel.doRender();
     // get the padding offset
    var bw = this.panel.theme.imageSet.top_left.size.width;
    var bh = this.panel.theme.imageSet.top_left.size.height;

    this.bubbleText = this.comment;
    this.minHeight = (bh * 2) +2;
    this.setHeight(this.minHeight);

    var width = getTextDimentions(this.comment, this.theme.font.size) + 10;
    if(width > this.maxWidth)
        width = this.maxWidth;

    this.text = SRLayout.getDiv();

    this.setWidth(width);
    this.text.setAttribute("style", "{max-width:100px; word-wrap:break-word; }");
    this.text.addChild(document.createTextNode(this.comment));


    this.mainPanel.style.zIndex = 2;
    this.mainPanel.addChild(this.text);

    this.panel.setWidth(width);

    this.panel.doRender();
    var _parent = this;

    // really odd issue getting size in FF
    this.registerRenderCallback (function(){

        if(!IE){

               setTimeout(function(){
                   if(_parent.text.clientHeight > _parent.theme.font.size * 1.5){
                    _parent.setHeight(_parent.text.clientHeight + (bh));

                    _parent.table.getCell(1, 1).style.background = "#"+ _parent.panel.theme.schema.base;
                   }

               },10);
               }else{
                 setTimeout(function(){

                   if(_parent.text.clientHeight > _parent.theme.font.size * 1.5){
                       _parent.setHeight(_parent.text.clientHeight + (bh * 1.38));
                   }else{
                       _parent.table.setRowHeight(2,1);
                   }
                   _parent.label.getCell(1, 1).style.background = "#"+ _parent.panel.theme.schema.base;

                },10);

               }

    } );

//this.panel.renderPayne.style.backgroundColor = "red";
//this.renderPayne.style.backgroundColor = "blue";
//


}