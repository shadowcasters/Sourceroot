@inject("chatController");
var chatClient = function(){


// for hierarchy access.
var _parent = this;

//////////< panel that shows the incomming text >\\\\\\\\\\\\\\\
this.chatBox = new TextPanel({width:"100%",height:"100%",schema:"light"});
this.chatBox.renderPayne.ondblclick = function(){_parent.chatBox.clear();}

//////////< panel that you type into >\\\\\\\\\\\\\\\
this.textAreaInput = new TextAreaInput({width:"100%",height:70});
this.textAreaInput.setKeyboardHook();
   // enter key action, _<ansi val> is the enter key listener 
   this.textAreaInput.key_13 = function(){
      chatController.say(_parent.textAreaInput.getText(true));
      _parent.textAreaInput.clear();
   }
//this.textAreaInput.setText("test http://www.google.com");
/////////////////////////////////////////////////////

////////////< user list , could be replaced now that we have better lightweight embeded panels>\\\\\\\\\\\\\\\
this.userList = new GroupPanel(150, "100%", "Available Users", "light");
this.userList.addChild(new ListLayout(),"listLayout");
this.userList.listLayout.setFontObject(theme.fonts.primary);
this.userList.setScrollable(true);
this.userList.listLayout.setColumnWidth(1, 27);
this.userList.addItem=function(handle){
    var uico = new Icon("chat.node");
    var tlbl = SRLayout.getTextDiv(handle);
   
    if(chatController.userHandle == handle)
        tlbl.style.fontWeight = "bold";

    var uarr = new Array;
    uarr.push(uico);
    uarr.push(tlbl);

    try{
        this.listLayout.addRow(uarr);
    }catch(e){
        _SRDebug.out(e);
    }
}

this.layout = new GridLayout(1, 2, "99.5%", "100%");
// this is the column that holds the user list.
this.layout.setColumnWidth(1, 150);
this.layout.addChild(this.userList, 1, 1);
// in/out text panels the input panel will be 150px high with variable width.
this.layout.IOtext = new GridLayout(2, 1, "99.5%", "100%");
this.layout.IOtext.setRowHeight(2, 75);
this.layout.IOtext.addChild(this.chatBox, 1, 1,"output");
this.layout.IOtext.addChild(this.textAreaInput, 2, 1,"input");

var ioPanel = new Panel();
ioPanel.doEmbedMainPanel();
ioPanel.setWidth("100%");
ioPanel.setHeight("100%");
ioPanel.addChild(this.layout.IOtext);
this.layout.addChild(ioPanel, 1, 2);
//////////////////////////////////////////////

this.disconnectedStatusIcon = new Icon("medium.network.disconnected");
this.connectedStatusIcon = new Icon("medium.network.connected");
this.connectionProcessing = new Sprite("spinner");

///////////////< The window >\\\\\\\\\\\\\\\\
 var win = new Window({width:500,height:450});
   win.setMaximizable(false);
   win.setMenuBar();
   var fMenu = win.menuBar.addMenu("File");
   fMenu.addItem("Set Handle", "face.monkey", function(){
       _parent.showHandlePrompt(true);
   });

   fMenu.insertBreak();
   fMenu.addItem("Exit", "system.exit", function(){win.close();});

   fMenu.setWidth(90);


   win.setTitle("Tofui Chat Client", "face.smile");
   win.setStatus("Not Connected",this.disconnectedStatusIcon);
   win.setLayout(this.layout);
//////////////////////////////////////////////
   this.window = win;

///////////////< Handle Prompt pannel >\\\\\\\\\\\\\\\\
this.handlePanel = new Panel({corners:"large",width:320,height:100,schema:"dark"});
this.handlePanel.setAbsolutePosition();
this.handlePanel.doEmbedMainPanel();
this.handlePanel.setPosition(90,120);
var lfont = theme.fonts.light;
lfont.bold = true;
lfont.size = 16;

var lableText = new LabelTextField(new Label("Handle", "chat.welcome","light"));
lableText.textField.setOnEnterAction(function(){
    chatController.join(lableText.textField.getText());
});

this.handlePanel.addChild(lableText,"textField");
this.handlePanel.renderPayne.style.zIndex = 11;
this.handlePanel.setVisible(false);
this.window.renderPayne.addChild(this.handlePanel);
////////////// < ( End handle prompt panel. ) > \\\\\\\\\\\\\\\\\

 chatController.init(this);
}

chatClient.prototype.showHandlePrompt = function(bool){
    if(bool){
        this.window.setFocus(false,true);
        this.handlePanel.setVisible(true);
        this.window.setStatus("Not Connected",this.disconnectedStatusIcon);

    }else{
        this.window.setFocus(true);
        this.handlePanel.setVisible(false);
        this.window.setStatus("Connected",this.connectedStatusIcon);
    }

}

chatClient.prototype.updateUserList =  function(users){
this.userList.setTitle("Available Users ("+users.length+")");
var parent = this;
this.userList.listLayout.clearList(function(){
     for(var i=0; i < users.length; i++){
       parent.userList.addItem(users[i]);
     }
});
   
}

chatClient.prototype.clear =  function(){
  this.userList.listLayout.clearList();
  this.chatBox.clear();
  this.window.statusBar.setIcon(this.disconnectedStatusIcon);
  this.window.statusBar.setText("Not Connected...");
  this.userList.setTitle("Available Users (0)");
}

chatClient.prototype.onError =  function(errMsg){
  alert("ERROR: "+errMsg);
}

//// cheassy little quicky browser
function MakeBrowser(url){
     var bwin = new Window({titleText:"Tofui Sunrise: "+(url.substr(url.indexOf("//", 0)+2)),icon:"globe",width:800,height:560});
     var brow = new BrowserPanel();
     brow.setSize("100%","100%");
     bwin.addChild(brow);
     rootPayne.addChild(bwin);
     brow.navigate(url)
}

chatClient.prototype.postMessage = function(msg){

 function p(m){
     var r = new RegExp("(^|[ \t\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))");
     var url = r.exec(m);
     if(url)
        m = m.replace(r, "<a onclick=\"MakeBrowser('"+url[0]+"');\" style='color:blue; text-decoration: underline; cursor: pointer' >"+url[0]+"</a>", "-g");

     return(m);
 }
     
//var _parent = this;
//var i=0;
//var ti = setInterval(function(){
//   i++
//   if(i<999){
//   var cp = ""+i;
//   ttasks.push(function(ip){_parent.chatBox.doWriteHTML(p(msg));});
//   }else
//     clearInterval(ti);
//},1);
     
     this.chatBox.doWriteHTML(p(msg));
}

