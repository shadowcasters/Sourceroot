

/* 
 * This is an application that lets you monitor your connection to the server and
 * tweak variables.
 */

var connectionSettings = function(){
    var win = new Window({width:300,height:300,titleText:"Network Information", icon:"globalSettings"});

// Menu Bar..
    win.setMenuBar(true);
    var fMenu = win.menuBar.addMenu("File");
    fMenu.addItem("Search History", "system.search", function(){alert("Weeeell, it all started about 14.7 billion years ago");});
    var smen = fMenu.addSubMenu("Sub Menu", "face.smile");
    smen.addItem("subMenu option 1","face.wink");
    smen.addItem("subMenu option 2");

    smen.insertBreak();
    smen.addItem("subMenu option 3","face.glasses");
    smen.addItem("subMenu option 4","system.search");

    fMenu.insertBreak();
    fMenu.addItem("Add 32X32 pixel MenuItem","system.new",
    function(){
        TB.insertBreak();
        TB.addMenuItem(new MenuItem({icon:"gear"}));
    });

    var fMenu2 = win.menuBar.addMenu("About");
    fMenu2.addItem("ok then");
    fMenu2.addItem("ok then");

    var fMenu3 = win.menuBar.addMenu("Window");
    fMenu3.addItem("ok then");
    fMenu3.addItem("ok then");

   var ani = new Sprite("spinner");
   var connectedIco = new Icon("medium.network.connected");
   var disconnectedIco = new Icon("medium.network.disconnected");

   ani.setRestImage(disconnectedIco,true);
   
   win.setStatus("Not Connected",ani);

    var TB = win.setToolBar(true);
    TB.setHighlight();

    var tbt = TB.addMenuItem(new MenuItem({icon:"medium.network.cycle", caption:"Cycle network connection", menuPanel:new MenuPanel()}));

    tbt.menuPanel.addItem("ToolBar 1","face.wink");
    tbt.menuPanel.addItem("ToolBar Menu option 2");
    tbt.menuPanel.insertBreak();
    tbt.menuPanel.addItem("ToolBar Menu option 3","face.glasses");

    // do it all in one line, like this
    var connBtn = TB.addMenuItem(new MenuItem({icon:"medium.network.online",text:"Connect"}));
    connBtn.setAction(function(){

      if(ani.restImage === disconnectedIco)
        win.statusBar.setText("Connecting...");
      else
        win.statusBar.setText("Disconnecting...");

      ani.onStop = function(){

          if(ani.restImage === disconnectedIco){
             ani.setRestImage(connectedIco, true);
             win.statusBar.setText("Connected");
             connBtn.setIcon("medium.network.offline");
             connBtn.setText("Disconnect");
          }else{
             ani.setRestImage(disconnectedIco, true);
             win.statusBar.setText("Disconnected");
             connBtn.setIcon("medium.network.online");
             connBtn.setText("Connect"); 
          }

      }
      ani.doStart(90,3);
    });

    // have a menuItem that you manipulate before adding it like this.
    var ntest = new MenuItem({icon:"medium.network.clientServer", text:"Network"});
    ntest.setMenuPanel();
    ntest.menuPanel.addItem("ToolBar 1","face.wink");
    ntest.menuPanel.addItem("ToolBar Menu option 2");
    ntest.menuPanel.insertBreak();
    ntest.menuPanel.addItem("ToolBar Menu option 3","face.glasses");
    TB.addMenuItem(ntest);

    return win;

}

