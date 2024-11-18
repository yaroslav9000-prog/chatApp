const ws = new WebSocket('http://localhost:3500');

const nameInput = document.querySelector('.nameInput');
const roomInput = document.querySelector('.roomInput');
const messageList = document.querySelector('.messageList');
const messageInput = document.querySelector('.messageInput')
const sendMessageButton = document.querySelector('.sendMessage');


const sendMessage = () =>{
    const message = messageInput.textContent;
    ws.send(message);
    console.log('message was sent to a websocket ...', message)
}
sendMessageButton.addEventListener('click', ()=>{
    sendMessage();
})

ws.onerror((error)=>{
    console.log(error);
})

ws.on('message', ()=>{

})

