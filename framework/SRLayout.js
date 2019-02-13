/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

///////////////////////////// Windowing \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var SRLayout = new Object({

getDivider:function(alignment, innerColor, outterColor){

if(alignment.toLowerCase() == "vertical")
        alignment = "left";
if(alignment.toLowerCase() == "horizontal")
         alignment = "top";

var retDiv = document.createElement("div");
    retDiv.style.position = "absolute";
    alignment = alignment.toLowerCase();
    if(alignment == "right" || alignment == "left"){
       retDiv.style.width="1px";
       retDiv.style.height="100%";

       if(alignment == "left"){
            retDiv.style.borderLeft = "solid 1px #"+innerColor;
            retDiv.style.backgroundColor = outterColor;
       }else{
            retDiv.style.borderLeft = "solid 1px #"+innerColor;
            retDiv.style.backgroundColor = outterColor;
       }

    }else if(alignment == "top" || alignment == "bottom"){
       retDiv.style.height="1px";
       retDiv.style.width="100%";

       if(alignment == "top"){
            retDiv.style.top = "0px";
            retDiv.style.borderTop = "solid 1px #"+outterColor;
            retDiv.style.backgroundColor = innerColor;
       }else{
           retDiv.style.top = "100%";
            retDiv.style.borderTop = "solid 1px #"+innerColor;
            retDiv.style.backgroundColor = outterColor;
       }
    }
    return retDiv;
},


  /**
   * returns a panel that dynamicaly sizes to fit a container element while maintaing two
   * static dimension cells. the total cell count is 3 per panel.
   *
   * <p>
   * both sides set to fixed width of 12px and a center area that changes with the container
   * would be expressed as: getHorizontalLayout(2,12,12);
   *
   * where 2 is the second cell from left to right (or right to left if you prefer :) )
   * </p>
   */
getHorizontalLayout: function(dynaCell,leftStaticCellWidth,rightStaticCellWidth){
    return SRLayout.getLayout("horizontal",dynaCell,leftStaticCellWidth,rightStaticCellWidth);
},
getVerticalLayout: function(dynaCell,StaticCell_1_Height,StaticCell_2_Height){
    return SRLayout.getLayout("vertical",dynaCell,StaticCell_1_Height,StaticCell_2_Height);
},
/**
 * returns a div containing a table layout with two cells, the one to the left
 * is the labelCell, the one to the right is the contentCell, 
 * 
 * the only parameter is direction which is "horizontal" or "vertical"
 * default is horizontal.
 */
getLabelLayout: function(direction){
    direction = (direction=="vertical")?2:1;
    var tbl = SRLayout.getDiv().setRelative();
    if(direction == 1){
        tbl.table = SRLayout.getBaseTable(1,2);
        tbl.labelCell = tbl.table.getCell(1,1);
        tbl.contentCell = tbl.table.getCell(1,2);
        tbl.addChild(tbl.table);
    }else{
        tbl.table = SRLayout.getBaseTable(2,1);
        tbl.labelCell = tbl.table.getCell(1,1);
        tbl.contentCell = tbl.table.getCell(2,1);
        tbl.addChild(tbl.table);
    }
    
    return tbl;
},

   /**
    * getLayout parameter: must be 1,2 or 3 anything else will throw an error
    *
    * 
    * A basic three cell layout, three divs/cells nested inside of one parent div, which
    * is set to dynamic size. The three inner cells which are taged with relative markers
    * -> staticCell1, staticCell2, mainPanel
    *
    * As well as absolute markers (from left to right) -> cell1, cell2, cell3
    *
    * the cell marked as mainPanel will fill the renderPayne where the two cells are
    * seperated. In other words:
    * =============================
    * var lo = getLayout(2); // two is the center cell, could also be 
    * staticCell1.setSize(10,100%);
    * staticCell1.setSize(10,100%);
    *
    * will give you a layout that has a panel in the middel of varied horizontal size and two
    * vertical fill cells that fill up 10 pixels on the left and right.
    */
 getLayout: function(direction, dynamic_cell, static_cell_1_size, static_cell_2_size){
  dynamic_cell = dynamic_cell==null?2:dynamic_cell;
  static_cell_1_size = static_cell_1_size || "";
  static_cell_2_size = static_cell_2_size || "";

  if(typeof dynamic_cell != "number" || isNaN(dynamic_cell) || (dynamic_cell != 1 && dynamic_cell != 2 && dynamic_cell != 3))
         throw "A non-number or an invalid number was passed to getLayout().. parameter must be number: 1, 2 or 3 ";

  var w = SRLayout.getDiv().setRelative();
try{
  var rtbl;
  var isH;
    if(direction.toLowerCase() == "vertical"){
        rtbl = SRLayout.getBaseTable(3,1,true);
        isH = false;
    }else
    if(direction.toLowerCase() == "horizontal"){
        rtbl = SRLayout.getBaseTable(1,3,true);
        isH = true;
    }else
    throw "invalid direction parameter SRLayout.getLayout: "+direction+"  (hint: value MUST be either 'horizontal' or 'vertical')";
   
    // sets size to 100%
    w.setAutoSize = function(bool){
        if(bool){
            rtbl.style.tableLayout = "auto";
            this.setDynamic();

        }else{
            rtbl.style.tableLayout = "fixed";
            SRLayout.setSize(rtbl);
            this.setRelative().setSize();
        }
    }

    w.addChild(rtbl,"table");
    w.cell1 = isH?rtbl.getCell(1,1):rtbl.getCell(1,1);
    w.cell2 = isH?rtbl.getCell(1,2):rtbl.getCell(2,1);
    w.cell3 = isH?rtbl.getCell(1,3):rtbl.getCell(3,1);

    if(dynamic_cell == 1){
        w.mainPanel = w.cell1;
        w.staticCell1 = w.cell2;
        w.staticCell2 = w.cell3;
    }else
     if(dynamic_cell == 2){
        w.staticCell1 = w.cell1;
        w.mainPanel = w.cell2;
        w.staticCell2 = w.cell3;
    }else
     if(dynamic_cell == 3){
        w.staticCell1 = w.cell1;
        w.staticCell2 = w.cell2;
        w.mainPanel  = w.cell3;
     }

     //Overrides the default addChild returned by getDiv
     w.addChild = function(cell,child){
         if(isNaN(parseInt(cell)))
             if(child != null)
                throw "Layout.addChild() was passed an invalid parameter for target cell";
             else{
                child=cell;
                cell = dynamic_cell;
             }
         var e = child.renderPayne?child.renderPayne:child;
         w["cell"+cell].appendChild(e);
         
         if(e.onInsert) e.onInsert();
         if(e.render) e.render();
         if(child.onWidgetRender) child.onWidgetRender();
         if(child.onInsert) child.onInsert();
     }
     w.cell1.addChild = function(widget){w.addChild(1,widget);}
     w.cell2.addChild = function(widget){w.addChild(2,widget);}
     w.cell3.addChild = function(widget){w.addChild(3,widget);}

  if(isH){
    w.staticCell1.style.width = static_cell_1_size+(typeof static_cell_1_size == "number"?"px":"");
    w.staticCell2.style.width = static_cell_2_size+(typeof static_cell_2_size == "number"?"px":"");
  }else{
    w.staticCell1.style.height = static_cell_1_size+(typeof static_cell_1_size == "number"?"px":"");
    w.staticCell2.style.height = static_cell_2_size+(typeof static_cell_2_size == "number"?"px":"");
  }
  


  return w;
  }catch(e){
     throw "Input parameters for getLayout- static_cell_1_size:" +static_cell_1_size+" static_cell_2_size: "+static_cell_2_size+" error: "+e.message;
  }
    
},

   getBaseTable:function(rows, columns, setFixed){
    var tbl= document.createElement("table");
 
    tbl.tBody = tbl.appendChild(document.createElement("tbody"));
    tbl.tBody.style.fontSize = 0;
 

    for(var r=0; r<rows; r++){
        var row = tbl.tBody.appendChild(document.createElement("tr"));
        for(var c=0; c<columns; c++){
          row.insertCell(c);
        }
    }
    tbl.border = "0px";
    tbl.cellSpacing = 0;
    tbl.cellPadding = 0;
    tbl.style.borderCollapse = "collapse";

    tbl.getCell = function(row, column){
     try{
        var ret = tbl.rows.item(row-1).cells.item(column -1);
        return ret;
     }catch(e){throw "Unable to getCell  row:"+row+" column:"+column+" error:"+e.message;}
    }

    return tbl;
},


getTable:function(rows,columns){
    var rtbl= document.createElement("table");
    rtbl.numrows = rows || 1;
    rtbl.numcolumns = columns || 1;
    rtbl.border = "0px";
    rtbl.cellSpacing = 0;
    rtbl.cellPadding = 0;

    rtbl.tBody = document.createElement("tbody");
    rtbl.appendChild(rtbl.tBody);

    var row;
    for(var r=1; r<=rtbl.numrows; r++){
      row = document.createElement("tr");
      row.setAttribute("name", "row_"+r);
        for(var c=1; c<=rtbl.numcolumns; c++){
           var Col = document.createElement("td");
           Col.addChild = function(child,handle){
                 if(child.renderPayne)
                    this.appendChild(child.renderPayne);
                 else
                    this.appendChild(child);

                if(child && handle)
                    this[handle] = child;
                if(child.onInsert){
                    child.onInsert();
                }
                if(child.onWidgetRender){
                  child.onWidgetRender();
                }
          }
           row.appendChild(Col);
        }
       rtbl.tBody.appendChild(row);
    }

    rtbl.getRow = function(index){
        try{
            var ret = rtbl.rows.item(index-1);
            return ret;
        }catch(e){
            throw "Unable to get row: "+row+" error:"+e.message;
        }
    } 

    rtbl.getCell = function(row, column){
     try{
        var ret = this.getRow(row).cells.item(column -1);
      return ret;
     }catch(e){throw "Unable to getCell  row:"+row+" column:"+column+" error:"+e.message;}
    }
    
    rtbl.setRowHeight = function(row, size){
			this.getRow(row).style.height = size+"px";
	}
	
	rtbl.setColumnWidth = function(col, size){
			this.getColumn(col).style.width = size+"px";
	}
    

       // Horizontal alignment..
    rtbl.setHorizontalAlignment = function(position){
        position = position || "center";
        if(position.toLowerCase() == "middle") position = "center";

        this.tBody.align = position;
    }

    // Vertical alignment..
    rtbl.setVerticalAlignment = function(position){
        position = position || "middle";
        if(position.toLowerCase() == "center") position = "middle";

        this.tBody.vAlign = position;
    }

    /**
     * index ( starts at 1 ) = the column that the new column is to preceed. It's not manditory and if omited
     * the new column will be placed after the last column. returns an array containing each cell in the column.
     */
    rtbl.addColumn = function(index){
        var retArr = new Array;
        index = (isNaN(index)?-1:(index -1));
        
        for(var i=1; i<= this.numrows; i++){
           var row = this.getRow(i);
           var Col = row.insertCell(index);
           Col.addChild = function(child,handle){
                 if(child.renderPayne)
                    this.appendChild(child.renderPayne);
                 else
                    this.appendChild(child);

                if(child && handle)
                    this[handle] = child;
                if(child.onInsert){
                    child.onInsert();
                }
                if(child.onWidgetRender){
                  child.onWidgetRender();
                }
          }
              retArr.push(Col);
        }
        this.columns ++;
        return retArr;
    }
    /**
     * index ( starts at 1 ) = the placement of this row in the row set, returns the new row element
     */
    rtbl.addRow = function(index){
        index = (isNaN(index)?-1:(index -1));
        this.numrows ++;
        return this.tBody.insertRow(index);
    }


    return rtbl;
},

enableWordWrap: function(ele){
var mod = ele.mainPanel?ele.mainPanel:(ele.renderPayne?ele.renderPayne:ele);
if(!IE){
mod.style.overflow = "hidden";
mod.style.whiteSpace = "wrap";
mod.style.wordWrap = "break-word";
}else{
	mod.innerHTML = mod.innerHTML.replace(/(.*?)/g, '<wbr />');
}

},

enableEllipsis: function(ele){
	mod.style.textOverflow = "ellipsis";
	mod.style.overflow = "hidden";
	mod.style.whiteSpace = "nowrap";
	mod.style.wordWrap = "break-word";
},

disableWordWrap: function(ele){
var mod = ele.mainPanel?ele.mainPanel:ele;
mod.style.whiteSpace = "nowrap";
mod.style.wordWrap = "";
mod.style.overflow = "scroll";
},

getPreText:function(text, enableWordWrap){
    var d = document.createElement("pre");
	
    d.appendChild(document.createTextNode(text));
//    _SRSetStyle(d, "white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; white-space: -moz-pre-wrap; width 99%'");

 //  d.style.display = IE?"inline":"inline-block";
   if(enableWordWrap)
    this.enableWordWrap(d);
   
   
   
//   d.style.display = IE?"inline":"inline-block";
   d.clear = function(){this.innerHTML = "";}
   d.setText = function(txt){this.clear();this.appendChild(document.createTextNode(txt));}
   d.setWidth = function(x){SRLayout.setWidth(this,x);}
   d.setHeight = function(y){SRLayout.setHeight(this,y);}
   return d;
},

getTextDiv:function(txt, fontObj){
    var tDiv = document.createElement("div");
    tDiv.style.display = IE?"inline":"inline-block";
    tDiv.style.whiteSpace = "nowrap";
    tDiv.id = _SRGetUniqueId();
    tDiv.setTop = function(y){SRLayout.setTop(this,y);}
    tDiv.setLeft = function(x){SRLayout.setLeft(this,x);}
    tDiv.setPosition = function(x,y){SRLayout.setPosition(this,x,y);return this;}
    tDiv.setWidth = function(x){SRLayout.setWidth(this,x);}
    tDiv.setHeight = function(y){SRLayout.setHeight(this,y);}
    tDiv.setFont = function(fontObj){_SRFontUtils.setFontObject(tDiv, fontObj);}
    tDiv.setWordWrap = function(bool){_SRFontUtils.setFontObject(tDiv, fontObj);}
    tDiv.clear = function(){
        if(IE)
            this.innerText = "";
        else
            this.innerHTML = "";
        }

    tDiv.appendChild(document.createTextNode(txt));
    tDiv.setText = function(txt){this.clear();this.appendChild(document.createTextNode(txt));}
    tDiv.isSet = function(){return document.getElementById(this.id)?true:false;}
    tDiv.setSelectable = function(bool){
             if(!bool){
                 _SRSetUndragable(this);
                 this.style.cursor = "default";
             }else{
                 _SRSetDragable(this);
                 this.style.cursor = "text";
             }
    }
    if(fontObj)
     tDiv.setFont(fontObj);
  
     tDiv.setSelectable(true);

    return tDiv;
},

getDiv: function(width,height,handle){
      var div = document.createElement('div');
      div.style.zIndex = 1;
      div.setSize = function(w,h){SRLayout.setSize(this,w,h);return this;}
      div.setPosition = function(x,y){SRLayout.setPosition(this,x,y);return this;}
      div.setTop = function(y){SRLayout.setTop(this,y);}
      div.setLeft = function(x){SRLayout.setLeft(this,x);}
      div.setWidth = function(x){SRLayout.setWidth(this,x);}
      div.setHeight = function(y){SRLayout.setHeight(this,y);}
      div.setVisible = function(bool){this.style.visibility = bool?"visible":"hidden";}
      div.isVisible = function(){return this.style.visibility.toLowerCase() == "visible"?true:false;}
      div.isScrollable = function(){return this.style.overflow.toLowerCase() == "auto"?true:false;}
      div.setScrollable = function(bool){this.style.overflow = bool?"auto":"hidden";}
      div.setAbsolute = function(){this.style.position = "absolute";this.style.top=this.style.top||"0px";this.style.left=this.style.left || "0px";return this;}
      div.setStatic = function(){this.style.position = "static";return this;}
      div.setRelative = function(){this.style.position = "relative";return this;}
      div.setDynamic = function(){this.style.position="relative";this.style.height="";this.style.width="";this.style.display = IE?"inline":"inline-block";return this;}

      div.toFront = function(){
        this.style.zIndex = _SRGetTopIndex(this.parentNode);
      }
      div.clear = function(){
        if(IE)
            this.innerText = "";
        else
            this.innerHTML = "";
      }
      
      div.setChildren = function(e,handle){
          this.clear();
          return this.addChild(e,handle);
      }

      div.removeComponent = function(Component){
      if(typeof Component == "object")
          if(Component.renderPayne)
             Component = Component.renderPayne;

      // remove all of the components children
      for(var i=0; i<div.childNodes.length; i++){
         var elem = div.childNodes[i];
         if(Component == "*" || elem === Component){
                 this.removeChild(elem);
                 elem = null;
             }
         }
   
      }

      div.addChild = function(e,handle){
          if(e.name && !handle) handle = e.name;
          if(typeof e == 'string'){throw "addChild requires a valid HTMLElement";}
        
          if(handle){
            this[handle] = e;
          }
          
          if(e.setAttribute && !e.getAttribute("id")){e.id = _SRGetUniqueId();e.setAttribute("id",e.id);}

          if(e.renderPayne)
                this.appendChild(e.renderPayne);
          else
                this.appendChild(e);
          
          // if we've added a layout we will call render() to initiate its dimentions.
          if(e.render)
              e.render();
                if(e.onInsert)
                    e.onInsert(div);
                if(e.onWidgetRender){
                   e.onWidgetRender(div);
                }
          return e;
      }
      
      div.destroy = function(){
       if(div){
      
            div.clear();
            if(div.parentNode && div.parentNode.removeComponent)
                div.parentNode.removeComponent(div);
            else
              if(div.parentNode)
                div.parentNode.removeChild(div);

            delete div;
            div = null;
    
        }
        
      }
      
  
      
      return div.setSize(width,height);
},
 removeElement : function(elem){
  _SRRemoveElement(elem);
 }, 
 setLeft:function(e,x){
     if(e.left != x){
      var tx =  typeof x;
       if(tx == "number"){
        e.left = (x >= 0?x:0);
        e.style.left = e.left +"px";
       }else
        if(tx == "string")
            e.style.left = x;
        else
         if(tx == "object" && e.left)
            e.style.left = e.left;

       tx = null;
     }
 },
 setTop:function(e,y){
  if(e.top != y){
      var ty =  typeof y;
   if(ty == "number"){
        e.top = (y >= 0?y:0);
        e.style.top = e.top +"px";
    }else
        if(ty == "string")
            e.style.top = y;
        if(ty == "object" && y.top)
            e.style.top = y.top;

        ty = null;
    }

 },
// evaluate whether the above two method's logic can replace this setPosition logic.
 setPosition: function(elem,x,y){
     this.setLeft(elem,x);
     this.setTop(elem,y);

return elem;
      
},
setSize: function(elem,x,y){
    elem = this.setWidth(elem,x);
    elem = this.setHeight(elem,y);

    return elem;
},
setWidth: function(elem,x){
if(typeof x == "number" && x < 0)
    x=0;

if(x==null) x = "100%";


if(typeof x != 'string' && typeof x != 'number'){
       throw "SRLayout.setWidth: Dont pass an object as the new dimention argument";
}

if(x==0){
     elem.style.width = "0px";
     elem.width = 0;
     if(elem.size)
         elem.size.width =0;
}else{
    if(!x || (typeof x == 'string' && x.length < 1)){
        x = "100%";
    }

    if(x) x = typeof x == 'string'?(isNumeric(x,"px")?parseInt(x):isSubString(x,"%")?x:"100%"):x;

    
if(typeof x == 'string' && elem.clientWidth > 0){
    x = elem.offsetWidth;
}

   var _width = x;
   
   if(typeof x == 'number'){
      _width = x >= 0?x:0;
      _width = (_width)+"px";
   }
   
   elem.style.width = _width;
   elem.width = parseInt(_width);

   if(elem.size)
      elem.size.width = parseInt(_width);

}
    if(elem.onSetWidth) elem.onSetWidth();

    return elem;

},
setHeight: function(elem,y){

if(typeof y == "number" && y < 0)
    y=0;

if(y==null) y="100%";
if(typeof y != 'string' && typeof y != 'number'){
       throw "SRLayout.setHeight: Dont pass an object as the new dimention argument";
}
if(y==0){
  
     elem.style.height = "0px";
     elem.height = 0;
     

}else{
    if(!y || (typeof y == 'string' && y.length < 1)){
        y = "100%";
    }

    if(y) y = typeof y == 'string'?(isNumeric(y,"px")?parseInt(y):isSubString(y,"%")?y:"100%"):y;
    
    // it must be a %
    if(typeof y == 'string' && elem.clientHeight > 0){
        y = elem.offsetHeight;
    }

 var _height = y;
   if(typeof y == 'number'){
    _height = y >= 0?y:0;
     _height = (_height)+"px";
   }


     elem.style.height =_height;
     elem.height = parseInt(_height);
     if(elem.size)
         elem.size.width = parseInt(_height);
   
}
    if(elem.onSetHeight) elem.onSetHeight();
    return elem;
}
});
