import passport from "passport"
import GithubStrategy from 'passport-github2'
import local from "passport-local"
import {UserManagerMongo} from "../Dao/UserManagerMongo.js"
import {CartManagerMongo} from "../Dao/CartManagerMongo.js"
import { createHash, isValidPassword } from "../utils/bcrypt.js"
import UserModel from "../Dao/models/users.model.js"
import UserService from "../services/userService.js"
import config from "../config/env.js"

const localStrategy = local.Strategy
const userManager = new UserManagerMongo
const cartManager = new CartManagerMongo
const userService = new UserService

export const initPassport = () => {

    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done)=>{
        try {
            let user = await UserModel.findById(id)
            done(null, user)
        } catch (error) {
            console.log(error)
            done(error)
        }
    })

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.028bde0c8c884387',
        clientSecret: 'dd8743a22e76114f0f90bd0a2e92eaec4550ef85',
        callbackURL: 'http://localhost:8080/auth/githubcallback'
    }, async (accessToken, refreshToken, profile, done)=>{
        console.log('accessToken: ', accessToken)
        console.log('refreshToken: ', refreshToken)
        console.log('Profile: ', profile)
        try {
            let user = await userService.getUser({email: profile._json.email})
            console.log(profile._json.email)
            if (!user) {
                let newUser = {
                    first_name: profile.username,
                    last_name: profile.username,
                    age: 18,
                    role: 'user',
                    email: profile._json.email,
                    password: '1234'
                }
                let result = await userService.addUser(newUser)
                return done(null, result)
            } 
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('login', new localStrategy(
        {passReqToCallback: true, usernameField: 'username'},
        async (req, username, password, done) => {
            req.logger.info('Passport Login')
            try {
                let user = await userManager.getUser(username)
                if (!user) {
                    req.logger.error('User does not exist!')
                    return done(null, false)
                }
                if(!isValidPassword(user, password)){
                    req.logger.error('Invalid data!')
                    return done(null, false)
                }
                return done(null, user)
            } catch (error) {
                console.log(error)
                return done(error)
            }
        }
    ))
    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done)=>{
            const {first_name, last_name, age, role = 'user', email} = req.body
            console.log('username: ', username)
            console.log('password: ', password)
            if (username === config.adminName && password === config.adminPassword) role = 'admin'
            try {
                let exist = await userManager.getUser(username)
                if(exist) {
                    console.log('User already exist!')
                    return done(null, false)
                }else{
                    let cart = await cartManager.createCart()
                    let user = {first_name, last_name, age, role, email, cart: cart._id, password: createHash(password)}
                    let result = await userManager.addUser(user)
                    console.log('User succesfully created: ', result)
                    return done(null, result)
                }
            } catch (error) {
                console.log(error)
                return done('Could not get user' + error)
            }
        }
    ))
}
