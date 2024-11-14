const socket = io('http://localhost:8080');

function sendMessage(event){
    event.preventDefault();
    const input = document.querySelector('input[type=text]');
    if(input.value){
        socket.emit('message' ,input.value);
        const message = input.value;
        const myList = document.querySelector('ul');
        const newMessage = document.createElement('li');
        newMessage.textContent = message;
        myList.appendChild(newMessage);
        input.value = '';
    }
    input.focus();
    
}

document.querySelector('form')
.addEventListener('submit', sendMessage)

socket.on("message", data=>{
    console.log(data);
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul').appendChild(li);
})