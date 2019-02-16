
/* 
 * A window that lets users set options of that window.
 * 
 */

function widgetMaker(){
 
    var win = new Window();
    win.setSize(490,520);
    win.setTitle("Widget Demo", "system.tools");
    win.setClosable(true);
    win.setDragable(true);
    win.setUserResizable(true);
   
    var tp = new TabPanel();
    win.addChild(tp);

    var selPan = tp.addTab("Selectors", "face.monkey");
   




    var lbPan = new Panel({width:129,height:120,schema:"light", scrollable:true});
    lbPan.setPosition(5,5);
    
    var lb = new ListBox();
    lb.addItem("Smile", 1, "face.smile");
    lb.addItem("Glasses", "option 2", "face.glasses");
    lb.addItem("Devilish", "option 3", "face.devilish");
    lb.addItem("wink", "option 4", "face.wink");
    lb.addItem("monkey", "option 5", "face.monkey");
    
    lb.setVisibleItems(5);
    lbPan.addChild(lb);
    selPan.addChild(lbPan);
    
    var sblabel = new Label("Select a fruit");
    sblabel.setPosition(5, 142);
    sblabel.renderPayne.style.position = "absolute";
    selPan.addChild(sblabel);

    var selectBoxDemo = new SelectBox();
    selectBoxDemo.addItem("An Apple", 1,"fruit.apple");
    selectBoxDemo.addItem("Some Grapes", 2,"fruit.grape");
    selectBoxDemo.addItem("A Lemon", 3,"fruit.lemon");
    selectBoxDemo.addItem("Bananas (thanks Gwen Stefani)", 4,"fruit.bannana");
    selectBoxDemo.addItem("An Orange", 4,"fruit.orange");
    selectBoxDemo.addItem("Honey Dew", 5,"fruit.mellon");

    selectBoxDemo.setPosition(5,160);
    selPan.addChild(selectBoxDemo);
    var gPanel = new GroupPanel(200,145,"Favorite Composers");
    gPanel.setTitle("Hiiidy ho!", "face.smile");
    var sb1 =  new CheckBox("Johann Sebastian Bach");
    sb1.setPosition(1,1);
    var sb2 =  new CheckBox("George Gershwin");
    sb2.setPosition(1,5);
    var sb3 =  new CheckBox("Wolfgang Amadeus Mozart");
    sb3.setPosition(1,10);
    var sb4 =  new CheckBox("Ludwig van Beethoven");
    sb4.setPosition(1,15);
    var sb5 =  new CheckBox("Nikolai Rimsky-Korsakov");
    sb5.setPosition(1,20);
    var sb6 =  new CheckBox("Sam Beam");
    sb6.setPosition(1,25);

    gPanel.addChild(sb1);
    gPanel.addChild(sb2);
    gPanel.addChild(sb3);
    gPanel.addChild(sb4);
    gPanel.addChild(sb5);
    gPanel.addChild(sb6);
//////////////////////////////////////
    gPanel.setPosition(5,270);
    selPan.addChild(gPanel);

////////// Set up a radio group \\\\\\\\\\\
    var gPanel2 = new GroupPanel(230,145,"Your favorite instrument family");
    var rs = new RadioSelect();

    rs.addOption("The Woodwind family, obviously", "woodwond");
    rs.addOption("I'm partial to Brass personally", "brass");
    rs.addOption("What's better than percussion?", "percussion");
    rs.addOption("Music was made to be electronic", "digital");
    rs.addOption("Elegant code is a symphony", "code");
    rs.addOption("I like the String family (char[ ]?)", "string");

    rs.setPosition(1,1);
    gPanel2.addChild(rs);
////////////////////////////////////////////

    gPanel2.setPosition(221,270);
    selPan.addChild(gPanel2);

//////////////////////////////////////////////

    var STLabel = new Label("Select a vehicle");
    STLabel.renderPayne.setAbsolute();
    STLabel.setPosition(180,2);
    selPan.addChild(STLabel);



    var sTree = new SelectTree();
    sTree.setSize(250,400);
    sTree.setPosition(180,20);


   var fordB = sTree.addBranch("Ford",getAppImage("ford"),true);
        var fordCars = fordB.addBranch("Cars");
            fordCars.addItem("Escape");
            fordCars.addItem("Taurus");
            fordCars.addItem("Fusion");
        var fordTrucks = fordB.addBranch("Trucks");
            fordTrucks.addItem("F-150");
            fordTrucks.addItem("F-250");
            fordTrucks.addItem("F-350 Super Duty",1,null,function(){alert("At 12 MPG you had better reeeaaallllly need one.");});
            fordTrucks.addItem("Ranger");


  var teslaB = sTree.addBranch("Tesla",getAppImage("tesla"));
        teslaB.addItem("Roadster");
        teslaB.addItem("Cruiser");
        teslaB.addItem("S-Series",1,null,function(){alert("In 2011");});

    var GMB = sTree.addBranch("General Motors",getAppImage("GM"));
    var GMCars = GMB.addBranch("Cars");
            GMCars.addItem("Malibu");
            GMCars.addItem("Equinox");
            GMCars.addItem("Cavalier");
    var GMTrucks = GMB.addBranch("Trucks");
            GMTrucks.addItem("Taho");
            GMTrucks.addItem("Siearra");
            GMTrucks.addItem("Canyon");
            GMTrucks.addItem("Denali");

    sTree.addItem("Nike",1,getAppImage("nike"),function(){alert("GOOD for you... and good FOR you!");});

    selPan.addChild(sTree);

///////////////////////////////////////////////////////////////////////////////////////
// -------------------------[ THE DATA WIDGET PANEL. ]-------------------------------//
///////////////////////////////////////////////////////////////////////////////////////
     var dataPan = tp.addTab("Imps Demo", "system.import");


     //dataPan.addChild(dataMenu);


    return win;

}

