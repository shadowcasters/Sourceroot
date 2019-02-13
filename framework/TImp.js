/* 
 * The imps library is based on the media kernel concept outlined
 * in the tofui documentation.
 *
 */

var TImpLib = function(){

//////////

   this.decipher = function(cipherTree){
        var rows = cipherTree.get("grid.rows");
        var cols = cipherTree.get("grid.columns");
        var fWidth = cipherTree.get("size.width");
        var fHeight = cipherTree.get("size.height");
        
        var tbl = getTable(rows,cols,true);
        tbl.style.width = (fWidth*cols)+"px";
        tbl.style.height = (fHeight*rows)+"px";

        var aptr =0;
        for(var r=0; r<rows; r++){
        
          for(var c=0; c<cols; c++){
                    // I man cmap[r][c] TO it's position in the array if the first blocks offset is 0,0 and the val is 0,60 the
                    // I make the
                var cell = tbl.getCell(r,c);
                var nOs = cmap[aptr];
                var x = nOs*bWidth;
                var y = r*bHeight;
                var oset = [x,y];
                var bg = getCellBG(oset);

                cell.style.background = bg;
                aptr++;
              
          }
        }
        return new ImageData
    }

}();
