
/*
 * This library allows execution of tasks
 * in sequence, detatched from the main thread (non-blocking) and/or registed to run at specific intervals/event/number of times.
 * if this library is injected into the script then it begins running imediatly. From that point
 * we simply define the tasks and their specifications.
 */
var TThread = (function(){
    var maxThreads = 3;
    var processTimeout = 3000; // if a process is running longer than this time, it's discarded for the good of the pool. If this is zero there is no timeout.
    var latencyThreshold = 100; // if it takes this long to re-sync a cycle, it's time to open another thread
    var tasksPerThread = 15; // only used when delegation is not auto
    /**
     * the second parameter is only valid if delegation is not auto
     */
    this.setThreadPool = function(numThreads,numTasksPerThread){
        if(numThreads){
           maxThreads = numThreads;
           if(tPool.length < numThreads)
               for(var i=tPool.length; i<=numThreads; i++)
                   tPool.push(new sdaemon());
           else{

           var t = tPool.splice(numThreads,tPool.length);
           while(t.length>0){
               t.pop().finalize();
            }
           }
        }

        if(numTasksPerThread)
            tasksPerThread = numTasksPerThread;
   }



    /**
     *  Schedual Daemon. AKA Managed Worker Thread
     */
    var sdaemon =  function(speed){
        this.tasks = [];
        ///// Task execution stats \\\\\
        this.interval = speed || 10;
        this.average = 0;
        this.total = 0;
        this.longest = 0;
        this.rTime = 0;
        ////////////////////////////////
        this.isAccepting = true; // Used by the thread manager to identify a thread that has become unresponsive.
        this.status = "idle";
        this.id = _SRGetRandomKey(20);
    }
    sdaemon.prototype.threadRunner = function(f){
         if(f.terminate){
            _SRDebug.out("is terminal");
           return false;
         }
         this.rTime = new Date().valueOf();
         if(this.rTime >= f.startTime){
          
          if((this.rTime-f.startTime) > this.interval){
              f._WThreadLatency = (this.rTime-f.startTime)-this.interval; // subtracting the interval allows for the defined latency of this worker thread
          }
          
                  f.action();

               // if f.condition is 0 we loop into perpetuity.
               if(f.condition && typeof f.condition === "number" && (f.condition -1) <= 0){
                  f.condition --;

                  return false;
               }else
               if(typeof f.condition === "function"){
                 if(!f.condition()){
                     return false;
                 }else{
                     return false;
                 }
              }
             
              
            
              f.startTime=new Date().valueOf();
              var et = isNaN(f.startTime - this.rTime )?1:(f.startTime - this.rTime);
              f._WThreadRunTimeTotal += et;
              f._WThreadRunTimeLog.push(et);
              f._WThreadRunTime = Math.round((f._WThreadRunTime+et)/f._WThreadRunTimeLog.length);
              if(et > this.longest)
                  this.longest = et;

              f.startTime+= f.interval;
              this.rTime=0;
          }
           return true;
    }
    sdaemon.prototype.finalize = function(){
        this.isAccepting = false;
        this.stop();
        // put outstanding tasks back on the queue. 
        this.tasks.length=0;
        this.tasks = null;
        cleanupQueue.push(this);
    }
    sdaemon.prototype.run = function(){
         var time=1;
         for(var sti=0; sti<this.tasks.length; sti++){
           var rec = this.tasks[sti];
           if(!rec.idle)
               if(!this.threadRunner(rec)){
                   if(rec.onTerminate)
                      rec.onTerminate();
                      cleanupQueue.push(this.tasks.splice(sti,1));
               }else{
                   if(rec._WThreadRunTimeLog.length > 0)
                    time += rec._WThreadRunTimeLog[rec._WThreadRunTimeLog.length-1];
               }
         }
         this.average = Math.round((time/(this.tasks.length || 1)));
         
         this.total=time;
         if(this.status == "running" && this.tasks.length == 0){
             this.stop();
         }
    }
    sdaemon.prototype.start = function(){
        this.average = 0;
        this.total = 0;
        this.longest = 0;
        this.isAccepting = true;
        if(!this.proc){
             if(document.all){
              var _parent = this; // circular ref?
              this.runner = function(){_parent.run();}
             }else{
               this.runner = function(v){v.run();}
             }
              this.proc = setInterval(this.runner,this.interval,this);
              this.status = "running";
        }

        return this;
    }
    sdaemon.prototype.stop= function(){
           if(this.proc)
                clearInterval(this.proc);
           
           while(this.tasks.length > 0){
               var t = this.tasks.pop();
               t._WThreadID = null;
               taskQueue.push(t);
           }
       
           this.rTime = 0;
           this.average = 0;
           this.total = 0;
           this.longest = 0;
           this.runner = null;
           this.proc = null;
           this.status = "idle";
           
           return this;
        }
    sdaemon.prototype.restart= function(){
            this.stop();
            this.start();
            return this;
        }
    sdaemon.prototype.stopTask= function(TaskID){
          for(var i=0; i<this.tasks.length; i++)
             if(this.tasks[i].id === TaskID){
                if(this.tasks[i].onTerminate)
                    this.tasks[i].onTerminate();

                cleanupQueue.push(this.tasks.splice(i,1));

                return true;
             }
              
         return false;
       }    
    sdaemon.prototype.addTask= function(func){
        if(this.isAccepting){
            func._WThreadID = ""+this.id;
            func._WThreadRunTimeTotal=0;
            func._WThreadRunTime=0;
            if(!func._WThreadRunTimeLog)
                func._WThreadRunTimeLog = [];

            func.startTime = new Date().valueOf()+func.interval;
            this.tasks.push(func);
            if(this.status == "idle"){
                this.start();
            }else
            if(func.onStart){
                func.onStart();
            }
        }

        }
        

    var taskQueue=[];
    var cleanupQueue=[];
    var tPool=[]; // keps a refrence to the daemons


    var wipe = function(arr){
     if(!arr) return;
     try{
     this.isBusy = true;
         while(arr.length > 0){
            var o = arr.pop();
            for(var p in o)
            if(typeof o[p] == "object")
              wipe(o[p]);
            else
              o[p]=null;

          o=null;
         }
      this.isBusy=false;
     }catch(e){
         arr.length=0;
         this.isBusy=false;
     }
    }
    
    
 var tdaemon = function(){
    // execute any tasks in the queue
    try{
       
     // cleanup foot prints
     if(cleanupQueue.length > 0 && !wipe.isBusy)
     wipe(cleanupQueue);
      
     if(taskQueue.length > 0){
       var st = null;
       var dtime = new Date().valueOf();
       for(var i=0; i<tPool.length; i++){
         // Check for hanging procs
         if(tPool[i].rTime > 0 && (dtime - tPool[i].rTime) >= (processTimeout?processTimeout:9999999)){
            if(!tPool[i].TimeoutSignal){
                tPool[i].restart();
            }else{
                tPool[i].finalize();
            }
         }
         
         if(tPool[i].average < latencyThreshold && tPool[i].isAccepting && tPool[i].tasks.length < tasksPerThread){
             st=tPool[i];
             i=tPool.length;
         }
       }
       
        if(st != null){
           st.addTask(taskQueue.pop());
        }
     }
       // UpdateStatus();
    }catch(e){
        alert(e.message);
    }
 }

    /**
     * this will cease execution of all daemon threads
     */
    this.stop = function(){
       while(tPool.length > 0){
          var p = tPool.pop();
              p.finalize();
          
       }
       TaskDaemon.stop();
        this.isRunning = false;
    }
    this.restart = function(){
        this.stop();
        this.start();
    }
    this.start = function(){
        for(var i=0; i<maxThreads; i++)
           tPool.push(new sdaemon());

        TaskDaemon.start();
        this.isRunning = true;
    }
    this.pause = function(){
        for(var i=0; i<tPool.length; i++)
            tPool[i].stop();
        TaskDaemon.stop();
    }
    this.resume = function(){
        for(var i=0; i<tPool.length; i++)
            tPool[i].start();
        TaskDaemon.start();
    }
    this.getWorkerThread=function(ThreadID){
        for(var i=0; i<tPool.length; i++)
            if(tPool[i].id == ThreadID)
                return tPool[i];
        
        return null;
    }

    this.removeTask=function(taskInstance){
        var taskId = taskInstance.id;
        var threadId = taskInstance._WThreadID;
        var wth = this.getWorkerThread(threadId);
        if(wth)
            return wth.stopTask(taskId);
        
        return false;
    }
    /**
     * Returns a task which is currently running.
     */
    this.getActiveTask=function(taskId){
        for(var i=0; i<tPool.length; i++)
            for(var ii=0; ii <tPool[i].tasks.length; ii++){
                if(tPool[i].tasks[ii].id == taskId)
                    return tPool[i].tasks[ii];
            }
        return null;
    }


    
    var TaskDaemon={

        start:function(){
        if(this.tdThread == null)
            this.tdThread = setInterval(tdaemon,250);
        },
        stop: function(){
          clearInterval(this.tdThread);
          this.tdThread = null;
          //updateStatus();
        },
        restart: function(){
            this.stop();
            this.start();
        }
        
    }
    
    this.addTask = function(backgroundTask){
        taskQueue.push(backgroundTask);
        
    }

    this.start();
    return this;


//function updateStatus(){
//
//}
///**
// *<p>
// * Returns a data bound object. that contains the overall health of the thread pool, as well as an
// * object that contains each thread using it's generated ID as the key.
// *
// * {workerThreads:{},workerThreadCount:0,pendingTasks:0}
// *
// * the worker thread of
// *
// * </p>
// */
//this.getStatus = function(){
//  try{
//    var ret = {workerThreads:{},workerThreadCount:0,pendingTasks:0};
//    for(var i=0; i<tPool.length; i++){
//       if(tPool[i] != null){
//
//        str+="<br> |-thread "+(i+1)+" processes:"+tPool[i].tasks.length+" status:"+tPool[i].status+" avg:"+tPool[i].average+" longest:"+tPool[i].longest+" total:"+tPool[i].total;
//        if(!tPool[i].isAccepting){
//            str = "<font color='red'>"+str+"</font>";
//        }
//
//       }else{
//           tPool.splice(i,1);
//       }
//    }
//
//  }catch(e){
//    if(this.debug)
//        this.debug(e);
//  }
//}
//
})();

TBackgroundTask.prototype.defaultProperties={
    action:null,
    interval:5,
    condition:0,
    onTerminate:null,
    onStart:null,
    idle:false
}

function TBackgroundTask(properties){
this.id = _SRGetRandomKey(47);

    if(!properties)
        properties = this.defaultProperties;

    if(typeof properties === "function")
        this.action = properties;
    else if(typeof properties === "object")
        for(var key in this.defaultProperties){
            var meth = ["set",key.charAt(0).toUpperCase(),key.substr(1)].join("");
            var val = properties[key] || this.defaultProperties[key];
            this[meth](val);
        }

    delete properties;
    properties = null;

}
TBackgroundTask.prototype.setIdle = function(bool){this.idle = bool;}
/**
 * Sets the function that will be fired at this.interval (number of milis, default is 4ms). This
 * parameter must be a function, if the action links to a component via, closure then it's automaticly severed on termination
 * 
 */
TBackgroundTask.prototype.setAction = function(func){this.action = func;}
TBackgroundTask.prototype.setInterval = function(interval){this.interval=interval;}
TBackgroundTask.prototype.setCondition = function(condition){this.condition = condition;}
TBackgroundTask.prototype.setIterations = function(iterations){this.condition = iterations;}
TBackgroundTask.prototype.setOnTerminate = function(callback){this.onTerminate=callback;}
TBackgroundTask.prototype.setOnStart = function(callback){this.onStart=callback;}
TBackgroundTask.prototype.setOnStop = function(callback){this.onStop=callback;}
TBackgroundTask.prototype.stop = function(){
    this.setIdle(true);
    if(this.onStop)
        this.onStop();
}

TBackgroundTask.prototype.start = function(){
//_SRDebug.out("OK THEN, start called isActive:");
    if(!this.isActive){
    this.isActive = true;
        if(this.interval <= 1)
           this.interval=2;

        if(!this.action)
            throw "TBackgroundTask.start() Error: no action has been difined";
        else{
            TThread.addTask(this);
        }
    }else{
        this.setIdle(false);
        if(this.onStart)
           this.onStart();
    }
}
/**
* if kill9 is true the task is imedietly stopped. Otherwise the task
* will finish gracefully upon completion of the next action.
**/
TBackgroundTask.prototype.terminateTask = function(kill9){
//   Alternative termination technique.
//   ------------------------------------
//    if(kill9){
//        if(TThread.removeTask(this))
//            _SRDebug.out("OK THEN, stop called.");
//        else
//            _SRDebug.out("NOT OK!! stop called.");
//    }
    
    if(kill9 && this._WThreadID){
      TThread.removeTask(this);
    }else{
        this.terminate=true;
    }
        
    
}

