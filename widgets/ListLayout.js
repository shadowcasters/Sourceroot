
/**
 * defaults:
 *
 * columns = 1;
 * rowHeight = 20;
 * width = 100%
 * height = dynamic, rowheight * items / rows
 * 
 */
function ListLayout(columns,rowHeight,width){

    this.columns = columns || 1;
    this.rowHeight = rowHeight || 25;
    width = width || "100%";
    
    this.renderPayne = this.table.renderPayne;
    this.table.renderPayne.style.height="";
    this.table.renderPayne.height="";
    return this;
}


ListLayout.prototype.setFontObject = function(fontObject){
    this.table.tableBody.style.fontFamily = fontObject.family;
    this.table.tableBody.style.fontSize = fontObject.size+"px";
    this.table.tableBody.style.color = "#"+fontObject.color;
}

/**
 * Adds one row for each, element. If the element is an object, or another array
 * a column will be created for each element of the nested object. In the event
 * that the number of fields vary in this object/array, the column count will be that of the longest
 * nested object.
 *
 * If you specify a number of columns the nested data will be placed from left to right
 * and any data that dosnt fit will be discarded.
 *
 * If you wanted a list with name, department and where are they now...
 * ex:  [["Bob","Accounting","Meeting with the Bobs"],["Frank","IT","Server Room"],["Yolanda","HR","In Office"]]
 *
 * pretty simple .. but wait!! Arrays can be changed and the value in the table is also changed. But its not reflected
 * untill you call the flush() mthod on this layout.
 */
ListLayout.prototype.importDataSet = function(dataArray){
    if(dataArray && dataArray.splice){
        alert("importDataSet is not yet implemented.");
    }    
    return this;
}

/**
 * Sets column width....
 */
ListLayout.prototype.setColumnWidth = function(column, width){
    this.table.setColumnWidth(column, width);
}

/**
 * Parameters: callback is a function which executed at the end of the list clearing.
 */
ListLayout.prototype.clearList = function(callback){
    this.table.clearRows(callback);
}

/**
 * If you wanted to add a row with name, department and "where are they now"...
 * ex:  ["Bob","Accounting","Meeting with the Bobs"]
 *
 * if you wanted to add a widget you would make that the content of the element.
 */
ListLayout.prototype.addRow = function(rowArr){

    if(rowArr.splice){
        // I hate using a while loop anywhere .. they should be abolished.
        while(this.table.getColumnCount() < rowArr.length){
            this.table.addColumn();
        }
      
        var row = this.table.addRow(this.rowHeight);
         
        for(var i=0; i<rowArr.length; i++){
           row[i].addChild(rowArr[i]);
        }

    }else{
        throw" Data Array is not an array: "+rowArr;
    }
}




