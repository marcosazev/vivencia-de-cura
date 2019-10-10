
let socket = io();

function renderMessage(message){
$(".messages").append(`<div class="message"><strong>`+ message.author+`</strong>:`+ message.message + "</div>");
console.log("rendered")
}

socket.on("previousMessages",function(messages){
for(message of messages){
renderMessage(message);
}
})

socket.on("receivedMessage",function(message){
 renderMessage(message); 
})

$("#chat").submit(function(event){

event.preventDefault();

 let author = $("input[name=username]").val();
 let message = $("input[name=message]").val();

 if(message){

  let messageObject ={
author:author,
message:message,

  };
 renderMessage(messageObject);

 socket.emit("sendMessage",messageObject);
}

});
