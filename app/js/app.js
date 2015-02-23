'use strict';


var Firebase = require("firebase");


var DataRef = new firebase('https://sizzling-fire-8233.firebaseio.com/');

var name = $('nameinput').val();
    var text = $('textinput').val();

$('msginput').keypress(function(e) {


    DataRef.push({name: name, text: text});
    $('msginput').val('');
  }
});

function displayChatMessage(name, text) {


DataRef.on('child_added', function(snapshot) {
  var msg = snapshot.val();
  displayChatMsg(msg.name, msg.text);
});



};
