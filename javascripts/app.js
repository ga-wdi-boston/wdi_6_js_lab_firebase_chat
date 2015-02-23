var myDataRef = new Firebase('https://wdi6firechat.firebaseio.com/');
var name = prompt("Your name?", "Guest");
var currentStatus = "online";
var userListRef = new Firebase("https://wdi6present.firebaseio.com//");
var myUserRef = userListRef.push();
var connectedRef = new Firebase("https://wdi6present.firebaseio.com//.info/connected");


$('#messageInput').keypress(function (e) {
  if (e.keyCode == 13) {
    var name = $('#nameInput').val();
    var text = $('#messageInput').val();
    var user = $('#me').text();
    if (name) {
      myDataRef.push({name: name, text: text});
    } else {
      myDataRef.push({name: user, text: text});
    }
    $('#messageInput').val('');
  }
});
myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  displayChatMessage(message.name, message.text);
});
function displayChatMessage(name, text) {
  $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

connectedRef.on("value", function(isOnline) {
  if (isOnline.val()) {
    myUserRef.onDisconnect().remove();
    setUserStatus("online");
  }
  else {
    setUserStatus(currentStatus);
  }
});

function setUserStatus(status) {
  currentStatus = status;
  myUserRef.set({ name: name, status: status });
}

function getMessageId(snapshot) {
  return snapshot.key().replace(/[^a-z0-9\-\_]/gi,'');
}

userListRef.on("child_added", function(snapshot) {
  var user = snapshot.val();

  $("<div/>")
    .attr("id", getMessageId(snapshot))
    .text(user.name + " is currently " + user.status)
    .appendTo("#presenceDiv");
  $("#me")
    .text(user.name)
    .appendTo("#me");
});

userListRef.on("child_removed", function(snapshot) {
  $("#presenceDiv").children("#" + getMessageId(snapshot))
    .remove();
});

userListRef.on("child_changed", function(snapshot) {
  var user = snapshot.val();
  $("#presenceDiv").children("#" + getMessageId(snapshot))
    .text(user.name + " is currently " + user.status);
});

document.onIdle = function () {
  setUserStatus("idle");
}
document.onAway = function () {
  setUserStatus("away");
}
document.onBack = function (isIdle, isAway) {
  setUserStatus("online");
}

setIdleTimeout(5000);
setAwayTimeout(10000);
