/*888888888888888888888888
 *Two offset functions that let us get the actual boundries and positions, relative to the
 *target components respective position in it's container.
 *88888888888888888888888
 **/

function getAbsoluteOffset(elem){
        _SRDebug.out("aoffset");
        var cel = elem
        var osx = cel.offsetLeft;
        var osy = cel.offsetTop;
        while((cel = cel.parentNode) !== document.body){
                osx += cel.offsetLeft;
                osy += cel.offsetTop;
        }
     // now I have the dragger offset
     return [osx,osy];
}
function getRelativeOffset(elem){
        _SRDebug.out("Roffset");
        var cel = elem
        var osx = cel.offsetLeft;
        var osy = cel.offsetTop;
        while(cel !== document.body){
            if(cel.style.position == "absolute" || cel.style.position == "relative" || cel.isContainer){
                return [cel.offsetLeft,cel.offsetTop];
            }
                cel = cel.parentNode;
                osx += cel.offsetLeft;
                osy += cel.offsetTop;
        }
     // now I have the dragger offset
     return [osx,osy];
}


/*****************************************************************************************
 * The draggable object, which is instanated for elements that are designated as
 * draggable. These UI componets are locked by default to their designated container.
 * 
 *****************************************************************************************/
var TDraggable = function(target,dragger, blockVertical, blockHorizontal){
    _SRDebug.out("new Draggable");
    this.id = _SRGetUniqueId();
    this.blockVertical = blockVertical;
    this.blockHorizontal = blockHorizontal;
    if(typeof target == 'string')
        this.target = document.getElementById(target);
    else
        this.target = target;

    if(dragger){
        if(typeof dragger == 'string')
            this.dragger = document.getElementById(dragger);
        else
            this.dragger = dragger;
    }
    
    else
        this.dragger = target;

    // as in, tell the browser not to drag the image that were using to delta the position
    _SRSetUndragable(this.dragger);

    // set dragger dimensions for update
    this._width = parseInt(this.target.style.width);
    this._height = parseInt(this.target.style.height);

    this.setDetached(true);
    this.start();

    return this;
}

/**
 * if true, animation of drag occurs in a seperate thread. Otherwise drag animation
 * ocupies the main thread. This option is useful if you have many things on the screen
 * that are working and updating the view. Note, this does have a slight impact on 
 * drag responsivness. 
 */
TDraggable.prototype.setDetached = function(bool){
     var _parent = this;
    if(bool){
        if(!this.tThread)
            this.tThread = new TBackgroundTask();
        
        this.tThread.onTerminate = function(){alert("I'll be back");}
        
        this.tThread.setAction(function(){
               _parent.moveTarget();
        });
    }else{
        this.tThread.terminate();
    }
}

TDraggable.prototype.start = function(){
   
    if(this.primed){
        if(this.hasOwnProperty("onStartDrag"))
            this.onStartDrag();

        if(this.target.onStartDrag){
            this.target.onStartDrag(this.target);
        }else
            if(this.target.widget && this.target.widget.onStartDrag){
                this.target.widget.onStartDrag(this.nPos);
            }

        if (!IE) document.captureEvents(Event.MOUSEMOVE);

        document.onmousemove = getMouseHook(this);
        if(this.tThread)
          this.tThread.start();

    }else
        this.loadListeners();
}

TDraggable.prototype.mousedown = function(e){
   // _SRDebug.out("MOUSE_DOWN");
    _SRSetUndragable(document.body);
    this.isDragging = true;
    var _X = 0;
    var _Y = 0;
    if (IE) { // grab the x-y pos.s if browser is IE
        _X = event.clientX + document.body.scrollLeft;
        _Y = event.clientY + document.body.scrollTop;
    }
    else {  // grab the x-y pos.s if browser is other
        _X = e.pageX;
        _Y = e.pageY;
    }

     // get offset
     var cel = getRelativeOffset(this.target);

     this.dragger.offsetx = (_X -(cel[0]) );
     this.dragger.offsety = (_Y -(cel[1]) );

     var _parent = this;
     document.onmouseup = function(e){_parent.mouseup(e);}

     this.start();
}

TDraggable.prototype.mouseup = function(e){
   
    _SRSetDragable(document.body);
    if(this.isDragging){
       this.isDragging = false;
       this.stop();
        document.onmouseup = null;
    }
}

TDraggable.prototype.finalize=function(){
    if(this.tThread)
       this.tThread.terminateTask(true);
}

TDraggable.prototype.loadListeners = function(){
this.primed = true;
this.isDragging = false;
var _parent = this;



 // respect other mouse events
 if(this.dragger.onmousedown){
   var omd = this.dragger.onmousedown;
   this.dragger.omd=omd;
   this.dragger.onmousedown = function(e){
       omd(e);
       _parent.mousedown(e);
   }
 }else
    this.dragger.onmousedown = function(e){_parent.mousedown(e);}

 // respect other mouse events
 if(this.dragger.onmouseout){
   var omo = this.dragger.onmouseout;
   this.dragger.omo=omo;
   this.dragger.onmouseout = function(e){
       omo(e);
       if(_parent.isDragging)
          _parent.reSync();
   }
 }else
    this.dragger.onmouseout = function(){_parent.reSync();}

}

TDraggable.prototype.stop = function(){
//    _SRDebug.out("stop");
   document.onmousemove = null;

   this.last_x = false;
   this.last_y = false;
   this.blockVertical=false;
   this.blockHorizontal=false;

   if(this.hasOwnProperty("onStopDrag"))
        this.onStopDrag(this.nPos);

   if(this.target.widget && this.target.widget.onStopDrag){
           this.target.widget.onStopDrag(this.nPos);
   }

    this.isDragging = false;
    if(this.tThread)
      this.tThread.stop();

}

TDraggable.prototype.setDragBoundries = function(leftX,leftY,rightX,rightY){

    this.target.dragBoundries = {top:[leftX ||0,leftY||0],bottom:[rightX||9999,rightY||9999]};
}


/***
 *  On occasion, the mouse gets ahead of the objects ability to move. Larger, more
 *  complex windows are a good example of this.
 ***/
TDraggable.prototype.reSync = function(){
    
    if(this.blockH || this.blockV){
       this.stop();
       this.isDragging = false;
    }
}

// accepts current x/y coords
TDraggable.prototype.moveTarget = function(){
if(!this.nPos) return null;
var t = this.target;
var boundry =  t.dragBoundries || false;

if(!this.blockHorizontal) 
if(boundry == false || (this.nPos.x >= boundry.top[0] && this.nPos.x <= boundry.bottom[0])){
   t.setLeft(this.nPos.x);
   this.blockH = this.nPos.x>0?false:true;
}else{
     this.blockH = true;
    // which boundry to set left or right
     if(this.nPos.x <= boundry.top[0])
          t.setLeft(boundry.top[0]);
     if(this.nPos.x >= boundry.bottom[0])
          t.setLeft(boundry.bottom[0]);
 }

if(!this.blockVertical)
if(boundry == false ||(this.nPos.y >= boundry.top[1] && this.nPos.y <= boundry.bottom[1])){
   t.setTop(this.nPos.y);
}else{
    if(this.nPos.y <= boundry.top[1])
       t.setTop(boundry.top[1]);
    if(this.nPos.y >= boundry.bottom[1])
       t.setTop(boundry.bottom[1]);
}
   if(this.target.widget && this.target.widget.onDrag){
     this.target.widget.onDrag(this.nPos);
   }
}

// calculate new position...
TDraggable.prototype.onDrag = function(coord){
   if(coord[0] >0 && coord[1] >0){
 
       var nx = coord[0]-(this.dragger.offsetx );
       var ny = coord[1]-(this.dragger.offsety );
       
       nx = nx >= 0?nx:0;
       ny = ny >= 0?ny:0;
       this.nPos = {x:nx,y:ny};
       
       if(!this.tThread)
         this.moveTarget();
   }
}

function getMouseHook(callback){
var pos=[0,0];
    var ret = function _SRMouseHook(e){
    
    if (IE) { // grab the x-y pos.s if browser is IE
        pos[0] = event.clientX + document.body.scrollLeft;
        pos[1] = event.clientY + document.body.scrollTop;
    }
    else {  // grab the x-y pos.s if browser is other
        pos[0] = e.pageX;
        pos[1] = e.pageY;
    }

    if(callback && callback.onDrag){
        callback.onDrag(pos);
    }

        return true;
    };
    
    return ret;
}

