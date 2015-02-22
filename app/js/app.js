'use strict';
$(document).ready(function(){
  var myDataRef = new Firebase('https://chatsondemand.firebaseio.com/');
  $('#messageInput').keypress(function (e) {
    if (e.keyCode === 13){
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
  if(name && text){
$('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
$('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
   }
  }

  function manySquares(){
      var max = 1000;
    for (var i = 0 ; i< max ; i++) {
    $('.shapes').append('<div class="square"></div>');
  }
}

  function randomColor() {
    return '#' + Math.random().toString(16).slice(2, 8);
  };
  $(".square").on("mouseover", function(){
    $(this).css('background-color',randomColor());
    });
});
