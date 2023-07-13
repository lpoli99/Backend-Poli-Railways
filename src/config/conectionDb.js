import { connect } from "mongoose"
import config from "./env.js"

const url = config.mongoUrl

const dbConnection = async () =>{
    try {
        console.log('DB connected')
        return await connect(url)
        
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

export default dbConnection