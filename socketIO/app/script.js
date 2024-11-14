const socket = io('http://localhost:8080');

function sendMessage(event){
    event.preventDefault();
    const message = document.querySelector('input[type=text]');
    if(message.value){
        socket.emit(message.value)
        
        message.value = '';
    }
    message.focus;
    
}

document.querySelector('form')
.addEventListener('submit', sendMessage)

socket.on('message', ({data})=>{
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul').appendChild(li);
})