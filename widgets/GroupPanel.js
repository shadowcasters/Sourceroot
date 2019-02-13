

/*
 *A panel that lets you set a title which will appear at the top of the border.
 */
Panel.prototype.defaultProperties = {
    width:200,
    height:300,
    scrollable:true
}
var GroupPanel = function(width, height, title, schema){

     if(typeof width == "object")
        this.PropertiesObject = width;
     else{
        this.PropertiesObject = {};
        this.PropertiesObject.width = width;
        this.PropertiesObject.height = height;
        this.PropertiesObject.title = title;
        this.PropertiesObject.schema = schema;
     }
     this.initWidget(this.PropertiesObject);
     this.init();
     this.setAbsolutePosition();


return this;
}

GroupPanel.prototype = new Panel;
GroupPanel.prototype.widgetName = "groupPanel";
GroupPanel.prototype.constructor = GroupPanel;

GroupPanel.prototype.setTitle = function(text,icon){
    this.title = text;
    this.icon = icon;

    if(this.isRendered){
        this.label.setLabel(text, icon); //Div.clear();
        //this.labelDiv.setText(text);
    }
}

GroupPanel.prototype.setLayout = function(rows, columns){
    //// add param check
    this.layout = new SRTable(rows ||1, columns ||1);
    this.addChild(this.layout);
}

GroupPanel.prototype.onInsert = function(){
    this.doRender();
    this.doRender2();
}

GroupPanel.prototype.doRender2 = function(){
    if(this.title){
        var label = new Label(this.title,this.icon,this.theme.themeObject.font); //SRLayout.getTextDiv(this.title);
        
        //label.setSelectable(false);
        //label.offset=this.theme.themeObject.font.size;
        //label.style.fontSize = label.offset+"px";
        //label.setPosition(10,0);
        this.label = label;

//        if(_SREstimateTextWidth(this.title, 10) > this.width){
//             this.label.title = this.title;
//             this.title = _SRStringUtils.truncate(this.width, this.title);
//             label.setText(this.title);
//        }


        this.doEmbedMainPanel();
        
        var fcl = this.theme.getImage("top.left");
        var fcr = this.theme.getImage("top.right");
        var fbt = this.theme.getTile("top", "horizontal");
        fbt.setHeight(fcr.height);
        this.layout.setRowHeight(1,(this.theme.themeObject.font.size + 8));
        this.layout.getCell(1,1).style.background = "";
        this.layout.getCell(1,2).style.background = "";
        this.layout.getCell(1,3).style.background = "";

        this.layout.getCell(1,2).appendChild(label.renderPayne);
        setCSSFloat(label, "left");

        this.layout.getCell(1,1).appendChild(fcl);
        fcl.setStatic();




        this.layout.getCell(1,2).appendChild(fbt);
        setCSSFloat(fbt, "right");
         fbt.setStatic();

        this.layout.getCell(1,3).appendChild(fcr);
         fcr.setStatic();


        this.layout.getRow(1).vAlign = "bottom";
        this.layout.getCell(1,1).style.verticalAlign = "bottom";

    }

}









