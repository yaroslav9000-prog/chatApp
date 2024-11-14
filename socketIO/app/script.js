const socket = io('ws://localhost:8080');

function sendMessage(event){
    event.preventDefault();
    const input = document.querySelector('input[type=text]');
    if(input.value){
        socket.emit(input.value);
        const message = input.value;
        const myList = document.querySelector('ul');
        const newMessage = document.createElement('li');
        newMessage.textContent = message;
        myList.appendChild(newMessage);
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