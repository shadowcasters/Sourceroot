

/* 
 * Crates a tabpanel
 */

TabPanel.prototype = new UIWidget;
TabPanel.prototype.widgetName = "tabPanel";
TabPanel.prototype.constructor = TabPanel;
TabPanel.prototype.defaultProperties=
    {
      width:"100%",
      height:"100%",
      tabSpacing:1,
      leftMargin:6,
      topMargin:5,
      selelectTabOffsetTop:4,
      selelectTabOffsetLeft:0 // disabled
    }

function TabPanel(PropertiesObject){
   this.initWidget(PropertiesObject);
   this.layout = new GridLayout(2, 1,"100%", "100%");
   this.tabHeight = (this.theme.getImageMap("tabLeft")[2]);
   this.layout.setRowHeight(1, this.tabHeight + this.topMargin);
   this.layout.getCell(1,1).style.overflow = "hidden";
   this.renderPayne.setChildren(this.layout);
   this.tabs = new Array;
   this.nLeft = this.leftMargin;
   this.selectedTab = null;
   return this;
}


TabPanel.prototype.setTabSpacing = function(value){
    this.tabSpacing = value;
}

TabPanel.prototype.setSelelectTabOffsetTop = function(value){ this.SelelectTabOffsetTop = value; }
TabPanel.prototype.setSelelectTabOffsetLeft = function(value){ this.SelelectTabOffsetLeft = value; }

TabPanel.prototype.setTopMargin = function(value){
    this.topMargin = value;
}

TabPanel.prototype.setLeftMargin = function(value){
    this.leftMargin = value;
}

TabPanel.prototype.setTabHeight = function(height){
    this.tabHeight = height;
}

TabPanel.prototype.getTabPanel = function(index){
   var ai = index - 1;
   return this.tabs[ai].panel;
}

TabPanel.prototype.setSelected = function(index){

    var ai = index - 1;
    var stab = this.tabs[ai];
    if(stab != null && (stab !== this.selectedTab)){
        if(this.selectedTab){
            this.selectedTab.tab.setTop(this.topMargin+this.SelelectTabOffsetTop);
            this.selectedTab.tab.setHeight(this.tabHeight - this.SelelectTabOffsetTop);
            this.selectedTab.tab.mainPanel.style.zIndex = 1;
            
            if(this.selectedTab.tab.renderFilm){
              this.selectedTab.tab.renderFilm.setSuspendHover(false);
              this.selectedTab.tab.renderFilm.onmouseout();
            }
            this.layout.getCell(2,1).removeChild(this.selectedTab.panel.renderPayne);
        }
        
        this.selectedTab = this.tabs[ai];
        
        this.selectedTab.tab.setHeight(this.tabHeight);

        if(this.selectedTab.tab.renderFilm){
            this.selectedTab.tab.mainPanel.style.zIndex = 1;
            this.selectedTab.tab.renderFilm.onmouseover();
            this.selectedTab.tab.renderFilm.setSuspendHover(true);
        }
        
        this.layout.addChild(this.selectedTab.panel,2,1);
        this.selectedTab.tab.style.zIndex = 3;
        this.selectedTab.tab.setTop(this.topMargin+1);
    }

}

TabPanel.prototype.addTab = function(title, icon){

    // asemble the tab
    var Tlabel = new Label(title,icon);
    
    var tab = SRLayout.getDiv(Tlabel.getWidth()+10,this.tabHeight);
    tab.index = this.tabs.length + 1;
    tab.setAbsolute();
    tab.style.overflow = "hidden";
    tab.setLeft(this.nLeft);
    tab.setTop(this.topMargin);
    tab.addChild(this.theme.getImage("tabLeft"),"left");
    tab.addChild(this.theme.getImage("tabRight"),"right");
    var bg = SRLayout.getDiv((tab.width - (tab.left.width + tab.right.width)),this.tabHeight);
    bg.setAbsolute();
    bg.style.background = this.theme.getHorizontalStyle("background");
    tab.addChild(bg,"bg");
    bg.setLeft(tab.left.width);
    tab.left.style.position = "relative";
    setCSSFloat(tab.left, "left");
    tab.right.style.position = "relative";
    setCSSFloat(tab.right, "right");
   
    tab.addChild(SRLayout.getDiv().setAbsolute(),"mainPanel");
    tab.mainPanel.style.position = "absolute";
    tab.addChild(getRenderFilm(true),"renderFilm");
    tab.mainPanel.addChild(Tlabel,"label");
    tab.mainPanel.style.paddingTop = ((tab.height - 18) / 2)+"px";
    tab.mainPanel.style.paddingLeft = "5px";
    
    var _parent = this;
    tab.renderFilm.onclick = function(){_parent.setSelected(tab.index);}

    this.layout.addChild(tab,1,1);


    var tabPanel = new Panel();
    tabPanel.setSize();
    tabPanel.setSchema(this.schema);
    this.nLeft += tab.width + this.tabSpacing;
    
    var tObj = {tab:tab,panel:tabPanel};
    this.tabs.push(tObj);

    this.setSelected(tab.index);
  
    return tabPanel;
}

TabPanel.prototype.onInsert = function(){
    this.doRender();
}

TabPanel.prototype.doRender = function(){


//
// for(var i=0; i<this.tabs.length; i++){
//
//        var tab = this.tabs[i];
//        var tWidth = tab.width + 10;
//
//        tab.style.position="absolute";
//
//        getRenderFi
//        cell.addChild(film);
//        var ti = i+1;
//        this.layout.renderPayne.addChild(cell,["tab",i].join(""));
//        tPanel.tab.layout.getCell(2, 2).align="center";
//        tPanel.tab.layout.getCell(2, 2).vAlign="top";
//        tPanel.tab.layout.getRow(3).style.height="0px";
//        var _parent = this;
//
//        film.onclick = function(){
//           _parent.setSelectedTab(ti);
//        }
//
//  }
//
//    if(this.tabs.length > 0)
//        this.setSelectedTab(1);

}

