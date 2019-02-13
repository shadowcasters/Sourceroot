

function panelTesting(){
   var imp = new ImageData
   var pan =  new Panel({width:450,height:400,schema:"dark",corners:"large",left:200,top:100});
   pan.addChild(SRLayout.getDiv(50,20),"btn");
   pan.btn.style.backgroundColor = "red";
   var pos = {left:10,top:100};
   pan.btn.onclick = function(){
       var ico = new Icon("face.smile");
       ico.setPosition(pos.left,pos.top);
       pan.addChild(ico);
       pos.left += ico.width;
       var tin = SRLayout.getDiv(40,15); //SRLayout.getTextDiv("Hellllo!");
       tin.appendChild(document.createTextNode("please"));

       tin.style.backgroundColor = "blue";
       pan.addChild(tin);

       //new TextLabel("TESTING");
   }
   return pan;
}

function windowTesting(){
    var win = new Window({width:450,height:400,left:200,top:100});
 
   return win;

}