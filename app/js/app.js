'use strict';

var myDataRef = new Firebase('https://sweltering-inferno-7674.firebaseio.com/');

$('#messageInput').keypress(function (e) {
  if (e.keyCode === 13) {
    var name = $('#nameInput').val();
    var text = $('#messageInput').val();
    myDataRef.push({name: name, text: text});
    $('#messageInput').val('');
  }
});
myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  displayChatMessage(message.name, message.text);
});
function displayChatMessage(name, text) {
  $('<div class="messages"/>').text(text).prepend($('<strong/>').text(name+': ')).appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;

  // $("#messagesDiv").scrollTop($("#messagesDiv").children().height());
};
