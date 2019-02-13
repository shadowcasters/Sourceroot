/*
 * This file, the index.js is loaded after everything else defined in the init scrpt is loaded.
 * from here, any @inject is loaded inline.
 * ******************************************************************************
 *
 * windows Tests
 * 1. create a window with no settings: ---> PASS
 *  1.2. 0:add dragable: IE:PASS .. FF:PASS .. CHROME:PASS
 *  1.3. add resizable: IE:PASS .. FF:PASS .. CHROME:PASS
 *  1.4. add closable: IE:PASS .. FF:PASS .. CHROME:PASS
 *  1.5. add MenuBar: IE:PASS .. FF:PASS .. CHROME:PASS
 *  1.5. set scroll: IE:PASS .. FF:PASS .. CHROME:PASS
 *  1.6. set boundries:
 *  1.6. post status text:
 *  1.6. post status Icon:
 *  1.7. post title text:
 *  1.8. change title Icon:
 *  1.9. pass icon object && string
 *  2.0. setwindow onto render payne before repeating all above tests...
 *  final: dock,undock,close,move: PASS
 *
 *
 * Panel Tests
 * 1. create with no settings: -->PASS
 *
 */

// Loads modules base dir is always relative.
@inject("calculator.js");
@inject("widgetMaker.js");
@inject("chatClient.js");
@inject("connectionSettings.js");
@inject("panelTesting.js");

function initRenderPayne(){
 var p = new Panel({width:800,height:700,schema:"primary",asContainer:true});
 p.setPosition(20,20);


 var p2 = new TextPanel({width:400,height:400,schema:"light"});
 p2.setPosition(40,40);

 p2.setWordWrap(true);
 p2.doWriteln("This is text. This is text. This is text. This is text. This is text. This is text. This is text. This is text.This is text.");
 p2.setFont("stone");
 p2.setLeftMargin(35);
p2.font.setSize(18);
 p.addChild(p2);


 //
 //var tb1 = new TextField();

// tb1.setPosition(20,20);
// tb1.setWidth(150);
//  p.addChild(tb1);
 rootPayne.addChild(p);

// var tp1 = new TextPanel();
// var tp1 = new TextAreaInput({left:10,top:10,width:200,height:200,schema:"stone",asContainer:true});
// tp1.setPosition(20,20);
// p2.addChild(tp1);

//var dockBar = new DockingBar();
//dockBar.setFloating(true);
//dockBar.setDragBoundries();
//dockBar.setResizable(true);
//dockBar.setExpandable(true);
//p.addChild(dockBar);
//
//dockBar.addItem("gear", "General Widget Demo", function(){p.addChild(new widgetMaker());});
//dockBar.addItem("netconfig", "Connection Monitor",function(){p.addChild(connectionSettings());});
//dockBar.addItem("calc", "A simple clientside calculator", function(){p.addChild(new calculator());});
//dockBar.addItem("chat.node", "A Tofui chat client",function(){
//    var ccWindow = new chatClient().window;
//    p.addChild(ccWindow);
//    ccWindow.setPosition(100,75);
//});
//dockBar.addItem("medium.id", "Panel Testing", function(){p.addChild(panelTesting());});
//dockBar.addItem("medium.windowsearch", "window Testing", function(){p.addChild(windowTesting());});

}
// loads the root..
initRenderPayne();

////////// SoyCloud initialization stuff \\\\\\\\\\\\
// note, this only pertains to one service. The adapter script needs to be modified
// to support multiple services, then this should go into the SoyAdapter kernel.
//////////////////////////////////////////////////////
//function _registerMyListeners(){
//   ChatServiceDemo.onError = function(m){
//          alert("Error: "+SoyClient.getJsonString(m));
//   }
//
//   ChatServiceDemo.onNotify = function(evt, payload){
//        if(chatController && chatController.UIObject){
//                 if(evt == "TERMINATE_SESSION"){
//                     showLoginScreen(false);
//                     chatController.UIObject.clear();
//                     chatController.UIObject.postMessage(payload);
//                 }
//
//                if(evt == "WARN_SESSION"){
//                        chatController.UIObject.postMessage("*** 30 seconds until inactivity timeout!");
//                }
//
//                if(evt == "CHANNEL_ALLREADY_SUBSCRIBED"){
//                    chatController.welcome();
//                }
//        }
//    }
//
//   ChatServiceDemo.onSuccess = function(evt, payload){
//
//     if(chatController && chatController.UIObject){
//            if(evt == "CHANNEL_UNSUBSCRIBED"){
//                chatController.UIObject.clear();
//                showLoginScreen(true);
//            }
//
//            if(evt == "CHANNEL_SUBSCRIBED"){
//                chatController.setHandle(payload);
//                chatController.welcome();
//            }
//
//            if(evt == "CHANNEL_REJOINED"){
//                chatController.setHandle(payload.handle);
//                chatController.who(payload.users);
//            }
//     }
//   }
//}

//_OAK.onLoad = function(){
//   var delay = setInterval(
//    function(){
//       _registerMyListeners();
//      if(SoyRouter.Adapter){
//	    if(SoyClient.isAuthenticated){
//                SoyClient.connection.open();
//            }else{
//                ChatServiceDemo.authenticate();
//            }
//
//            clearInterval(delay);
//	}
//    },500,500);
//}

////This should be called after the script is loaded, also SoyClient should be the namespace
//_OAK.initKernel();
