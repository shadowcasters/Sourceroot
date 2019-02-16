

/* 
 * A leaner panel usage
 */

Panel.prototype = new UIWidget;
Panel.prototype.widgetName = "panel";
Panel.prototype.constructor = Panel;
Panel.prototype.defaultProperties = {
    width:200,
    height:300,
    scrollable:true
}

function Panel (PropertiesObject){
    this.initWidget(PropertiesObject);
    this.init();
}

Panel.prototype.init = function(){
    this.renderPayne.style.position = "relative";
    this.renderPayne.style.overflow = "hidden";
    this.layout = new GridLayout(3, 3,"100%","100%");

    if(this.horizontalMargin == null){
       this.horizontalMargin= Math.ceil(this.theme.getImageMap("top.left")[1] / 4);
    }
    if(this.verticalMargin == null){
        this.verticalMargin= Math.ceil(this.theme.getImageMap("top.left")[1] / 4);
    }

    
    this.mainPanel = SRLayout.getDiv("100%","100%").setRelative();
    _SRFontUtils.setFontObject(this.mainPanel, this.theme.font);
   


    this.mainLayout = new GridLayout(3, 3,"100%","100%");
    this.mainLayout.table.style.position="absolute";
    this.mainLayout.table.style.zIndex = 1;

    this.mainLayout.setColumnWidth(1, this.horizontalMargin);
    this.mainLayout.setColumnWidth(3, this.horizontalMargin);
    this.mainLayout.setRowHeight(1, this.verticalMargin);
    this.mainLayout.setRowHeight(3, this.verticalMargin);
    this.mainLayout.addChild(this.mainPanel, 2, 2);
    this.renderPayne.addChild(this.mainLayout.table);
    this.renderPayne.addChild(this.layout.table);

}

Panel.prototype.setHorizontalMargin=function(value){
    this.horizontalMargin=value || Math.ceil(this.theme.getImageMap("top.left")[1] / 4);
    this.mainLayout.setColumnWidth(1, this.horizontalMargin);
    this.mainLayout.setColumnWidth(3, this.horizontalMargin);
}
Panel.prototype.setVerticalMargin=function(value){
    this.verticalMargin = value || Math.ceil(this.theme.getImageMap("top.left")[1] / 4);
    this.mainLayout.setRowHeight(1, this.verticalMargin);
    this.mainLayout.setRowHeight(3, this.verticalMargin);
}

Panel.prototype.doEmbedMainPanel = function(){
    this.layout.getCell(2,2).appendChild(this.mainPanel);
}

Panel.prototype.setCorners = function(imageSet){
    this.theme.setImageSet(imageSet);
        if(this.isRendered)
            this.doRender();
}

Panel.prototype.setScrollable = function(bool){
    this.isScrollable = bool;

    if(this.isRendered)
        if(bool)
            this.mainPanel.style.overflow = "auto";
        else
            this.mainPanel.style.overflow = "hidden";
}

Panel.prototype.setMargin = function(margin){
    this.margin = margin;

    if(this.isRendered)
        this.sizeMainPanel();
}


Panel.prototype.onInsert = function(){
    this.doRender();
}

Panel.prototype.doRender = function(){

        var width = this.theme.getImageMap("top.left")[1];
        var height = this.theme.getImageMap("top.left")[2];
        

        this.layout.setRowHeight(1,height);
        this.layout.setColumnWidth(1, width);
        this.layout.setRowHeight(3,height);
        this.layout.setColumnWidth(3, width);

        this.layout.getCell(1,1).style.background = this.theme.getImageStyle("top.left");
        this.layout.getCell(1,2).style.background = this.theme.getHorizontalStyle("top");
        this.layout.getCell(1,3).style.background = this.theme.getImageStyle("top.right");

        this.layout.getCell(3,1).style.background = this.theme.getImageStyle("bottom.left");
        this.layout.getCell(3,2).style.background = this.theme.getHorizontalStyle("bottom");
        this.layout.getCell(3,3).style.background = this.theme.getImageStyle("bottom.right");

        this.layout.getCell(2,1).style.background = this.theme.getVerticalStyle("left");
        this.layout.getCell(2,3).style.background = this.theme.getVerticalStyle("right");
        this.layout.getCell(2,2).style.backgroundColor = this.theme.schema.base;

        if(!this.margin)
            this.margin = Math.round(this.theme.getImageMap("top.left")[1] /4);

        this.setScrollable(this.isScrollable);
        
width = null;
height = null;

}