import { request } from "express"
import ViewsService from "../services/viewsService.js"

const viewsService = new ViewsService

class ViewsController {
    productsRender = async (req = request, res) => {
        const {limit = 1 , page = 1, query} = req.query
        let filter = {}
        query ? filter = {category: query} : filter = {}
        try {
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage} = await viewsService.getProducts(limit, page, filter)
            let data = { products: docs, hasPrevPage, hasNextPage, prevPage, nextPage, page, limit, query, username: req.session.user}
            res.render('home', data)
        } catch (error) {
            console.log(error)
        }
    }

    cartsRender = async (req = request, res) => {
        const {cid} = req.params
        const {limit = 1 , page = 1} = req.query
        console.log(limit)
        try {
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage} = await viewsService.getCartProducts(cid, limit, page)
            let data = docs[0].products
            let datas = {products: data, hasPrevPage, hasNextPage, prevPage, nextPage, page, limit}
            res.render('carts', datas)
        } catch (error) {
            console.log(error)
        }
    }

    realTimeProductsRender = (req = request, res) => {
        res.render('realTimeProducts')
    }

    chat = (req = request, res) => {
        res.render('chat')
    }
}

export default ViewsController