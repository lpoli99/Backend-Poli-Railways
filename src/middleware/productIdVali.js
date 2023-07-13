import CustomError from "../errors/CustomError.js"
import EErrors from "../errors/enum.js"
import { generateCartProductErrorInfo } from "../errors/info.js"
import ProductsService from "../services/productsService.js"

const productsService = new ProductsService

export default async function productIdVali (req, res, next){
    const {pid} = req.params
    try {
        let product = await productsService.getProductById(pid)
        console.log('--------product--------', product)
        if (!product) {
            CustomError.createError({
                name: 'Product not found',
                cause: generateCartProductErrorInfo(pid),
                message: 'Error trying to upload products to cart',
                code: EErrors.DATABASE_ERROR
            })
            return res.status(401).send('Product not found!')
        }
        return next()
    } catch (error) {
        console.log(error)
    }
}