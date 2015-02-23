"use strict";
var dataReference = new Firebase("https://crackling-fire-3909.firebaseio.com/");

    $("#messageInput").keypress(function(key) {
        if (13 === key.keyCode) {
            var nameInput = $("#nameInput").val();
            var messageInput = $("#messageInput").val();
              dataReference.push({
                  name: nameInput,
                  text: messageInput
              });
            $("#messageInput").val("");
        }
    });

    dataReference.on("child_added", function(child) {
        var message = child.val();
        displayChatMessage(message.name, message.text);
    });

    function displayChatMessage(name, text) {
        $("<div/>").text(text).prepend($("<em/>").text(name + ": ")).appendTo($("#messagesDiv"));
        $("#messagesDiv")[0].scrollTop = $("#messagesDiv")[0].scrollHeight;
    };
