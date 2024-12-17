startLoading()
$(function reset() {
    if (!blulet) return setTimeout(reset, 1)
    stopLoading()
});

$(document).ready(function () {
    socket = {};
    socket.htmlEncode = function (str) {
        let el = $("<div></div>");
        el.text(str);
        return el.html();
    }

    socket.addMessage = function (data) {
        let message = document.createElement("div");
        message.classList.add("styles__message__3qXcJ-camelCase");

        console.log(data)
        data.message = socket.htmlEncode(data.message);

        let avatar = `<img src="${data.user.pfp}" class="styles__avatar__3qXcJ-camelCase">`;
        // let avatar = `<img src="${data.user.pfp}" class="styles__avatar__3qXcJ-camelCase">`;

        message.innerHTML(`<div class="styles__avatar__3qXcJ-camelCase">${avatar}</div><div class="styles__message__3qXcJ-camelCase"><div class="styles__username__3qXcJ-camelCase">${data.user.username}</div><div class="styles__text__3qXcJ-camelCase">${data.message}</div></div>`);

        $(".styles__chatContainer__jhT8H-camelCase").append(message);
        $(".styles__chatContainer__jhT8H-camelCase").scrollTop($(".styles__chatContainer__jhT8H-camelCase")[0].scrollHeight);
    }

    $(".styles__chatInput___hfdT6-camelCase").keydown(function (e) {
        if (e.keyCode !== 13) return;
        if ($('.styles__chatContainer__jhT8H-camelCase').val().length < 1) return;
        if ($('.styles__chatContainer__jhT8H-camelCase').val().length > 1000) return;
        socket.socket.emit('chat', $('.styles__chatContainer__jhT8H-camelCase').val());
        $('.styles__chatContainer__jhT8H-camelCase').val('');
    });

    socket.socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    socket.socket.on("connect", () => {
        socket.socket.on("chat", (data) => {
            if (data.error) {
                console.log(data.reason);
            }
            socket.addMessage(data);
        });
    });
});