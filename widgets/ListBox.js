
ListBox.prototype = new UIWidget;
ListBox.prototype.widgetName = "listBox";
ListBox.prototype.constructor = ListBox;
ListBox.prototype.defaultProperties = {
    borderSize:0,
    seperatorSize:1,
    itemHeight:19,
    visibleItems:5,
    width:125,
    iconSpacing:5,
    multiSelect:true,
    hoverEffect:true
}

function ListBox (PropertiesObject){
    this.init(PropertiesObject);
}


ListBox.prototype.init = function(PropertiesObject){
     this.initWidget(PropertiesObject);
     this.autoSize = false;
     this.setAbsolutePosition();

    if(!this.highlightSchema)
        this.setHighlightSchema(this.theme.altSchema);

    this.items = new Array;
}

ListBox.prototype.setBorderSize = function(size){ this.borderSize = size; if(this.isRendered) this.doRender(); }
ListBox.prototype.setSeperatorSize = function(size){this.seperatorSize = size; if(this.isRendered) this.doRender(); }
ListBox.prototype.setSeperatorColor = function(color){this.seperatorColor = color; if(this.isRendered) this.doRender(); }
ListBox.prototype.setItemHeight = function(size){ this.itemHeight = size; if(this.isRendered) this.doRender(); }
ListBox.prototype.setIconSpacing = function(size){ this.iconSpacing = size; if(this.isRendered) this.doRender(); }
ListBox.prototype.setVisibleItems = function(numItems){ this.visibleItems = numItems; if(this.isRendered) this.doRender(); }
ListBox.prototype.setHoverEffect = function(bool){this.hoverEffect=bool; }
ListBox.prototype.setHoverSchema = function(schema){this.hoverSchema=typeof schema == "object"?schema:theme.schema[schema]; }
ListBox.prototype.setMultiSelect = function(bool){ this.multiSelect = bool; }

ListBox.prototype.setSelected = function(index){
 var item = this.getItem(index);

    if(!this.multiSelect){
        var oItem = this.getSelectedItems()[0];
        if(oItem){
            
            if(oItem !== item)
                oItem.selected = false;

            if(oItem.icon && oItem.icon.toggle)
                oItem.icon.toggle();
            
        }
    }

   
    var cell = item.cell;
    
    
    if(this.hoverEffect)
    if(item.selected){
       cell.suspendRollover(false);
       cell.onmouseout();
    }else{
       cell.onmouseover();
       cell.suspendRollover(true);
    }


item.selected = item.selected?false:true;

if(item.selected && item.icon && item.icon.toggle){
  
     item.icon.toggle();
}

  if(this.onSelect)
    this.onSelect(item);
}

ListBox.prototype.getItemCount = function(){
          return this.items.length;
}

ListBox.prototype.getItem = function(index){
      if(index > 0 && this.items[index-1])
          return this.items[index -1];
      else
          throw "List has no item at index: "+index+" array index:"+(index-1)+" items.length:"+this.items.length;
}

ListBox.prototype.getSelectedValues = function(){
   var valArr = new Array;

   for(var i in this.items)
      if(this.items[i].selected)
          valArr.push(this.items[i].value);

return valArr;
}

ListBox.prototype.getSelectedItems = function(){
   var valArr = new Array;

   for(var i  in this.items)
      if(this.items[i].selected)
          valArr.push(this.items[i]);

return valArr;
}

ListBox.prototype.setDefaultIcon = function(icon,onSelectIcon){
   this.defaultIcon = icon;
   this.onSelectIcon = onSelectIcon;
}


// I have chosen to create a new menu list element for the listBox rather than use Label.
// This is due to specific needs that list's have which I would not want to implement in a floating label..
// I'm not really sold on this.. but the band plays on.
ListBox.prototype.addItem = function(text, value, icon, OAction){

if(icon != false){
  icon = icon || this.defaultIcon;
}

  var ih = this.itemHeight;
  var iPayne = SRLayout.getDiv("99%",ih).setRelative();
  var _parent = this;
  
  iPayne.style.whiteSpace = "noWrap";
  iPayne.setIcon = function(ico){

    if(ico != null){

        if(iPayne.icon != null){
       
            if(iPayne.icon.renderPayne){
               iPayne.icon.renderPayne.style.background = ico.renderPayne?ico.renderPayne.style.background:ico.style.background;
            }else{
               iPayne.icon.style.background = ico.renderPayne?ico.renderPayne.style.background:ico.style.background;
            }

        }else{
       
         if(typeof ico == "string"){
          
             if(! _parent.onSelectIcon)
                iPayne.icon = new Icon(ico);
            else{
                iPayne.icon = new ToggleIcon(ico, _parent.onSelectIcon);
            }
         }
         else iPayne.icon = ico;

         if(iPayne.icon){
             if(iPayne.icon.renderPayne)
                 iPayne.icon.renderPayne.style.position = "relative";
             else
                 iPayne.icon.style.position = "relative";


             iPayne.addChild(iPayne.icon);
             iPayne.icon.setTop((iPayne.icon?(ih-iPayne.icon.height)/2:(ih - this.theme.font.size)/2));
             iPayne.icon.setLeft(3);
             setCSSFloat(iPayne.icon, "left");
         }
      }
     
     }

  }

  iPayne.setIcon(icon);

  var ct = (ih - (this.theme.font.size + 2)) /2.5;

 


  var td = document.createElement("div");
    td.style.display = "inline-block";
    td.style.whiteSpace = "noWrap";
    td.style.marginTop = ct+"px";
    td.style.paddingLeft = (this.iconSpacing + (IE?0:3) ) +"px";
 
  iPayne.addChild(td,"textDiv");
  iPayne.addChild(getRenderFilm(),"renderFilm");
  iPayne.renderFilm.onmouseover = null;
  iPayne.renderFilm.onmouseout = null;

  if(!this.autoSize){
     var tText = _SRStringUtils.truncate(text,this.width,this.theme.font.size+2);
      
        td.appendChild(document.createTextNode(tText));

        if(tText.substr(tText.length -3, 3) == "..."){
            td.style.position = "absolute";
            td.style.left = iPayne.icon?iPayne.icon.width:3;
            iPayne.renderFilm.title = text;
            iPayne.title = text;
        }
        
    }else
        td.appendChild(document.createTextNode(text || "undefined"));

    iPayne.text = tText || text;
    if(this.seperatorSize)
        iPayne.borderBottom = this.seperatorSize+"px solid #"+this.seperatorColor || this.theme.altSchema.base;

  

  if(this.hoverEffect)
    _SRRollOver(iPayne, this.theme.schema, this.hoverSchema || this.theme.altSchema);

  var _parent = this;

 // start at 1 rather than zero...
  var row = this.items.length +1;
  var valueObj = {index:row,text:text,icon:iPayne.icon,value:value,cell:iPayne};
  this.items.push(valueObj);

  iPayne.renderFilm.onclick = function(){

    if(OAction) OAction();
    
    _parent.setSelected(row);
   }
  
  if(this.onAddItem)
      this.onAddItem();

  if(this.isRendered)
      this.doRender();

  this.addChild(iPayne);

  if(this.autoSize){
    var tw = getTextDimentions(text, this.theme.font.size);
    if(iPayne.icon)
        tw += iPayne.icon.width;
    
      if(!this.topWidth)
          this.topWidth = tw;
      else
          if(tw > this.topWidth)
              this.topWidth = tw;
  }

  return iPayne;
}

ListBox.prototype.setHighlightSchema = function(highlightSchema){
   highlightSchema = typeof highlightSchema == "string"?theme.schema[highlightSchema]:highlightSchema;
   this.highlightSchema = highlightSchema;
}

ListBox.prototype.setAutoSize = function(bool){
    this.autoSize = bool;
}

ListBox.prototype.onInsert = function(){
   this.doRender();
}


ListBox.prototype.doRender = function(){
    
    this.renderPayne.style.backgroundColor = this.theme.schema.base;
    if(this.borderSize > 0)
        this.renderPayne.style.border = "solid "+this.borderSize+"px #"+this.theme.schema.contrast;
    else
        this.renderPayne.style.border = "";
    
    var h = (this.visibleItems * (this.itemHeight + this.seperatorSize +1));
 // _SRDebug.out("h="+h+" widget: "+this.widgetName);
    this.setHeight(h);

    if(this.autoSize){
        
        this.renderPayne.style.width = "";
        this.setHeight( ((this.itemHeight + this.seperatorSize) * this.getItemCount()));
        this.renderPayne.style.display = "inline-block";
    }

    this.renderPayne.style.overflow = "auto";
    
}
