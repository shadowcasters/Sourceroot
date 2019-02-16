var windowTesting = function(){

  var win = new Window({width:450,height:300,titleText:"Windows work just like on your desktop", icon:"face.smile"});
   win.setPosition(100,75);
    win.setUserResizable(false);
    win.setMaximizable(false);
    win.setMenuBar(true);
    win.setLayout(new GridLayout(2, 1));

var fMenu = win.menuBar.addMenu("File");
    fMenu.addItem("Just Text", null, function(){
        rootPayne.addChild(null);
    });
    fMenu.addItem("About", "face.monkey", function(){
        rootPayne.addChild(getAbout());
    });

    fMenu.insertBreak();
    fMenu.addItem("Exit", "system.exit", function(){win.close();});

    fMenu.setWidth(90);


    win.layout.setRowHeight(1, 60);
    win.layout.setHorizontalAlignment();
    win.layout.setVerticalAlignment();

return win;
}
