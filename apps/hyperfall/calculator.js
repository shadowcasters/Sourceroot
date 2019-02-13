
/* 
 * demo calculator.
 */

var calculator = function(){

    var win = new Window({width:250,height:300,titleText:"Calculator", icon:"calculator"});
   win.setPosition(100,75);
    win.setUserResizable(false);
    win.setMaximizable(false);
    win.setMenuBar(true);
    win.setLayout(new GridLayout(2, 1));
    
  function getAbout(){
      var about = new Panel({width:100,height:89});
      about.setEffects(true);
      var rich = new Icon("Richard");
      about.mainPanel.addChild(rich);
      about.setAbsolutePosition();
      about.setPosition(0,0);

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
    
    var tField = new TextField();
   
    win.layout.addChild(tField,1,1);
   

    var btnGrid = new GridLayout(4,4);
    btnGrid.setHorizontalAlignment();
    btnGrid.setVerticalAlignment();
    win.layout.addChild(btnGrid,2,1);
  
    function calc_btn(_char){
      tField.appendText(_char);
    }

    var btn_add = new Button({text:"+",width:45,action:function(){calc_btn("+");}});
    var btn_subtract = new Button({text:"-",width:45,action:function(){calc_btn("-");}});
    var btn_divide = new Button({text:"/",width:45,action:function(){calc_btn("/");}});
    var btn_multiply = new Button({text:"X",width:45,action:function(){calc_btn("*");}});
    var btn_eq = new Button({text:"=",width:45,action:function(){

       try{
         var value = eval(tField.getText());
         tField.setText(value);
        }catch(e){
            tField.text = "0";
            tField.textField.value = "0";
            alert("ERR");
        }
       }
    });

    var btn1 = new Button({text:"1",width:45,action:function(){calc_btn("1");}});
    var btn2 = new Button({text:"2",width:45,action:function(){calc_btn("2");}});
    var btn3 = new Button({text:"3",width:45,action:function(){calc_btn("3");}});
    var btn4 = new Button({text:"4",width:45,action:function(){calc_btn("4");}});
    var btn5 = new Button({text:"5",width:45,action:function(){calc_btn("5");}});
    var btn6 = new Button({text:"6",width:45,action:function(){calc_btn("6");}});
    var btn7 = new Button({text:"7",width:45,action:function(){calc_btn("7");}});
    var btn8 = new Button({text:"8",width:45,action:function(){calc_btn("8");}});
    var btn9 = new Button({text:"9",width:45,action:function(){calc_btn("9");}});
    var btn0 = new Button({text:"0",width:45,action:function(){calc_btn("0");}});
    var btn_clr = new Button({text:"Clr",width:45,action:function(){tField.setText("");}});

 
    btnGrid.addChild(btn1, 1, 1);
    btnGrid.addChild(btn2, 1, 2);
    btnGrid.addChild(btn3, 1, 3);
    btnGrid.addChild(btn_add, 1, 4);

    btnGrid.addChild(btn4, 2, 1);
    btnGrid.addChild(btn5, 2, 2);
    btnGrid.addChild(btn6, 2, 3);
    btnGrid.addChild(btn_subtract, 2, 4);

    btnGrid.addChild(btn7, 3, 1);
    btnGrid.addChild(btn8, 3, 2);
    btnGrid.addChild(btn9, 3, 3);
    btnGrid.addChild(btn_multiply, 3, 4);

    btnGrid.addChild(btn0, 4, 1);
    btnGrid.addChild(btn_clr,4, 2);
    btnGrid.addChild(btn_eq,4, 3);
    btnGrid.addChild(btn_divide,4, 4);

   
    return win;
}
