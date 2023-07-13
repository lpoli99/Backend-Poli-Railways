import CustomError from "../errors/CustomError.js"
import EErrors from "../errors/enum.js"
import { generateProductErrorInfo } from "../errors/info.js"

export function validation (req, res, next){
    const {title, description, price, thumbnail, code, stock, category, status} = req.body
    if (!title || !description || !price || !thumbnail || !code || !stock || !category || !status)  {
        CustomError.createError({
            name: 'Product creation error',
            cause: generateProductErrorInfo({title, description, price, thumbnail, code, stock, category, status}),
            message: 'Error trying to create a new product',
            code: EErrors.INVALID_PROPERTIES
        })
        return res.status(401).send({message: 'You must fill all empty spaces!'})
    }
    return next()
}