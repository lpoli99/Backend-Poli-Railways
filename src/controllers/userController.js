import jwt from 'jsonwebtoken'
import { request } from "express"
import { createHash, isValidPassword } from "../utils/bcrypt.js"
import UserService from "../services/userService.js"
import config from '../config/env.js'
import user from "../Dao/models/users.model.js"

const userService = new UserService

class UserController{
    roleSwitch = async (req = request, res) => {
        const {uemail} = req.params
        try {
            let user = await userService.getUser(uemail)
            if (!user) res.send({status: 'error', message: 'User does not exist'})
            req.session.premium = !req.session.premium
            if (!req.session.premium) {
                let user = await userService.getUser(uemail)
                let ident = user.documents.find(document => document.name === 'Identificacion')
                let comprDom = user.documents.find(document => document.name === 'Comprobante de domicilio')
                let comprEsta = user.documents.find(document => document.name == 'Comprobante de estado de cuenta')
                if (!ident || !comprDom || !comprEsta) res.send({status: 'Error', message: 'No cuenta con la documentacion subida!'})
            }
            let newUser = await userService.updateRole(uemail, `${req.session.premium ? 'premium' : 'user'}`)
            console.log(req.session.premium)
            res.send({status: 'ok', data: newUser})
        } catch (error) {
            console.log(error)
        }
    }

    changePassword = async (req = request, res) => {
        const { email, password } = req.body
        try {
            console.log('email: ', email)
            let user = await userService.getUser(email)
            console.log('user: ', user)
            if (isValidPassword(user, password)) res.send('You cant use the same password')
            console.log('done')
            await userService.updateUser(email, createHash(password))
            res.send('Password changed')
        } catch (error) {
            console.log(error)
        }
    }

    renderChangePassword = async (req = request, res) => {
        const {token} = req.params
        try {
            jwt.verify(token, config.privateKey, (error)=>{
                if(error){
                    res.redirect('http://localhost:8080/api/mail')
                }
                res.render('changePassword')
            })
        } catch (error) {
            console.log(error)
        }
    }

    uploadDocument = async (req = request, res) =>{
        const {name} = req.body
        const {uemail} = req.params
        try {
            if (!req.file) res.status(400).send({status: error, error: "Can't load image"})
            let userData = await userService.getUser(uemail)
            console.log('userData: ', userData)
            if (!userData.documents || userData.documents === []) {
                let user = await userService.uploadDoc(uemail, [{name, reference: req.file.path}])
                res.send({status: 'Ok', link: req.file.path, user})
            }
            let documents = userData.documents
            documents.push({name, reference: req.file.path})
            console.log('Documents: ', documents)
            let user = await userService.uploadDoc(uemail, documents)
            res.send({status: 'Ok', link: req.file.path, user})
        } catch (error) {
            console.log(error)
        }
    }
}

export default UserController