
/**
 * A select tree to display hierarchical options
 */

SelectTree.prototype = new ListBox;
SelectTree.prototype.widgetName = "selectTree";
SelectTree.prototype.constructor = SelectTree;
SelectTree.prototype.defaultProperties={
    itemHeight:20,
    width:130,
    visibleItems:10,
    multiSelect:false
}
function SelectTree(PropertiesObject){
     this.initWidget(PropertiesObject);
     this.init();
     this.setAbsolutePosition();
     this.setHoverEffect(false);
     this.setIconSpacing(3);
     this.subLists = new Array;
     this.mainPanel.style.overflow = "auto";
}

SelectTree.prototype.addBranch = function(label, icon){
    var sList = new SelectTree();
    
    sList.setDefaultIcon(this.defaultIcon, this.onSelectIcon);
    sList.setMultiSelect(this.multiSelect);
    var listContainer = SRLayout.getDiv("100%",this.itemHeight);
    listContainer.setStatic();
    listContainer.style.overflow = "hidden";
    listContainer.style.display = "block";
    listContainer.style.whiteSpace = "noWrap";
    
    sList.setAutoSize(true);
    sList.setRelativePosition();
    sList.setLeft(25);
    sList.renderPayne.style.display = "inline-block";
    var expIco = new ToggleIcon("expand", "contract", this.theme.imageSetData);

    setCSSFloat(expIco, "left");
    expIco.renderPayne.style.display = "block";
    sList.setBorderSize(0);
 
    var _parent = this;
    sList.label = this.addItem(label,this.subLists.length,icon || false,
    function(){
    
       if(sList.label.expanded){
            listContainer.style.height = (_parent.itemHeight)+"px";
            listContainer.style.overflow = "hidden";
            sList.renderPayne.style.overflow = "hidden";

                if(IE){
                    listContainer.setWidth(listContainer.restorWidth);
                }
            
            listContainer.setWidth(_parent.width -4);
            sList.setVisible(false);
            sList.label.expanded = false;
            // the expanded state is the down arrow..
            expIco.setActiveState(true);
            
       }else{
            sList.renderPayne.style.width = "";
            sList.renderPayne.style.height = "";
            listContainer.style.width = "";
            listContainer.style.height = "";
            listContainer.style.overflow = "visible";
            sList.renderPayne.style.overflow = "visible";
            sList.setVisible(true);
            sList.label.expanded = true;
            // the inactive state is the right arrow..
            expIco.setActiveState(false);
        

            // sigh.. 9 hours of trial and error.. mostly error :(
            if(IE){
                listContainer.restorWidth = listContainer.width;
                if(listContainer.width < sList.topWidth)
                    listContainer.setWidth(sList.topWidth + 30 + expIco.width);
                else
                    listContainer.setWidth(listContainer.width + 30 + expIco.width);
            }
       }
    });

    expIco.onClick = function(){sList.label.renderFilm.onclick();}
    listContainer.addChild(expIco);

    listContainer.addChild(sList.label);
    listContainer.addChild(sList);
    
    this.renderPayne.addChild(listContainer);
    this.subLists.push(sList);
    
    return sList;
}