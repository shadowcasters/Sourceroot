
LabelTextField.prototype = new UIWidget;
LabelTextField.prototype.widgetName = "labelTextField";
LabelTextField.prototype.constructor = LabelTextField;
/**
 * Accepts either a textLabel or Label widget. This Label and the created textField are abailable
 * as a natural elements of this object at:
 * <br>
 * <Object>.label;<br>
 * <Object>.textField;
 *
 */
function LabelTextField(labelWidget, labelSpace){
    this.initWidget({});

    if(labelSpace == null || !isNumeric(labelSpace)){
     labelSpace=5;
    }

    if(labelWidget && labelWidget.widgetName == "label")
        this.label = labelWidget;
    else
        if(typeof labelWidget == "string")
            this.label = new Label(labelWidget);
        else
            throw "UIWidget LabelTextField requires a label be passed as the only argument.";

 this.setSchema = function(schemaHandle){
   this.theme.setSchemaTheme(schemaHandle);
   if(this.label)
       this.label.setSchema(schemaHandle);
 }

 this.textField = new TextField();
 this.layout = SRLayout.getHorizontalLayout(1,labelSpace);
 this.renderPayne.style.width = "100%";
// this.renderPayne.style.backgroundColor = "blue";
// this.layout.table.style.backgroundColor = "pink";
 this.layout.table.width = "100%";
 //this.layout.table.tBody.style.tableLayout = "fixed";
 this.layout.table.tBody.vAlign = "middle";
 this.layout.table.tBody.align = "center";
 this.layout.addChild(1,this.label);
 this.layout.addChild(3,this.textField);
 this.layout.cell1.style.width="1px";
 this.layout.cell2.style.width = labelSpace+"px";
// this.layout.cell2.style.fontSize = "1";
// this.layout.cell2.appendChild(document.createTextNode("i"));
// 
 

  //this.layout.setAutoSize(true);
  this.addChild(this.layout);
  
}

LabelTextField.prototype.setIcon = function(icon){
    this.label.setIcon(icon);
}

LabelTextField.prototype.setLabelText = function(text){
    this.label.setText(text);
}

LabelTextField.prototype.getTextField = function(){
    return this.textField;
}

LabelTextField.prototype.getLabel = function(){
    return this.label;
}

LabelTextField.prototype.onInsert = function(){
    
}
