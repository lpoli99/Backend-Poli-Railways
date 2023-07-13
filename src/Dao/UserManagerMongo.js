import UserModel from "./models/users.model.js"

export class UserManagerMongo{

    addUser = async (user) =>{
        try {
            return await UserModel.create(user)
        } catch (error) {
            console.log(error)
        }
    }

    getUsers = async() =>{
        try {
            let users = await UserModel.find()
            return users
        } catch (error) {
            console.log(error)
        }
    }

    getUser = async(email) =>{
        try {
            let user = await UserModel.findOne({email: email})
            return user
        } catch (error) {
            console.log(error)
        }
    }

    updateUser = async(email, password) =>{
        try {
            console.log('MongoUserDao')
            console.log('Email MongoUserDao: ', email)
            console.log('Password MongoUserDao: ', password)
            let user = await UserModel.findOne({email: email})
            let changeUser = {
                first_name: user.first_name,
                last_name: user.last_name,
                age: user.age,
                role: user.role,
                email: user.email,
                cart: user.cart,
                password: password
            }
            console.log('User: ', user)
            console.log('User Password: ', user.password)
            await UserModel.findOneAndDelete({_id: user._id})
            console.log('User deleted!')
            let newUser = await UserModel.create(changeUser)
            console.log('New User: ', newUser)
            return newUser
        } catch (error) {
            console.log(error)
        }
    }

    updateRole = async(email, role) =>{
        try {
            let user = await UserModel.updateOne(
                {email: email},
                {$set: {'role': role}}
            )
            return user
        } catch (error) {
            console.log(error)
        }
    }

    updateLastConn = async(email, data) => {
        try {
            let user = await UserModel.updateOne(
                {email: email},
                {$set: {'last_connection': data}}
            )
            return user
        } catch (error) {
            console.log(error)
        }
    }

    uploadDoc = async(email, data) => {
        try {
            console.log('Data Manager', data)
            let user = await UserModel.updateOne(
                {email: email},
                {$set: {'documents': data}}
            )
            return user
        } catch (error) {
            console.log(error)
        }
    }

}
