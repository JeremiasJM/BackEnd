const socketClient = io();

Swal.fire({
    title: "Bienvenido al Chat",
    input: "email",
    text: "Para ingresar dejanos tu email",
    allowOutsideClick: false,
}).then((email) => {
    // busco todos los mensajes del usuario ingresado y les agrego el class mymessage
    const mymessages = document.querySelectorAll('*[user="'+email.value+'"');
    for (let i = 0; i < mymessages.length; i++) {
        mymessages[i].setAttribute("class", "message mymessage");
    }
    document.querySelector("#chatbox").scroll({
        top: document.querySelector("#chatbox").scrollHeight,
        left: 0,
        behavior: "smooth",
    });
    const addform = document.querySelector("#newMessage");
    addform.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const message = ev.currentTarget.message.value;
        // emito un evento para guardar el mensaje
        socketClient.emit("newMessage", {
            message,
            email,
        });
        ev.currentTarget.message.value = "";
    });
    socketClient.on("emitMessage", (newMessage) => {
        console.log(newMessage.user, email.value, newMessage.user === email);
        const mymessage =
            email.value === newMessage.user ? "message mymessage" : "message";
        const innerHtml = `
        <div class="email">
            ${newMessage.user}
        </div>
        <div class="text">
            ${newMessage.message}
        </div>
        <div class="date">
            ${newMessage.date}
        </div>`;
        const newMessageDiv = document.createElement("div");
        newMessageDiv.setAttribute("class", mymessage);
        newMessageDiv.innerHTML = innerHtml;
        console.log(innerHtml);
        document.querySelector("#chatbox").appendChild(newMessageDiv);
        document.querySelector("#chatbox").scroll({
            top: document.querySelector("#chatbox").scrollHeight,
            left: 0,
            behavior: "smooth",
        });
    });
});