import mongoose from 'mongoose'
import CartsService from '../src/services/cartsService.js'
import chai from 'chai'
import supertest from 'supertest'

mongoose.connect('mongodb+srv://lpoli99:WQfT3VD9F3ZN0f85@cluster0.ysxae6l.mongodb.net/coderhouse?retryWrites=true&w=majority')
const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Carts Daos', ()=>{
    before(function(){
        this.cartsService = new CartsService
    })
    beforeEach(function(){
        this.timeout(5000)
    })
    it('Nuestro daos debe crear un carrito nuevo', async function(){
        const {statusCode, ok, _body} = await requester.post('/api/carts')
        expect(typeof _body.payload, 'object').to.be.ok
    })
    it('Nuestro daos debe agregar productos al carrito', async function(){
        const {statusCode, ok, _body} = await requester.post('/api/carts/dgrebg87re6g21qc65wf74jk/product/fewnb98ew2f1erhljugp0zq1')
        console.log(_body)
        expect(typeof _body.data, 'object').to.be.ok
    })
    it('Nuestro daos debe poder eliminar productos del carrito', async function(){
        const {statusCode, ok, _body} = await requester.delete('/api/carts/dgrebg87re6g21qc65wf74jk/product/fewnb98ew2f1erhljugp0zq1')
        console.log(_body)
        expect(typeof _body.data, 'object').to.be.ok
    })
})