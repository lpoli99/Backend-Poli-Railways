import mongoose from 'mongoose'
import ProductsService from '../src/services/productsService.js'
import chai from 'chai'
import supertest from 'supertest'

mongoose.connect('mongodb+srv://lpoli99:WQfT3VD9F3ZN0f85@cluster0.ysxae6l.mongodb.net/coderhouse?retryWrites=true&w=majority')
const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Products Daos', ()=>{
    before(function(){
        this.productsService = new ProductsService
    })
    beforeEach(function(){
        this.timeout(5000)
    })
    it('Nuestro daos debe obtener un array con 10 productos', async function(){
        const {statusCode, ok, _body} = await requester.get('/api/products')
        expect(Array.isArray(_body)).to.be.ok
    })
    it('Nuestro daos debe obtener un unico producto', async function(){
        const {statusCode, ok, _body} = await requester.get('/api/products/asojfhnboifjbv98g4d56gp1')
        expect(typeof _body, 'object').to.be.ok
    })
    it('Nuestro daos debe poder agregar un producto', async function(){
        let ProductMock = {
            owner: 'admin',
            title: 'TEST',
            description: 'TEST',
            code: 500,
            price: 1000,
            status: 'true',
            stock: 3,
            category: 'mails',
            thumbnail: 'link',
        }
        const {statusCode, ok, _body} = await requester.post('/api/products').send(ProductMock)
        console.log('Hola StatusCode', statusCode)
        console.log('Hola Ok', ok)
        console.log('Hola _body', _body)
        expect(_body._id).to.be.ok
    })
})