import { ProductManagerMongo } from "../Dao/ProductManagerMongo.js"
import {CartManagerMongo} from "../Dao/CartManagerMongo.js"

const productManagerMongo = new ProductManagerMongo
const cartManagerMongo = new CartManagerMongo

class ViewsService{
    async getProducts(limit, page, filter){
        return await productManagerMongo.getProducts(limit, page, filter)
    }

    async getCartProducts(cid, limit, page){
        return await cartManagerMongo.getCartProducts(cid, limit, page)
    }
}

export default ViewsService