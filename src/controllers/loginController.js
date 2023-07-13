import { request } from "express"
import config from "../config/env.js"
import UserService from "../services/userService.js"

const userService = new UserService

class LoginController {
    loginRender = (req = request, res)=>{
        res.render('login')
    }

    loginVoid = async (req = request, res)=>{
        const { username, password } = req.body

        try {
            if (username === config.adminName || password === config.adminPassword) {
                req.session.user = username
                req.session.email = username
                req.session.admin = true
                req.session.premium = false
                req.session.usuario = false
                req.logger.info('You are a admin!')
                let last_connection = new Date()
                await userService.updateLastConn(username, last_connection)
                res.redirect('http://localhost:8080/products')
            }else{
                req.session.user = username
                req.session.email = username
                req.session.admin = false
                req.session.premium = false
                req.session.usuario = true
                req.logger.info('You are a user!')
                let last_connection = new Date()
                await userService.updateLastConn(username, last_connection)
                res.redirect('http://localhost:8080/products')
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    failLoginRender = (req = request, res)=>{
        res.send({status: 'error', message: 'Login failed!'})
    }

    registerRender = (req = request, res)=>{
        res.render('register')
    }

    registerVoid = (req = request, res)=>{
        try {
            res.redirect('http://localhost:8080/auth/login')
        } catch (error) {
            console.log(error)
        }
    }

    failRegisterRender = (req = request, res)=>{
        res.send({status: 'error', message: 'Register failed!'})
    }

    logoutVoid = (req = request, res)=>{
        try {
            req.session.destroy(err => {
                if(!err) res.redirect('http://localhost:8080/auth/login')
                else res.send({status:'Logout error', message: err})
            })
        } catch (error) {
            console.log(error)
        }
    }

    githubcallback = (req = request, res)=>{
        req.logger.info('req: ', req.user)
        req.session.user = req.user.first_name
        req.session.email = req.user.email
        req.session.admin = false
        req.session.premium = false
        req.session.usuario = true
        res.redirect('http://localhost:8080/products')
    }
}

export default LoginController