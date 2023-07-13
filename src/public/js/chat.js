const ioServer = io()

let Name = document.querySelector('#user')
let text = document.querySelector('#message')
let subMessage = document.querySelector('#submitMsg')
let chatContainer = document.querySelector('#chatContainer')

subMessage.addEventListener('click', (e)=>{
    e.preventDefault()

    let msg = {
        user: Name.value,
        message: text.value
    }
    console.log(msg)

    ioServer.emit('msg', msg)
})

ioServer.on('messagesChat', data =>{
    chatContainer.innerHTML = ''

    data.forEach(element => {
        chatContainer.innerHTML += `<div>
                                        <p><strong>${element.user}</$strong>: ${element.message}</p>
                                    </div>`
    })
})

ioServer.on('newMsg', data =>{
    chatContainer.innerHTML = ''

    data.forEach(element => {
        chatContainer.innerHTML += `<div>
                                        <p><strong>${element.user}</$strong>: ${element.message}</p>
                                    </div>`
    })
})