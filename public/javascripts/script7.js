
let socket = io("/chat7");


function updateScroll() {

  let element = document.querySelector(".messages");
  element.scrollTop = element.scrollHeight;
  document.getElementById('textInput').value = '';
}

function renderMessage(message) {
  $(".messages").append(`<div class="message"><strong>` + message.author + `</strong>:` + message.message + "</div>");
  console.log("rendered")
  updateScroll();
}

socket.on("previousMessages", function (messages) {
  for (message of messages) {
    renderMessage(message);
  }
})

socket.on("receivedMessage", function (message) {
  renderMessage(message);
})

$("#chat1").submit(function (event) {

  event.preventDefault();

  let author = $("input[name=username]").val();
  let message = $("input[name=message]").val();
  let room = $("input[name=room]").val();

  if (message) {

    let messageObject = {
      author: author,
      message: message,
      room: room
      
    };
    renderMessage(messageObject);

    socket.emit("sendMessage", messageObject);
  }

});
