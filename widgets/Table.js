
/* 
 * specify width height of view port.
 * specify individual column width.
 * speicfy sortable on a column.
 *
 * retreve data by
 *  cell range, -> 2d Array
 *  Column -> Array
 *  Row ->Array
 *
 *
 */
function SRTableCell(){
    var cell  =  document.createElement("td");
    cell.setSize = function(width,height){
        if(width) this.setWidth(width);
        if(height)this.setHeight(height);
    }
    cell.setWidth = function(width){
        if(width == null) throw "Cell width was not defined. _SRTableCell of Table.js";
        if(typeof width == "string" && (width.toLowerCase() == "dynamic" || width.length == 0)){
            this.style.width = null;
            this.width = null;
            width = false;
        }else{
            this.style.width = width+ typeof width=="number"?"px":"";
        }
    }
    cell.setHeight = function(height){
        if(height == null) throw "Cell height was not defined. _SRTableCell of Table.js";
        if(typeof height == "string" && (height.toLowerCase() == "dynamic" || height.length == 0)){
            this.style.height = null;
            this.height = null;
            height = false;
        }else{
            this.style.height = height+ typeof height=="number"?"px":"";
        }
    }
    cell.getContent = function(){return this.innerHTML.toString();}

    cell.alignCell = function(horizontal, vertical){
            if(horizontal)
                this.align = horizontal;
            if(vertical)
                this.vAlign = vertical;
    }

    cell.style.emptyCells = "show";

    cell.addChild =
        function(child,handle){
       
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
    return cell;
}

/**
 * rows, columns, width, height
 **/
var SRTable = function(rows,columns,width,height) {
    // creates a <table> element and a <tbody> element
    this.tableElement = document.createElement("table");
    this.table = this.tableElement;
	
	
    _SRSetUndragable(this.tableElement);
    this.tableElement.style.borderCollapse = "collapse";
    this.tableElement.style.emptyCells = "show";
    this.tableElement.style.tableLayout = "fixed";
      
        this.rowElementArr = new Array;
        this.tableElement.style.zIndex = 1;
        this.renderPayne = SRLayout.getDiv(width,height);
        this.renderPayne.style.position = "absolute";
        this.renderPayne.style.overflow = "hidden";

        // preserves the width of the columns for restore after clear.
        this.columnWidth = {};

        this.tableElement.setAttribute("width","100%");
        this.tableElement.setAttribute("height","100%");
        this.tableElement.border = "0px";
        this.tableElement.cellSpacing = 0;
        this.tableElement.cellPadding = 0;
       
        this.tableBody = document.createElement("tbody");
        this.tableBody.style.zIndex =1;
        this.tableBody.style.borderCollapse = "collapse";
        this.tableBody.style.emptyCells = "show";

        this.gridArr = new Array;
        
        rows = rows || 1;
        columns = columns || 1;
        // creating all cells
        for (var r = 0; r < rows; r++) {
        this.gridArr[r] = new Array;
            var row = document.createElement("tr");
            
            for (var c = 0; c < columns; c++) {
                var cell = SRTableCell();
                cell.row = row;
                this.gridArr[r].push(cell);
                row.appendChild(cell);
            }

            // add the row to the end of the table body
            this.tableBody.appendChild(row);
            this.rowElementArr.push(row);
        }
        this.tableElement.appendChild(this.tableBody);
        this.renderPayne.setChildren(this.tableElement,"table");

        return this;
    }

    /**
     *Removes all rows in this table, the columns will remain set. Used for lists and such.
     *
     * the callback if supplied will be called after the operation. In some cases, with large tables it may take longer to
     * safly dump all rows and race conditions can occur. It's best to step in with the call back function.
     */
    SRTable.prototype.clearRows = function(callback){
        if(callback && typeof callback != "function") throw "SRTable.clearRows was passed a callback that is not a function";
        while(this.removeRow()){_SRDebug.out("drop row.. ");}

        if(callback)
            callback();
    }

    /**
     * Since dropping a table is an operation thats often done before writing to it, a callback is used
     * to execute the write after the tables discard.
     */
    SRTable.prototype.clearAll = function(callback){
        // wipes the table of all rows and columns
        this.gridArr = new Array;
        _SRClearElement(this.tableBody); 

        var rows = 1;
        var columns = 1;
        // creating all cells
        for (var r = 0; r < rows; r++) {
        this.gridArr[r] = new Array;
            var row = document.createElement("tr");

            for (var c = 0; c < columns; c++) {
                var cell = SRTableCell();
                cell.row = row;
                this.gridArr[r].push(cell);
                row.appendChild(cell);
            }

            // add the row to the end of the table body
            this.tableBody.appendChild(row);
            this.rowElementArr.push(row);
        }
        
       if(callback) callback();
    }
    
    SRTable.prototype.widgetName = "table";
    SRTable.prototype.setTableSize = function(width,height){
        this.tableElement.setAttribute("width", width+"px");
        this.tableElement.setAttribute("height", height+"px");
        this.renderPayne.setSize(width, height);
    }

    SRTable.prototype.getColumnCount=function(){
        var count = 0;
        if(this.gridArr[0] && this.gridArr[0].length)
            count = this.gridArr[0].length;
        
        return count;
    }

    SRTable.prototype.getRowCount=function(){
        var count = 0;
        if(this.gridArr && this.gridArr.length)
            count = this.gridArr.length;
        
        return count;
    }

    SRTable.prototype.setCellSpacing = function(value){
      this.tableElement.cellSpacing = value+"px";
    }
    SRTable.prototype.setCellPadding = function(value){
      this.tableElement.cellPadding = value+"px";
    }
    /**
     * useage: getCell(1,1) : fetches the first row of the first column.
     *
     *  In short this starts at 1 not 0.
     */
    SRTable.prototype.getCell = function(row,column){
	  	var rc = this.getRowCount();
		var cc = this.getColumnCount();
		if(rc >= row){
			if(cc >= column)
				return this.gridArr[row -1][column -1];
			else
				 throw "Table has no cell at row:"+row+" column:"+column;
			
		}else 
			throw "Table has no row:"+row;
			
    }
    
    SRTable.prototype.addToCell = function(row,column,elm){
		this.getCell(row,column).addChild(elm);
	}
    /**
     * returns an array containing the specified columns nodes
     */
    SRTable.prototype.getColumn = function(column){
      var retArr = new Array;
      for(var i=0; i<this.gridArr.length; i++){
          if(this.gridArr[i] && this.gridArr[i][column-1])
             retArr.push(this.gridArr[i][column-1]);
      }
      
      return retArr;
    }


    /**
     * returns an array of the cells in a given row.
     */
    SRTable.prototype.getRow = function(row){
      var retArr = new Array;
   // deleted rows are denoted with null
      if(this.gridArr[row -1] != null)
          for(var i=0; i<this.gridArr[row -1].length; i++){
            
              if(this.gridArr[row -1] && this.gridArr[row -1][i])
                retArr.push(this.gridArr[row -1][i]);
          }
          return retArr;
    }

    /**
     * returns an array of row data. if row is ommited the last row is returned
     */
    SRTable.prototype.getRowData = function(row){
        var nrow = this.getRow(row);
        var retArr = new Array;
        for(var i=0; i<nrow.length; i++){
            retArr.push(nrow[i].innerHTML);
        }
        return retArr;
    }

    /**
     * Adds a column to the end of the table
     **/
    SRTable.prototype.addColumn = function(){
        
        for (var r = 0; r < this.gridArr.length; r++) {
              _SRDebug.out("new Column.. r="+r);
             var row = this.gridArr[r][0].row;
             var cell = SRTableCell();
             this.gridArr[r].push(cell);
             row.appendChild(cell);
            }

            if(this.isHighlighted){
                this.highlightCells();
            }
           
           return this.getColumn(this.getColumnCount());
    }


    /**
     * Removes row specified or the last row of the array, as will all table operations, we start at 1 not 0.
     *
     * returns false if unable to remove the row does not exist. This allows you to
     * do things like this
     * while(myTbl.removeRow())
     */
    SRTable.prototype.removeRow = function(row){

        if(!row) row = this.gridArr.length;
        
        if(row > 1){
        _SRRemoveElement(this.rowElementArr[row-1]);
        this.gridArr.splice(row-1,1);
        this.rowElementArr.splice(row-1,1);
        }else{
           //the last row holds the column data, so we delete contents only
           for(var i=0; i<this.gridArr[0].length; i++)
                this.gridArr[0][i].innerHTML = "";
            
           return false;
        }
       
            return true;
    }

/**
 *Adds one row and returns that row.
 */
 SRTable.prototype.addRow = function(height){
  
   var row = document.createElement("tr");
   
   if(height) row.style.height = typeof height=="string"?height:height+"px";

   var r = this.getRowCount();
   this.gridArr[r] = (new Array);
        for (var c = 0; c < this.getColumnCount(); c++) {
             var cell = SRTableCell();
                cell.row = row;
           
                this.gridArr[r].push(cell);
                row.appendChild(cell);

        }
        // add the row to the end of the table body
            this.tableBody.appendChild(row);

            if(this.isHighlighted)
                this.highlightCells();

       this.rowElementArr.push(row);
      
       return this.getRow(r);
 }

    SRTable.prototype.setRowAlignment = function(row, horizontal, vertical){
        var rarr = this.getRow(row);
        for(var i=0; i<rarr.length; i++){
            if(horizontal)
                rarr[i].align=horizontal;

            if(vertical)
                rarr[i].vAlign = vertical;

        }
    }

    SRTable.prototype.setColumnAlignment = function(col, horizontal, vertical){
        var carr = this.getColumn(col);
        for(var i=0; i<carr.length; i++){
            if(horizontal)
                carr[i].align=horizontal;
            
            if(vertical)
                carr[i].vAlign = vertical;
        }
    }

    SRTable.prototype.setAlignment = function(horizontal, vertical){
        for(var r=0; r<this.gridArr.length; r++){
            this.setRowAlignment(r+1, horizontal,vertical);
        }

    }

    SRTable.prototype.setColumnWidth = function(column, width){
    this.columnWidth.column = width;
    
        var cols = this.getColumn(column);
         for(var i=0; i<cols.length; i++){
            cols[i].setSize(width);
            cols[i].setAttribute("width", width);
        }
    }

    SRTable.prototype.setRowHeight = function(row, height){
       // preservs the last entered height as the standard.
       this.rowHeight = height;

       var nrow = this.gridArr;

         if(typeof row == "number")
            nrow = this.getRow(row);


         for(var i=0; i<nrow.length; i++){

            if(nrow[i].push)
                for(var c=0; c<nrow[i].length; c++){
                  nrow[i][c].setSize(false,height);
                  nrow[i][c].setAttribute("height", height);
                }
            else{
                nrow[i].setSize(false,height);
                nrow[i].setAttribute("height", height);
            }
            
         }
    }

//////////////////////// layout routines \\\\\\\\\\\\\\\\\\\\\
    SRTable.prototype.setSize = function(width, height){
      this.setHeight(height);
      this.setWidth(width);
    }

    SRTable.prototype.setHeight = function(height){
      this.height = height;
      this.renderPayne.style.height = height+typeof width=="number"?"px":"";
    }

    SRTable.prototype.setWidth = function(width){
      this.width = width;
      this.renderPayne.style.width = width+typeof width=="number"?"px":"";
    }

    /**
     * Highlights cells on mouseover, to register a callback simply add: onHighlight and onLowlight methods
     * to this objects implimentation.
     */
    
    SRTable.prototype.highlightCells = function(hoverSchema){
        
        if(hoverSchema == false){
            for(var r=0; r<this.gridArr.length; r++)
                 for(var c=0; c<this.gridArr[r].length; c++){
                     this.gridArr[r][c].onmouseover = null;
                     this.gridArr[r][c].onmouseout = null;
                 }
           this.isHighlighted = false;
           return true;
        }

        if(typeof hoverSchema == "string"){
           if(theme.schema[hoverSchema]){
              hoverSchema = theme.schema[hoverSchema];
              
            }
           else
              if(typeof hoverSchema == "object" && hoverSchema.base)
                hoverSchema = hoverSchema;
                else
                    throw "SRTable.highlightCells: invalid schema object"
        }

        

      
       if(!hoverSchema || hoverSchema.base == null){
          hoverSchema = this.hoverSchema || theme.schema.primary;
       }else{
           this.hoverSchema = hoverSchema
       }

        this.isHighlighted = true;

        var _parent = this;
       
             for(var r=0; r<this.gridArr.length; r++)
                 for(var c=0; c<this.gridArr[r].length; c++){
                   var cell = this.gridArr[r][c];
                   var revertColor = cell.style.backgroundColor;
                   var revertFontColor = cell.style.color;
               
                   cell.onmouseover = function(){
                      if(!this.suspendHover){
                         this.style.backgroundColor = hoverSchema.base;
                         this.style.color = "#"+hoverSchema.font.color;
                        
                         if(_parent.onHighlight){
                             _parent.onHighlight(this);
                         }


                       }
                    }

                   cell.onmouseout = function(){
                       if(!this.suspendHover){
                           this.style.backgroundColor = revertColor;
                           this.style.color = revertFontColor;
                          
                           
                           if(_parent.onLowlight)
                             _parent.onLowlight(this);

                       }
                    }
                     
              }
    }

