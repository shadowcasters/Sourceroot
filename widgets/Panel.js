/* 
 * A leaner panel usage
 */

Panel.prototype = new UIWidget;
Panel.prototype.widgetName = "panel";
Panel.prototype.constructor = Panel;
Panel.prototype.defaultProperties = {
    width:200,
    height:300
}

function Panel (PropertiesObject){
    this.initWidget(PropertiesObject);
    this.init();
       
    this.setLeftMargin(20);
	this.setRightMargin(20);
	this.setTopMargin(20);
	this.setBottomMargin(20);

    return this;
}

Panel.prototype.init = function(){
    this.renderPayne.style.overflow = "hidden";
    this.mainLayout = new SRTable(3, 3,"100%","100%");
    this.renderPayne.addChild(this.mainLayout);
    
    this.topLayout = new SRTable(3, 3,"100%","100%");
    this.renderPayne.addChild(this.topLayout);
    this.topLayout.highlightCells();
    this.topLayout.getCell(2,2).style.overflow = "hidden";
    this.mainPanel = this.topLayout.getCell(2,2); 
    
}

Panel.prototype.setLeftMargin=function(value){
    if(this.topLayout)
		this.topLayout.setColumnWidth(1, (value || this.leftMargin));
   if(value && value != null)
    this.leftMargin = (value || this.leftMargin);
}


Panel.prototype.setRightMargin=function(value){
   if(this.topLayout)
	this.topLayout.setColumnWidth(3, (value || this.leftMargin));
   
   if(value && value != null)
    this.rightMargin = (value || this.rightMargin);
}

Panel.prototype.setTopMargin=function(value){
    
    if(value && value != null){
	  this.topMargin = value;
	}else{
	  
	}

   if(this.topLayout)
  	 this.topLayout.setRowHeight(1, this.topMargin);
    
    
}

Panel.prototype.setBottomMargin=function(value){
   if(this.topLayout)
    this.topLayout.setRowHeight(3, (value || this.bottomMargin));
    
   if(value && value != null) 
    this.bottomMargin = (value || this.bottomMargin);
   
}


Panel.prototype.doEmbedMainPanel = function(){
    this.mainLayout.getCell(2,2).appendChild(this.mainPanel);
}

Panel.prototype.setCorners = function(imageSet){
    this.theme.setImageSet(imageSet);
        if(this.isRendered)
            this.doRender();
}

Panel.prototype.setScrollable = function(bool){
    this.isScrollable = bool;

    if(this.topLayout)
        if(bool)
            this.mainPanel.style.overflow = "auto";
        else
            this.mainPanel.style.overflow = "hidden";
}

Panel.prototype.onInsert = function(){
    this.doRender();
    

}

Panel.prototype.doRender = function(){

        var width = this.theme.getImageMap("top.left")[1];
        var height = this.theme.getImageMap("top.left")[2];
        

        this.mainLayout.setRowHeight(1,height);
        this.mainLayout.setColumnWidth(1, width);
        this.mainLayout.setRowHeight(3,height);
        this.mainLayout.setColumnWidth(3, width);

        this.mainLayout.getCell(1,1).style.background = this.theme.getImageStyle("top.left");
        this.mainLayout.getCell(1,2).style.background = this.theme.getHorizontalStyle("top");
        this.mainLayout.getCell(1,3).style.background = this.theme.getImageStyle("top.right");

        this.mainLayout.getCell(3,1).style.background = this.theme.getImageStyle("bottom.left");
        this.mainLayout.getCell(3,2).style.background = this.theme.getHorizontalStyle("bottom");
        this.mainLayout.getCell(3,3).style.background = this.theme.getImageStyle("bottom.right");

        this.mainLayout.getCell(2,1).style.background = this.theme.getVerticalStyle("left");
        this.mainLayout.getCell(2,3).style.background = this.theme.getVerticalStyle("right");
        this.mainLayout.getCell(2,2).style.backgroundColor = this.theme.schema.base;

       

        this.setScrollable(this.isScrollable);
        
width = null;
height = null;

}
