import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import dbConnection from './config/conectionDb.js'
import { Server } from 'socket.io'
import { ProductManager } from './Dao/ProductManager.js'
import passport from 'passport'
import {initPassport} from "./config/passport.js"
import session from 'express-session'
import config from "./config/env.js"
import chatModel from "./Dao/models/chat.model.js"
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import sessionsRouter from './routes/sessions.router.js'
import loginRouter from "./routes/login.router.js"
import mockingRouter from "./routes/mocking.router.js"
import loggerRouter from './routes/logger.router.js'
import usersRouter from "./routes/user.router.js"
import mailRouter from "./routes/mail.router.js"
import { addLogger } from './utils/logger.js'
import errorMid from "./middleware/errorMid.js"
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

dbConnection()

const app = express()
const PORT = config.Port || 8080

const productManager = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/public', express.static(__dirname+'/public'))

app.use(session({
    secret: 'secretCoder',
    resave: false,
    saveUninitialized: false
}))

initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(errorMid)
app.use(addLogger)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de Proyecto CoderHouse Curso Backend',
            description: 'Proyecto desarrollado por Luciano Poli'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsDoc(swaggerOptions)

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use('/', viewsRouter)
app.use('/auth', loginRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)
app.use ('/mockingproducts', mockingRouter)
app.use('/loggerTest', loggerRouter)
app.use('/api/users', usersRouter)
app.use('/api/mail', mailRouter)

const httpServer = app.listen(PORT, (err)=>{
    if (err) console.log(err)
    console.log(`Port ${PORT} Live!`)
})
httpServer.on
const io = new Server(httpServer)
let products  
let messages
io.on('connection', async socket => {
    console.log('New client conected!')
    try {
        products = await productManager.getProducts()
        messages = await chatModel.find()
        socket.emit('messageServer', products)
        socket.emit('messagesChat', messages)
    } catch (error) {
        console.log(error)
    }

    socket.on('msg', async data =>{
        console.log(data)
        try {
            await chatModel.insertMany(data)
            let datas = await chatModel.find()
            io.emit('newMsg', datas)
        } catch (error) {
            console.log(error)
        }
    })

    socket.on('product', async data => { 
        console.log('data: ', data)
        const {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail
        } = data
        if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {
            console.log('You must fill all empty spaces!')
        }else{
            try {
                await productManager.addProduct(data)
                let datas = await productManager.getProducts()
                io.emit('productAdded', datas)
            } catch (error) {
                console.log(error)
            }
        }
    })

    socket.on('deleteProduct', async data => {
        try {
            await productManager.deleteProduct(data)
            let datas = await productManager.getProducts()
            io.emit('productDeleted', datas)
        } catch (error) {
            console.log(error)
        }
    })
})












