const socket = io('ws://localhost:3500');

const typing = document.querySelector('.typing');
const msgInput = document.querySelector('input[type=text]');

function sendMessage(event){
    event.preventDefault();
    if(msgInput.value){
        socket.emit('message' ,msgInput.value);
        const message = msgInput.value;
        const myList = document.querySelector('ul');
        const newMessage = document.createElement('li');
        newMessage.textContent = message;
        myList.appendChild(newMessage);
        msgInput.value = '';
    }
    msgInput.focus();
    
}

document.querySelector('form')
.addEventListener('submit', sendMessage)

socket.on("message", data=>{
    console.log(data);
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul').appendChild(li);
})

msgInput.addEventListener('keypress', ()=>{
  socket.emit('typing', socket.id.substring(0,5));  
})

socket.on('typing', (name)=>{
    activity.textContent = `${name} is typing`;
})