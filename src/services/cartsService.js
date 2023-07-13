import {CartManagerMongo} from "../Dao/CartManagerMongo.js"

const cartManagerMongo = new CartManagerMongo

class CartsService {
    async createCart(){
        return await cartManagerMongo.createCart()
    }

    async getCartProducts(cid, limit, page){
        return await cartManagerMongo.getCartProducts(cid, limit, page)
    }

    async newProduct(cid, pid){
        return await cartManagerMongo.addProduct(cid, pid)
    }

    async deleteProduct(cid, pid){
        return await cartManagerMongo.deleteProduct(cid, pid)
    }

    async addProduct(cid, pid){
        return await cartManagerMongo.addProduct(cid, pid)
    }

    async deleteAllCartProducts(cid){
        return await cartManagerMongo.deleteAllCartProducts(cid)
    }

    async arrayProductsUpdate(cid, data){
        return await cartManagerMongo.productArrayUpdate(cid, data)
    }
}

export default CartsService