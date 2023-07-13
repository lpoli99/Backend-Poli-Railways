import mongoose from "mongoose"
import UserService from "../src/services/userService.js"
import chai from "chai"
import supertest from "supertest"

mongoose.connect('mongodb+srv://lpoli99:WQfT3VD9F3ZN0f85@cluster0.ysxae6l.mongodb.net/coderhouse?retryWrites=true&w=majority')
const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Sessions Daos', ()=>{
    before(function(){
        this.userService = new UserService
    })
    beforeEach(function(){
        this.timeout(5000)
    })
    it('Nuestro daos debe obtener un usuario por email', async function(){
        let UserMock = {
            username: 'Lucianopoli2805@gmail.com',
            password: '1234'
        }
        const {statusCode, ok, _body} = await requester.post('/auth/login').send(UserMock)
        expect(typeof _body, 'object').to.be.ok
    })
    it('Nuestro daos debe poder cambiar contraseña', async function(){
        let UserMock = {
            username: 'lluvi1882@gmail.com',
            password: 'asd123'
        }
        const {statusCode, ok, _body} = await requester.post('/api/users/changePassword').send(UserMock)
        expect(typeof _body, 'object').to.be.ok
    })
    it('Nuestro daos debe poder cambiar de role', async function(){
        const {statusCode, ok, _body} = await requester.get('/api/users/premium/lluvi1882@gmail.com')
        console.log(_body.data)
        expect(typeof _body, 'object').to.be.ok
    })
})