import { Router } from "express"
import UserController from "../controllers/userController.js"
import uploader from "../utils/uploader.js"

const router = Router()
const userController = new UserController

router.get('/', userController.getusers)
router.get('/premium/:uemail', userController.roleSwitch)
router.get('/changePassword/:token', userController.renderChangePassword)
router.post('/changePassword', userController.changePassword)
router.post('/:uemail/documents', uploader.single('file'), userController.uploadDocument) 

export default router