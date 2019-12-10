const socket = io()

const messageInput = document.querySelector('#messageInput')

const sendMessage = () => {
  console.log('sent message:', messageInput.value)
  socket.emit('message', messageInput.value)
  messageInput.value = ''
}

messageInput.addEventListener('keyup', event => {
  if (event.keyCode === 13) {
    event.preventDefault()
    sendMessage()
  }
})

document.querySelector('#sendButton').addEventListener('click', sendMessage)

socket.on('message', message => {
  console.log('received message:', message)
  document.querySelector('#previousMessages').innerHTML += message + '<br>'
})