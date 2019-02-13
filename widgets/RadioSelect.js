
var RadioSelect = function(schema){

    PropertiesObject = {
        schema:schema,
        multiSelect:false,
        visibleItems:1,
        hoverEffect:false,
        borderSize:0,
        seperatorSize:1
    }
   
    this.init(PropertiesObject);
    this.setAutoSize(true);
    
    return this;
}

RadioSelect.prototype = new ListBox;
RadioSelect.prototype.widgetName = "radioSelect";
RadioSelect.prototype.constructor = RadioSelect;

RadioSelect.prototype.getValue = function(){
    return this.getSelectedItems()[0];
}

RadioSelect.prototype.addOption = function(text, value){
    if(this.items.length > 0)
         this.setVisibleItems(this.visibleItems+1);
    this.addItem(text, value,"radio.unticked");

    if(this.items.length== 1){
        this.setSelected(1);
    }
}

RadioSelect.prototype.onSelect = function(item){

for(var i=0; i<this.items.length; i++){
     if(this.items[i].index != item.index)
          this.items[i].cell.icon.setIcon("radio.unticked");
     else
          this.items[i].cell.icon.setIcon("radio.ticked");
   }

}

RadioSelect.prototype.onInsert = function(){
     this.renderPayne.style.position = "relative";
     this.doRender();
}
