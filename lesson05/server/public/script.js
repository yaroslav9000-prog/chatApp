const ws = new WebSocket('ws://localhost:80');


const nameInput = document.querySelector('.nameInput');
const roomInput = document.querySelector('.roomInput');
const messageList = document.querySelector('.messageList');
const messageInputForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');


const sendMessage = () =>{
    const message = messageInput.value;
    ws.send(message);
    messageInput.focus()
}
messageInput.addEventListener('keypress', (event)=>{
    event.preventDefault();
    console.log(messageInput.value);
})
sendMessageButton.addEventListener('click', (event)=>{
    event.preventDefault()
    sendMessage();
});



