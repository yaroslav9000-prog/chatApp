const socket = new WebSocket('http://localhost:3000');

function sendMessage(event){
    event.preventDefault();
    const message = document.querySelector('input[type=text]');
    if(message.value){
        socket.send(message.value)
        const myMessage = document.createElement('li');
        myMessage.textContent = `I sent: ${message.value}`
        document.querySelector('ul').appendChild(myMessage);
        
        message.value = '';
    }
    message.focus;
    
}

document.querySelector('form')
.addEventListener('submit', sendMessage)

socket.addEventListener('message', ({data})=>{
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul').appendChild(li);
})