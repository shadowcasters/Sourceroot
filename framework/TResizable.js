

////////////////////////////////////////RESIZEABLE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Low level drag functionality, Accepts TImage, or any div HTMLElement. handles resizing windows
////////////////////////////////////
var TResizable = function(target,handle, blockVertical, blockHorizontal){
     if(!target || !handle)
          throw ("In order to make an element resizeable you must sepcify both target and handle. \n\
                  ResizeHandler.setResizeable(<target>,<handle>);. \n\
                  The target must also have a resize(width,Height) method");

     if(!handle.widget)
        handle.widget={}
    
     handle.widget.onDrag = function(coord){

        var width = coord.x + handle.width;
        var height = coord.y + handle.height;
        
        if(target.sLayer){
            if(blockVertical)
                target.sLayer.setWidth(width);
            else if(blockHorizontal)
                target.sLayer.setHeight(height);
            else
                target.sLayer.setSize(width,height);
        }else{
            if(blockVertical)
               target.setWidth(width);
            else if(blockHorizontal)
                target.setHeight(height);
            else
                target.setSize(width,height);

        }
     }

     this.resizer = new TDraggable(handle,handle,blockVertical,blockHorizontal);
     if(handle.widget.onStopDrag)
           handle.widget.oldOnStopDrag = handle.widget.onStopDrag;
      if(handle.widget.onStartDrag)
           handle.widget.oldOnStartDrag = handle.widget.onStartDrag;
 
      handle.widget.onStopDrag = function(){
       if(handle.widget.oldOnStopDrag)
           handle.widget.oldOnStopDrag();

       if(target.restoreIndex)
          target.style.zIndex = target.restoreIndex;
        

        if(target.widget && target.widget.onAfterResize){
            target.widget.onAfterResize();
        }

        if(target.resize && target.sLayer)
          target.resize(target.sLayer.width,target.sLayer.height);
        
        if(target.parent && target.parent.resize && target.sLayer){
            target.parent.resize(target.sLayer.width+3,target.sLayer.height+3);
        }

       if(target.restoreOverflow)
            target.style.overflow = target.restoreOverflow;

           if(target.sLayer){
              target.sLayer.setVisible(false);
           }
        }


           handle.widget.onStartDrag = function(c){
           if(target.onBeforeResize)
              target.onBeforeResize();
           if(handle.widget.oldOnStartDrag)
              handle.widget.oldOnStartDrag();
           }


}


