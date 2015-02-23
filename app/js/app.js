'use strict';

var myChatRef = new Firebase("https://tyschat.firebaseio.com/");

var $container = $('#container');
var $messages = $('#messagesDiv');
var $message = $('#messageInput');
var $name = $('#nameInput');


$message.keypress(function(e) {
  if (e.keyCode == 13) {
    var name = $name.val();
    var message = $message.val();
    myChatRef.push({name: name, message: message});
    $message.val('');
    scrollDown();
  }
});

myChatRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  displayChatMessage(message.name, message.message);
});

function displayChatMessage(name,message) {
  $('<div/>').text(message).prepend($('<em/>').text(name+': ')).appendTo($messages);
  $messages[0].scrollTop = $messages[0].scrollHeight;

};


function scrollDown() {
  $container.animate({ scrollTop: $messages.css('height') }, 1000);
};
