import { Router } from "express"
import ViewsController from "../controllers/viewsController.js"
import authorization from "../middleware/authorization.js"
import { roleUserVerify } from "../middleware/roleVerify.js"

const router = Router()

const viewsController = new ViewsController

router.get('/products', authorization, viewsController.productsRender)
router.get('/carts/:cid', viewsController.cartsRender)
router.get('/chat', roleUserVerify, viewsController.chat)
router.get('/realtimeproducts',  viewsController.realTimeProductsRender)

export default router