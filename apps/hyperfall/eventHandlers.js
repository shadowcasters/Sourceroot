/*
 * Event handlers for Soycloud's chat service.
 * 
 */

ChatServiceDemo.onError = function(message){
	alert("Error: "+message);
}

ChatServiceDemo.onNotify = function(message){
	postMessage("Notification: "+message);
}


