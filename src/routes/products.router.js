import { Router } from "express"
import ProductsController from "../controllers/productsController.js"
import { validation } from "../middleware/validation.js"
import { roleDeleteVerify } from "../middleware/roleVerify.js"

const router = Router()
const productsController = new ProductsController

router.get('/', productsController.getProducts)
router.get('/:pid', productsController.getProductById) 
router.post('/', validation, productsController.addProduct)  
router.put('/:pid', validation, productsController.updateProduct)  
router.delete('/:pid', roleDeleteVerify, productsController.deleteProduct)
  
export default router
