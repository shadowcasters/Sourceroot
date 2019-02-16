
/* 
 * The standard layout container that contains cells of Rows and columns
 *
 * cell: width:auto;
 * table: table-layout:auto;
 */

var GridLayout  = function (rows, columns, width, height){

    this.numRows = rows;
    this.numColumns = columns;
    this.width = width;
    this.height = height;
    this.cells = {};

    this.table = document.createElement("table");
    this.renderPayne = this.table;
    this.table.width=width?typeof width=="number"?width+"px":width:"100%";
    this.table.height=height?typeof height=="number"?height+"px":height:"100%";
    this.table.style.height=height?typeof height=="number"?height+"px":height:"100%";
    this.table.style.width=width?typeof width=="number"?width+"px":width:"100%";
    this.table.style.padding = "0px";

    this.tBody = document.createElement("tbody");
    this.rowArray = new Array;
    this.table.style.position = "relative";
    this.table.style.borderCollapse = "collapse";
    this.table.style.emptyCells = "show";
    this.table.style.tableLayout = "fixed";
    this.table.border = "0px";
    this.table.cellSpacing = 0;
    this.table.cellPadding = 0;

    for(var i=0; i<rows; i++){
         var Row = document.createElement("tr");
         this.cells[(i+1)] = Row;
         for(var ii=0; ii<columns; ii++){
            var Cell = document.createElement("td");
            Cell.style.padding = "0px";
            Row.appendChild(Cell);
            this.cells[(i+1)][(ii+1)] = Cell;
         }

    
    this.tBody.appendChild(Row);
    this.rowArray[i]=Row;
    }
   
    this.table.appendChild(this.tBody);
 
    return this;
}

GridLayout.prototype.addColumn = function(width){
  
    // rArr and this.cells shoud have the same length
    for(var i=0; i<this.rowArray.length; i++){
        var Cell = this.rowArray[i].appendChild(document.createElement("td"));
        this.cells[(i+1)][(this.numColumns+1)] =Cell;
    }

    this.numColumns += 1;
    if(width != null) this.setColumnWidth(this.numColumns, width);
   
}


GridLayout.prototype.addRow = function(height){
  var Row = document.createElement("tr");
  this.tBody.appendChild(Row);
  this.numRows += 1;
  this.cells[this.numRows] = Row;
    // rArr and this.cells shoud have the same length
    for(var i=0; i < this.numColumns; i++){
        var Cell = Row.appendChild(document.createElement("td"));
        Cell.style.padding = "0px";
        Row.appendChild(Cell);
        this.cells[(this.numRows)][(i+1)] = Cell;
    }
    
    if(height != null) this.setRowHeight(this.numRows, height);
}

GridLayout.prototype.getCell = function(row,column){
    return this.cells[row][column];
}

/**
 *parameter: "left", "center", "right"
 *
 *defaults to center
 */
GridLayout.prototype.setHorizontalAlignment = function(position){
    position = position || "center";
    if(position.toLowerCase() == "middle") position = "center";

    this.tBody.align = position;
     
}
/**
 *parameter: "top", "middle", "bottom"
 *
 *defaults to middle
 */
GridLayout.prototype.setVerticalAlignment = function(position){
   position = position || "middle";
   if(position.toLowerCase() == "center") position = "middle";

   this.tBody.vAlign = position;
}
/**
 * function(element,row,column)
 */
GridLayout.prototype.addChild = function(element,row,column, handle){
   if(!row || !column || !element)
       throw "GridLayout.addChild: A valid element, row and column must be specified.";

   if(!this.cells[row][column])
       throw "GridLayout.addChild: row:"+row+" column:"+column+" is null";
   if(handle!=null)
       this.cells[row][column][handle] = element.renderPayne || element;

       this.cells[row][column].appendChild(element.renderPayne || element);
       
       if(element.onWidgetRender)
           element.onWidgetRender();
       
       if(element.onInsert)
           element.onInsert();

}

GridLayout.prototype.setChildren = function(element,row,column, handle){
    this.cells[row][column].innerHTML = "";
    this.addChild(element, row, column, handle);
}

GridLayout.prototype.getRow = function(rowIndex){
    return this.cells[rowIndex];
}

GridLayout.prototype.getColumn = function(columnIndex){
    var rCol = {};
    for(var r in this.cells){
        rCol[r] = this.cells[r][columnIndex];
    }
    return rCol;
}

GridLayout.prototype.setRowHeight = function(row, height){
if(!row || !height) return false;
if(IE)
    this.getRow(row).height=height+"px";
    else{
     for(var i =1; i<= this.numColumns; i++)
        this.getCell(row, i).style.height = height+"px";
        this.getRow(row).style.height=height+"px";
    }
}

GridLayout.prototype.setColumnWidth = function(column, width){

    if(!column || !width) return false;
    for(var r in this.cells){
        this.cells[r][column].width = width + "px";
        this.cells[r][column].style.width = width + "px";

    }
}