
MenuPanel.prototype = new Panel;
MenuPanel.prototype.widgetName = "menuPanel";
MenuPanel.prototype.constructor = MenuPanel;
MenuPanel.prototype.defaultProperties={
    itemHeight:20,
    width:110,
    height:1,
    expandDelay:0,
    contractDelay:200,
    expandSpeed:10,
    contractSpeed:10,
    hoverEffect:true,
    iconMargin:5,
    iconWidth:16
    
}

function MenuPanel(PropertiesObject){
    this.initWidget(PropertiesObject);
    this.init();
    this.initMenuPanel();
}

MenuPanel.prototype.initMenuPanel = function(){
    this.renderPayne.setAbsolute();
    this.itemArray = new Array;
    this.subMenuArray = new Array;
    this.seperatorCount = 0;
    this.setRenderFilm();
    
    var _Y=0;
    var _parent = this;
    var itemHeight = this.properties.itemHeight;
    var tSet = 0;
    this.renderFilm.onclick = function(){
       var d = _Y - _parent.tObj.top;
       d = Math.floor(d/itemHeight);
        if(d < _parent.itemArray.length && _parent.itemArray[d].renderFilm.onclick){
             _parent.itemArray[d].renderFilm.onclick();

             _parent.itemArray[d].lowlight();
        }
    }

    this.renderFilm.onmousemove = function(e){
        if(!_parent.tObj) return false;
        if (IE) {
            _Y = event.clientY + document.body.scrollTop;
        } else {
            _Y = e.pageY;
        }

        tSet = Math.floor((_Y - _parent.tObj.top)/itemHeight);
        if(tSet >=0 && tSet < _parent.itemArray.length){
          if(_parent.itemArray[tSet].highlight){
              _parent.itemArray[tSet].highlight();
          }else
              _parent.itemArray[tSet].lowlight();

          for(var i=0; i < _parent.itemArray.length; i++)
              if(tSet != i)
               _parent.itemArray[i].lowlight();
          i=null;
        }
  }
  this.setEffects(true);
  this.renderFilm.onmouseout = function(){
      _parent.MA = false;
  if(_parent.onMouseOut)
        _parent.onMouseOut();

        setTimeout(function(){_parent.contract();},_parent.ContractDelay);
  }

  this.renderFilm.onmouseover = function(){
    _parent.MA = true;
    _parent.tObj = _SRGetAbsoluteCoords(_parent.renderPayne);
    if(_parent.onMouseOver)
        _parent.onMouseOver();
  }

  this.effects.onExpand = function(){
     _parent.tObj = _SRGetAbsoluteCoords(_parent.renderPayne);

  }

  this.effects.onContract = function(){
      _parent.renderPayne.setVisible(false);
  }

  this.mainPanel.parentNode.align = "left";
  return this;

}

MenuPanel.prototype.setIconMargin=function(inPixels){this.iconMargin = inPixels;}
MenuPanel.prototype.setIconWidth=function(inPixels){this.iconWidth = inPixels;}
MenuPanel.prototype.setItemHeight=function(inPixels){this.itemHeight = inPixels;}
MenuPanel.prototype.setContractDelay = function(delay){this.ContractDelay = delay;}
MenuPanel.prototype.setExpandDelay = function(delay){this.expandDelay = delay;}
MenuPanel.prototype.setContractSpeed = function(delay){this.ContractSpeed = delay;}
MenuPanel.prototype.setExpandSpeed = function(delay){this.expandSpeed = delay;}
MenuPanel.prototype.setHoverEffect = function(bool){this.hoverEffect = bool;}
MenuPanel.prototype.setInstantExpand = function(bool){this.instantExpand = bool;}
MenuPanel.prototype.setInstantContract = function(bool){this.instantContract = bool;}

MenuPanel.prototype.getItemCount = function(){
  return this.itemArray.length;
}

MenuPanel.prototype.expand=function(instantly){

    this.renderPayne.setVisible(true);
    var MaxHeight = ((this.properties.itemHeight * this.getItemCount())+( this.theme.getImageMap("top.left")[2]) );
    if(this.getItemCount() == 0)
        MaxHeight = this.itemHeight + ((this.theme.getImageMap("top.left")[2]));
    
    var Speed = this.properties.expandSpeed;
    if(instantly || this.instantExpand){
            this.setHeight(MaxHeight);
    }else
    if(this.expandDelay && typeof this.expandDelay == "number"){
        var _parent = this;
        setTimeout(function(){_parent.effects.expand(MaxHeight,Speed);},this.expandDelay);
    }else{
        this.effects.expand(MaxHeight, Speed);
    }

    if(this.onMenuExpand)
        this.onMenuExpand();

}
/**
 * one aregument contract_instantly = boolean, if true forces instant contraction.
 */
 
MenuPanel.prototype.contract=function(instantly){
    var _parent = this;
    if(typeof instantly == "number" && instantly > 0){
        var cDelayOverride = instantly;
        instantly = false;
    }
    var Speed = this.properties.contractSpeed;
    
    for(var i = 0; i< this.subMenuArray.length; i++)
        if(this.subMenuArray[i].MA)
            return false;

    if(this.MA && !instantly)
        return false;

    this.renderPayne.style.overflow = "hidden";


    if(instantly || this.instantContract){
            this.setHeight(1);
    }else
    if(this.expandDelay && typeof this.expandDelay == "number"){
            setTimeout(function(){_parent.effects.contract(1,Speed);},(cDelayOverride || _parent.contractDelay) );
       }else{
            this.effects.contract(1, Speed);
       }

       this.renderPayne.setVisible(false);

        for(i =0; i<this.subMenuArray.length; i++){
            if(this.subMenuArray[i].isExpanded)
                this.subMenuArray[i].contract(true);
        }
        
        if(this.onMenuContract)
            this.onMenuContract();

        for(i=0; i < _parent.itemArray.length; i++)
             _parent.itemArray[i].lowlight();

}



MenuPanel.prototype.doCreateItemDiv = function(text, icon, action){
      var Item = SRLayout.getDiv("100%",this.properties.itemHeight);
    
      var textLeft = this.iconWidth + (this.iconMargin * 2);
      var textTop = (this.itemArray.length * this.itemHeight) + ((this.itemHeight - (this.theme.font.size) )/2.5);

      if(icon){
          Item.icon = new Icon(icon);
         
          Item.addChild(Item.icon);
          Item.icon.renderPayne.setLeft(5);
          Item.icon.renderPayne.setTop((this.properties.itemHeight - Item.icon.height)/2);
      }
      Item.textDiv = SRLayout.getTextDiv(text);
      Item.textDiv.style.position = "absolute";
      Item.textDiv.style.top = textTop+"px";
      Item.textDiv.style.left = textLeft + "px";
      Item.addChild(Item.textDiv);
  
      Item.renderFilm = SRLayout.getDiv();
      Item.renderFilm.setAbsolute();
      Item.addChild(Item.renderFilm);
      Item.setTop(1);

      var _parent = this;
      if(action)
        Item.renderFilm.onclick = function(){
            action();
            if(_parent.onAction){
                _parent.onAction();
            }
        }

      if(this.hoverEffect){
          var _parent = this;
          Item.highlight = function(){
              Item.style.backgroundColor = _parent.theme.schema.contrast;
            }

          Item.lowlight = function(){
              Item.style.backgroundColor = _parent.theme.schema.base;
          }
      }

      return Item;
}

MenuPanel.prototype.addItem = function(text, icon, action, iconPosition){
      var Item = this.doCreateItemDiv(text, icon, action, iconPosition || this.properties.iconPosition);
      var nWidth = getTextDimentions(text, (this.theme.font.size || 12))+(Item.icon?Item.icon.width:0)+10;

      if(nWidth > this.width){
        this.setWidth(nWidth);
        this.renderPayne.setWidth(nWidth);
      }

      this.addChild(Item,"item"+this.itemArray.length);

      this.itemArray[this.itemArray.length || 0] = Item;
      return Item;
}

MenuPanel.prototype.insertBreak = function(){
    var borderElem = SRLayout.getDiv("100%",0).setAbsolute();
    // 4 hours lost.. fork it, I give up...
    if(IE){
        borderElem.style.borderTop = "solid 1px #"+this.schema.divide.inner;
        this.itemArray[this.itemArray.length-1].style.borderBottom = "solid 1px #"+this.schema.divide.outer;
    }else{
        borderElem.style.borderBottom = "solid 1px #"+this.schema.divide.inner;
        borderElem.style.borderTop = "solid 1px #"+this.schema.divide.outer;
    }
    
    borderElem.setTop((this.itemHeight * this.itemArray.length)+(this.seperatorCount * 2));
    borderElem.style.zIndex = 2;
  
    this.seperatorCount += 1;
    this.addChild(borderElem);
    
}

MenuPanel.prototype.addSubMenu = function(text, icon, menuPanel){

      var menuPanel = menuPanel || new MenuPanel();
      menuPanel.setAbsolutePosition();
      
      var top = ( (this.itemArray.length * this.properties.itemHeight) + (this.seperatorCount * 3) );
     
      var _parent = this;
      var menuTag = this.addItem(text, icon);
      
      menuTag.subIcon = new Icon("arrow.right");
      setCSSFloat(menuTag.subIcon.renderPayne, "right");
      menuTag.subIcon.setTop((this.itemHeight - menuTag.subIcon.height)/2);
      menuTag.addChild(menuTag.subIcon);

      if(icon){
        menuTag.icon.renderPayne.style.position = "absolute";
        menuTag.icon.setTop(top + ((this.itemHeight - menuTag.icon.height)/2));
      }
      
      menuPanel.renderPayne.setAbsolute();
      menuPanel.setTop(top);
      menuPanel.renderPayne.style.left = "100%";
      menuPanel.renderPayne.setVisible(false);
      menuPanel.onMenuContract = function(){
            this.renderPayne.style.overflow = "hidden";
            setTimeout(function(){_parent.contract();},150);
      }

      menuTag.highlight = function(){
      if(!this.AH){
            this.AH = true;

        if(_parent.hoverEffect)
          menuTag.style.backgroundColor = _parent.theme.schema.contrast;

          setTimeout(function(){
         
              if(menuTag.AH){
                  _parent.renderPayne.style.overflow = "visible";
                  menuPanel.expand();
              }
          },250);
        }
      }

      menuTag.lowlight = function(){
        if(this.AH){
        this.AH = false;
        if(_parent.hoverEffect)
          menuTag.style.backgroundColor = _parent.theme.schema.base;

         menuPanel.contract();
        }
      }

      this.subMenuArray[this.subMenuArray.length || 0] = menuPanel;
      this.renderPayne.addChild(menuPanel);
     
      return menuPanel;
}
