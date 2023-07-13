import { request } from "express"
import CartsService from "../services/cartsService.js"
import ProductsService from "../services/productsService.js"
import TicketService from "../services/ticketService.js"

const cartsService = new CartsService
const ticketService = new TicketService
const productsService =new ProductsService 

class CartsController {
    createCart = async (req = request, res) => {
        let cart = await cartsService.createCart()
        res.send({message: "Cart Created!", payload: cart})
    }

    getCartProducts = async (req = request, res) => {
        const { cid } = req.params
        const {limit = 1 , page = 1, query} = req.query
        try {
            const cartProducts = await cartsService.getCartProducts(cid, limit, page)    
            res.send(cartProducts)
        } catch (error) {
            console.log(error)
        }
    }

    newProduct = async (req = request, res) => {
        const { cid, pid } = req.params
        try {
            let data = await cartsService.addProduct(cid, pid)
            res.send({message: "Product added to Cart!", payload: data})
        } catch (error) {
            console.log(error)
        }
    }

    addProduct = async (req = request, res) => {
        const { cid, pid } = req.params
        try {
            await cartsService.addProduct(cid, pid)
            res.send({message: "Product added to Cart!"})
        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async (req = request, res) => {
        const { cid, pid } = req.params
        try {
            let data = await cartsService.deleteProduct(cid, pid)
            res.send({message: "Product deleted from Cart!", payload: data})
        } catch (error) {
            console.log(error)
        }
    }

    deleteAllCartProducts = async (req = request, res) => {
        const { cid } = req.params
        try {
            await cartsService.deleteAllCartProducts(cid)
            res.send({message: "All products deleted from Cart!"})
        } catch (error) {
            console.log(error)
        }
    }

    arrayProductsUpdate = async (req = request, res) => {
        const { cid } = req.params
        const data = req.body
        try {
            await cartsService.arrayProductsUpdate(cid, data)
            res.send({message: "Products array added to Cart!"})
        } catch (error) {
            console.log(error)
        }
    }

    createTicket = async(req = request, res) =>{
        const {cid} = req.params
        const {limit = 1, page = 1, query} = req.query
        try {
            let sbProducts = []
            let amount = 0
            const cartProducts = await cartsService.getCartProducts(cid, limit, page)
            if(!cartProducts) return res.status(401).send({status: "error", error: cartProducts})
            for(const product of cartProducts.docs[0].products){
                if (product.quantity < product.pid.stock) {
                    let updateProduct = product.pid
                    updateProduct.stock = updateProduct.stock - product.quantity
                    amount += product.pid.price
                    req.logger.info('updateProduct: ', updateProduct)
                    await productsService.updateProduct(product.pid._id, updateProduct)
                }else {
                    sbProducts.push(product)
                }
            }
            if(sbProducts.length === cartProducts.docs[0].products.length) return res.status(401).send({status: 'error', error: sbProducts})
            await cartsService.arrayProductsUpdate(cid, sbProducts)
            req.logger.info('sbProducts: ', sbProducts)
            let purchase_datetime = new Date()
            let purchaser = req.session.email || "test@gmail.com"
            req.logger.info(amount, purchaser, purchase_datetime)
            let ticket = await ticketService.createTicket(purchase_datetime, amount, purchaser)
            res.status(201).send({status: "success", payload: ticket})
        } catch (error) {
            console.log(error)
        }
    }
}

export default CartsController