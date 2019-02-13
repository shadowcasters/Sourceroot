
/**
 *
 *  Grid Widget.
 *
 *  this is a grid made of pure distilled div tags.
 *
 *  I would like to have a specification for this widget to be a column based grid
 *  for uses where in columns are often resized such as spread sheet display as well
 *  as having a refrence to convert it to a row based array for sorting.
 *
 *  It is initially a row based array. That means that it takes a performance hit
 *  when resizing large data sets.
 *
 *  Originaly this grid was made of static layout div tags, which presented a few X browser problems, but more
 *  over it lacked cell overlap. which is a primary feature that I would plan to implement
 *  as the foundatoin for the effects engine.
 *
 ***/
 

var Grid = function(rows,columns,columnWidth,rowHeight,padding,borderWidth){

    if(typeof rows == "object"){
        this.numRows = rows.rows;
        this.numColumns = rows.columns;
        this.columnWidth = rows.columnWidth;
        this.rowHeight = rows.rowHeight;
        this.padding = rows.padding || 0;
        this.borderWidth = rows.borderWidth || 0;
    }else{
        this.numRows = rows || 0;
        this.numColumns = columns || 0;
        this.columnWidth = columnWidth || 100 / columns;
        this.rowHeight = rowHeight;
        this.padding = padding || 0;
        this.borderWidth = borderWidth || 0;
    }
    
    
    this.width = (this.columnWidth + (this.padding *2)) * this.numColumns + this.borderWidth || 0;
    this.height = 0; 



    this.gridArr = new Array;

    this.renderPayne = SRLayout.getDiv(this.width,this.height);
    this.renderPayne.style.position = "absolute";

    this.setSchema();

    var r = this.numRows;
    for(var i=0; i < r; i++){
       this.addRow();
    }

    // this.container = new UIContainer(this);
    
return this;
}

Grid.prototype.setSchema = function(schema){
    
    this.schema = typeof schema == "object"?schema:(theme.schema[schema] || theme.schema["primary"]);
  
    if(this.gridArr[0] != null)
    for(var r=0; r<this.gridArr.length; r++){
       for(var c=0; c<this.gridArr[r].length; c++){
           var cell = this.getCell(r, c);
           cell.style.padding = this.padding+"px";
           cell.style.border = "solid "+this.borderWidth+"px ";
           cell.style.borderColor = "#"+this.schema.contrast;
           cell.style.backgroundColor = this.schema.base;
           cell.style.color = this.schema.fontColor;
        }
    }

}

Grid.prototype.setCellStyle = function(styleProperty, value){

    if(this.gridArr[0] != null)
    for(var r=0; r<this.gridArr.length; r++){
       for(var c=0; c<this.gridArr[r].length; c++){
           var cell = this.getCell(r, c);
           cell.style[styleProperty] = value;
        }
    }

}

Grid.prototype.setHoverCells = function(cellHoverColor, cellHoverFontColor, numberCells){
   this.hasHoverCells = true;
   var parent = this;
   this.hoverState = 0;
   if(this.numberCells == null){
      this.numberCells = numberCells || false;
   }
   if(typeof numberCells == "boolean")
      this.numberCells = numberCells;

   this.cellHoverColor = cellHoverColor || this.schema.contrast;
   this.cellHoverFontColor = cellHoverFontColor || this.schema.base;
   
 for(var r=0; r<this.gridArr.length; r++){
       for(var c=0; c<this.gridArr[r].length; c++){
           var cell = this.getCell(r, c);
           

           if(this.numberCells){
               cell.addChild(new Label([r,":",c].join("")));
           }
           if(!cell.noHover){
               
           
           cell.onmouseover = function(){
            parent.hoverState = 1;
           if(!this.delayToggle){
              
               this.restoreBackground = this.style.backgroundColor;
               this.restoreFontColor = this.style.color;
               this.style.backgroundColor = parent.cellHoverColor;
               this.style.color = parent.cellHoverFontColor;
           }   
               if(parent.onHover)
                   parent.onHover(this);
            
           }
           cell.onmouseout = function(){
             parent.hoverState = 0;
             
               if(!this.delayToggle){
                    this.style.backgroundColor = this.restoreBackground;
                    this.style.color =  this.restoreFontColor;
               }
           
               if(parent.onAfterHover)
                   parent.onAfterHover(this);
           }
           this.gridArr[r][c] = (cell);

          }

        }

    }

}

Grid.prototype.getCell = function(r,c){

   var cell = this.gridArr[r][c];
   return cell;
}

Grid.prototype.removeRow = function(row){
var r = this.gridArr.splice(row, 1)[0];

r[0].row.destroy();
var nTop = 0;
for(var i=0; i<this.gridArr.length; i++){
   this.gridArr[i][0].row.setPosition(0,nTop);

   nTop += this.gridArr[i][0].row.height;

}

this.renderPayne.setHeight(nTop);
  return r;
}


Grid.prototype.addColumn = function(width){
   var width = width || this.columnWidth;

   for(var r=0; r<this.numRows-1; r++){
    if(this.gridArr[r]){
        var col = SRLayout.getDiv(width,"100%");
        var row = this.gridArr[r][0].row;
        var nLeft = row.width;
        var c = this.gridArr[r].length;
        col.style.zIndex = 1;
        col.style.position = "absolute";
        col.style.padding = this.padding+"px";
        col.style.border = "solid "+this.borderWidth+"px ";
        col.style.borderColor = "#"+this.schema.contrast;
        col.setLeft(nLeft);
        col.row = row;
        col.index = {row:this.numRows-1,column:c};
        col.setTop(0);

        row.appendChild(col);
        this.gridArr[r].push(col);

        var cWidth = this.gridArr[0] != null? this.gridArr[0][c].width : this.columnWidth;
        var cHeight = this.gridArr[0] != null? this.gridArr[0][c].height : this.rowHeight;

        col.setSize(cWidth, cHeight);
        col.style.backgroundColor = this.schema.base;
        col.style.color = this.schema.fontColor;
    }
   }
   this.numColumns ++;
}

Grid.prototype.addRow = function(){
    var row = SRLayout.getDiv("100%",this.rowHeight + (this.padding *2) + this.borderWidth );
    row.index = this.gridArr.length -1;
    this.height = this.renderPayne.height;
    var rArr = new Array;
    var nLeft = 0;
    var nTop = this.gridArr[0] != null? this.gridArr[this.gridArr.length -1][0].row.top + this.gridArr[this.gridArr.length -1][0].row.height:0;

    for(var c=0; c<this.numColumns; c++){
        var col = SRLayout.getDiv(this.columnWidth,"100%");
        
        row.style.zIndex = 1;
        col.style.zIndex = 1;
        col.style.position = "absolute";
        col.style.padding = this.padding+"px";
        col.style.border = "solid "+this.borderWidth+"px ";
        col.style.borderColor = "#"+this.schema.contrast;
        col.setLeft(nLeft);
        col.row = row;
        col.index = {row:this.numRows-1,column:c};
        col.setTop(0);
        

        row.appendChild(col);
        row.setPosition(0,nTop);
        

        row.style.position = "absolute";
        var cWidth = this.gridArr[0] != null? this.gridArr[0][c].width : this.columnWidth;
        var cHeight = this.gridArr[0] != null? this.gridArr[0][c].height : this.rowHeight;

        col.setSize(cWidth, cHeight);
        col.style.backgroundColor = this.schema.base;
        col.style.color = this.schema.fontColor;

        nLeft += cWidth;
      
        rArr.push(col);
    }

    this.gridArr.push(rArr);
    this.numRows += 1;
    
    this.renderPayne.setHeight(nTop + cHeight);
    this.renderPayne.addChild(row);
    
    if(this.hasHoverCells)
       this.setHoverCells();
    
    return rArr;
}

/**
 * disables mouse over highlighting for a given cell
 */

Grid.prototype.disableHoverCell = function(row,column){
   this.getCell(row, column).onmouseover = null;
   this.getCell(row, column).onmouseout = null;

   this.getCell(row, column).noHover = true;
   
}

Grid.prototype.appendWidget = function(widget, row, column){
    if(widget.renderPayne){
        this.addRow();
        this.insertWidget(row, column, widget);
    }else
        throw "Grid.appendWidget requires a bonified widget to be inserted";
}
/**
 * writes content to the specified cell and returns the cell
 */
Grid.prototype.insertWidget = function(row,column,component){
   row = row || this.gridArr.length -1;
   column = column || 0;
   var ce = this.getCell(row,column);
   
   if(component && component.renderPayne){
        ce.addChild(component);
   }else
        throw "you must add a valid UI component to this layout";

   component.gridCell = ce;
   return component;
}
/**
 * Resizes the specified cell, accepts either number or a string representing a percentage value
 * return the cell that was resized.
 */
Grid.prototype.resizeCell = function(row,column,width,height){
   var ce = this.getCell(row,column);
   ce.setSize(width,height);
   return ce;
}


Grid.prototype.getRow = function(rowNumber){
    return this.gridArr[rowNumber];
}

Grid.prototype.getColumn = function(columnNumber){
 var colArr = new Array;
 for(var i=0; i < this.gridArr.length; i++)
     colArr.push(this.gridArr[i][columnNumber]);

 return colArr;
}

Grid.prototype.setColumnWidth = function(column,width){
    var colArr = new Array;
    
    for(var cols = column; cols < this.gridArr[0].length; cols++)
         colArr.push(this.getColumn(cols));


   for(var col = 0; col < colArr.length; col++)
    for(var cell=0; cell < colArr[col].length; cell++){
         if(col == 0){
            colArr[0][cell].setWidth(width);
         }else
            colArr[col][cell].setLeft(colArr[col-1][cell].left + colArr[col-1][cell].width + (this.padding *2));
    }

// resize canvas
var lCell = colArr[colArr.length -1][colArr[colArr.length -1].length - 1];

var height = (this.rowHeight + (this.padding *2)) * this.numRows + this.borderWidth;
var width = lCell.left + lCell.width + (this.padding *2) + this.borderWidth;
this.renderPayne.setSize(width,height);

}

Grid.prototype.setRowHeight = function(row,height){

   var rowArr = this.gridArr[row];
   rowArr[0].row.style.overflow = "hidden";
   rowArr[0].row.setHeight(height);

   for(var i=row; i<this.gridArr.length; i++){
        
   }

}

