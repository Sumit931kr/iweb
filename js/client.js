
const socket = io('http://localhost:8000' || 'https://iwebchat.herokuapp.com/');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');

const append = (name ,message, position ) =>{
    const messageElement = document.createElement('div');
    if(position == 'center'){
      messageElement.innerHTML = `<span>${name}</span>${message}`;
    }
    else{
      messageElement.innerHTML = `<p>${name}</p>${message}`;

    }
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position != 'right'){
      audio.play();
    }
}

form.addEventListener('submit' ,(e)=>{
    e.preventDefault();
    const message = messageInput.value
    append('you', `${message}`,'right');
    socket.emit('send', message);
    messageInput.value = ""

})


const name = prompt("Enter Your name to Join");
socket.emit('new-user-joined', name)


socket.on('user-joined', name =>{
 append(`${name}` , '  Joined the chat', 'center');
})

socket.on('receive', data =>{
 append(`${data.name} `,`${data.message}`, 'left');
})

socket.on('left', name =>{
 append(`${name} `, 'Left the Chat', 'center');
})

