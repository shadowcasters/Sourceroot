
/* 
 * demo calculator.
 */

var WebBrowser = function(){

var win = new Window({width:550,height:500,titleText:"Web Browser", icon:"globalSettings"});
   win.setPosition(100,75);
    win.setUserResizable(true);
    win.setMaximizable(true);
    win.setMenuBar(true);
    win.setLayout(new AbsoluteLay);
    
  function getAbout(){
      var about = new Panel({width:100,height:89});
      about.setEffects(true);
      var rich = new Icon("Richard");
      about.mainPanel.addChild(rich);
      about.setAbsolutePosition();
      about.setPosition(200,200);

      setTimeout(function(){
          
          about.effects.onAfter.fadeOut = function(){about.destroy();}
          about.effects.fadeOut();

      }, 3000);

      return about;
}


    var fMenu = win.menuBar.addMenu("File");
    fMenu.addItem("About", "face.monkey", function(){
        rootPayne.addChild(getAbout());
    });

    fMenu.insertBreak();
    fMenu.addItem("Exit", "system.exit", function(){win.close();});

    fMenu.setWidth(90);
   

    win.layout.setRowHeight(1, 60);
    win.layout.setHorizontalAlignment();
    win.layout.setVerticalAlignment();
    
    var bField = new BrowserPanel();
   
    win.layout.addChild(bfield,1,1);
   
      
    return webBrowser;
}
