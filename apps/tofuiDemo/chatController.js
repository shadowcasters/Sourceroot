
/* 
 * The controller for the chat client.
 */
function getChannelInfoHandler(e){
    if(e){
        if(e.users)
            chatController.who(e.users);
        else
            if(e.splice)
                chatController.who(e);
    }
}
function doBroadcastHandler(e){
   chatController.hear(e);
}

function showLoginScreen(bool){
        chatController.UIObject.showHandlePrompt(bool);
}

var chatController = new Object({
    userHandle:null,
    userList:null,
    currentChannel:"default",
    init: function(UIviewObject){
    chatController.UIObject = UIviewObject;
    // see if this list was forward loaded...
    if(chatController.userList && chatController.userList.length > 0)
         if(UIviewObject)
              UIviewObject.updateUserList(chatController.userList);


    ChatServiceDemo.chat.addListener("getChannelInfo",getChannelInfoHandler);
    ChatServiceDemo.chat.addListener("doBroadcast",doBroadcastHandler);

     if(chatController.userHandle == null){
        showLoginScreen(true);
     }else{
       chatController.hear('Welcome back '+chatController.userHandle);
     }
    },
    // pushes a message to the focused channel
    say:function(message){
        ChatServiceDemo.chat.doBroadcast("default",message);
    },
    // say what?
    hear:function(response){
        chatController.UIObject.postMessage(response);
    },
    // He sure played a mean pin-ball
    who:function(usrObj){
        // This is where the controller earns it's salt.
      if(usrObj && usrObj.splice){

           chatController.userList = usrObj;
           if(chatController.UIObject)
              chatController.UIObject.updateUserList(chatController.userList);
      }else{
        alert("invalid: "+usrObj);
      }
         
    },
    join:function(userHandle){
        // The simple and correct solution here is to simply check the username and channel
        // in this instance there is not even a channel, just if chatController.userHandle == userHandle;
        // BUT this is about testing out those beans. Making sure they jump.
        ChatServiceDemo.chat.doSubscribe.addListener(function(userHandle){
            chatController.setHandle(userHandle);
            chatController.welcome();
        });

        ChatServiceDemo.chat.doSubscribe("default",userHandle);
    },
    welcome: function(){
        showLoginScreen(false);
    },
    leave:function(){
        ChatServiceDemo.chat.doUnsubscribe("default",chatController.userHandle);
    },
    setHandle:function(handle){
        chatController.userHandle = handle;
    }
});
