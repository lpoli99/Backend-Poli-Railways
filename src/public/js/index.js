const ioServer = io()
let productSub = document.querySelector('#submitProduct')
let title = document.querySelector('#title')
let description = document.querySelector('#description')
let code = document.querySelector('#code')
let price = document.querySelector('#price')
let inputStatus = document.querySelector('#status')
let stock = document.querySelector('#stock')
let category = document.querySelector('#category')
let thumbnail = document.querySelector('#thumbnail')
let productTitle = document.querySelector('#titleDelete')
let btnDelete = document.querySelector('#deleteProduct')
let container = document.querySelector('#container')

productSub.addEventListener('click', (e)=>{
    e.preventDefault()
    let product = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        inputStatus: inputStatus.value,
        stock: stock.value,
        category: category.value,
        thumbnail: thumbnail.value
    }
    ioServer.emit('product', product)
})

btnDelete.addEventListener('click', (e)=>{
    e.preventDefault()

    let pid = productTitle.value

    ioServer.emit('deleteProduct', pid)
})

ioServer.on('messageServer', data =>{
    container.innerHTML = ''

    data.forEach(element => {
        container.innerHTML += `<div>
                                    <h4>Title: ${element.title}</h4>
                                    <p>Description: ${element.description}</p>
                                    <p>Category: ${element.category}</p>
                                    <p>Stock: ${element.stock}</p>
                                    <p>Price: ${element.price}</p> 
                                    <p>ID: ${element.id}</p> 
                                </div>`
    })
})

ioServer.on('productAdded', data =>{
    container.innerHTML = ''

    data.forEach(element => {
        container.innerHTML += `<div>
                                    <h4>Title: ${element.title}</h4>
                                    <p>Description: ${element.description}</p>
                                    <p>Category: ${element.category}</p>
                                    <p>Stock: ${element.stock}</p>
                                    <p>Price: ${element.price}</p>  
                                </div>`
    })
})

ioServer.on('productDeleted', data =>{
    container.innerHTML = ''

    data.forEach(element => {
        container.innerHTML += `<div>
                                    <h4>Title: ${element.title}</h4>
                                    <p>Description: ${element.description}</p>
                                    <p>Category: ${element.category}</p>
                                    <p>Stock: ${element.stock}</p>
                                    <p>Price: ${element.price}</p>   
                                </div>`
    })
})

