
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var SelectBox = function(PropertiesObject){
    
    this.initWidget(PropertiesObject);
    this.mainPanel = SRLayout.getDiv();
    this.init();
 
    this.setHighlightSchema(this.theme.altSchema);
    this.setWidth(this.width);
    this.setItemHeight(this.itemHeight);
    this.setMultiSelect(false);

    var _parent = this;
    this.onSelect = function(item){
  
        if(item){
            item.cell.suspendHover = false;
            _parent.setSelectedItem(item);
        }
        
        if(_parent.renderPayne.height > _parent.itemHeight)
        _parent.contract();

    }

    this.addItem_Ancestor = this.addItem;
    this.addItem = function(text,value,icon){
       this.addItem_Ancestor(text,value,icon);
    }
   
    this.sItem = new Label(this.unselectedText,this.unselectedIcon);
    
    this.selectSlot = SRLayout.getDiv("100%",this.itemHeight);
    this.selectSlot.style.position = "relative";
    this.selectSlot.style.zIndex = 3;
    this.selectSlot.addChild(this.sItem);
    this.selectSlot.setPosition(0,0);
    this.selectSlot.style.backgroundColor = this.theme.base;
    this.selectSlot.style.color = this.theme.schema.font.color;
    this.selectSlot.style.paddingTop= IE?"1px":"2px";
    this.selectSlot.style.paddingLeft = "4px";
    
    this.selectOffset = IE?1:3;
    this.renderPayne.appendChild(this.selectSlot);
    this.setPosition(0,0);
}


SelectBox.prototype = new ListBox;
SelectBox.prototype.widgetName = "selectBox";
SelectBox.prototype.constructor = SelectBox;
SelectBox.prototype.defaultProperties={
    itemHeight:20,
    width:125,
    height:20,
    multiSelect:false,
    
    unselectedText:"Select Option",
    unselectedIcon:"arrow.right"
}

//////////////// Expand and contract \\\\\\\\\\\\\\\\\\\\\
SelectBox.prototype.expand = function(delay){
     var _parent = this;
     if(!this.isBusy){
        this.isBusy = true;
        this.renderPayne.style.zIndex = 2;
        this.selectSlot.style.borderBottom="1px solid #"+this.theme.schema.contrast;
        SRDynasize("grow", "vertical", delay||10, this.renderPayne , (this.items.length) * (this.itemHeight) + this.itemHeight + this.selectOffset,function(){
            _parent.isBusy=false;
        },this.itemHeight *2);
    }
}

SelectBox.prototype.contract = function(delay){

     var _parent = this;
     if(!this.isBusy){
        this.isBusy = true;
        this.renderPayne.style.zIndex = 2;
       
        SRDynasize("shrink", "vertical", delay||10, this.renderPayne ,this.itemHeight,function(){_parent.isExpanded = false; _parent.renderPayne.style.zIndex = 1; _parent.selectSlot.style.borderBottom=""; _parent.isBusy=false;},this.itemHeight*2);
     }

}
///////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/**
 * The text that appears in the box before a selection is made.
 */

SelectBox.prototype.setUnselectedText = function(text){this.unselectedText = text;}
SelectBox.prototype.setUnselectedIcon = function(icon){this.unselectedIcon = icon;}
SelectBox.prototype.getSelectedValue = function(){return this.getSelectedValues()[0];}
SelectBox.prototype.getSelectedItem = function(){return this.list.getSelectedItems()[0];}

SelectBox.prototype.setSelectedItem = function(itemObj){
    
    if(itemObj.icon)
        if(itemObj.icon.handle)
        this.sItem.setIcon(itemObj.icon.handle);

    this.sItem.truncateWidth()
    this.sItem.setText(itemObj.cell.text);

    this.sItem.setAutoHint(false);
    if(itemObj.cell.suspendRollover){
        itemObj.cell.suspendRollover(false);
        itemObj.cell.onmouseout();
    }
    
    if(itemObj.cell.title)
        this.sItem.renderPayne.title = itemObj.cell.title;
    else
        this.sItem.renderPayne.removeAttribute("title");

this.sItem.renderPayne.style.zIndex = 2;

}


SelectBox.prototype.onInsert = function(){
    this.doRender();
    this.doRender2();
}

SelectBox.prototype.doRender2 = function(){
    
    this.setItemHeight(this.itemHeight);

    this.renderPayne.style.backgroundColor = this.theme.schema.base;
    this.renderPayne.style.border = "#"+this.theme.schema.contrast+" 1px solid";

    var _parent = this;

    this.renderPayne.onclick = function(){
       _parent.inUse = true;
       _parent.expand(5);
    }

    this.renderPayne.onmouseover = function(){
       _parent.inUse = true;
    }

    this.renderPayne.onmouseout = function(){
          setTimeout(function(){
              if(!_parent.inUse){
                _parent.contract(1);

              }
          },300);

      _parent.inUse = false;

    }

    this.renderPayne.style.cursor = "pointer";
    this.renderPayne.style.overflow ="hidden";
    this.setHeight(this.itemHeight);
}