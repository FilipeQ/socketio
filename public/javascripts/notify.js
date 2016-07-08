let socket = io();
let id = Math.random();

socket.emit('connectedSocket',{id:id});

socket.on('notify all',function (msg) {
    let textArea = $('#comment');
    textArea.val(textArea.val().length>0 ? textArea.val()+'\n('+msg.id+') '+msg.user+': '+msg.message : '('+msg.id+') '+msg.user+': '+msg.message);
    notifyMe(msg);
});

socket.on('notify private',function (msg) { 
    let textArea = $('#comment');
    textArea.val(textArea.val().length>0 ? textArea.val()+'\nPrivate msg from: ('+msg.id+') '+msg.user+': '+msg.message : 'Private msg from: ('+msg.id+') '+msg.user+': '+msg.message);
    notifyMe(msg);
});

var handlerClick = function () {
    let message = {id:id, user:$('#user').val(),message:$('#phrase').val()};
    socket.emit('allMessages',message);
};

var handlerClickPrivate = function () {
    let message = {id:id, user:$('#user').val(),message:$('#phrase').val(),to:$('#privateUser').val()};
    socket.emit('privateMessage',message);
};

function notifyMe(msg) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(msg.user+': '+msg.message);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(msg.user+': '+msg.message);
            }
        });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
}