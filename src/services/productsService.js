import { ProductManagerMongo } from "../Dao/ProductManagerMongo.js"
import {ProductsDTO} from "../DTO/productsDto.js"

const productsDTO = new ProductsDTO()
const productManagerMongo = new ProductManagerMongo

class ProductsService {
    async getProducts(limit){
        return await productManagerMongo.getProducts(limit)
    }

    async getProductById(pid){
        return await productManagerMongo.getProductById(pid)
    }

    async addProduct(title, description, price, thumbnail, code, stock, status, category){
        let product = await productsDTO.addProduct(title, description, price, thumbnail, code, stock, status, category)
        console.log("Product: ", product)
        return await productManagerMongo.addProduct(product)
    }

    async updateProduct(pid, obj){
        return await productManagerMongo.updateProduct(pid, obj)
    }

    async deleteProduct(pid){
        return await productManagerMongo.deleteProduct(pid)
    }
}

export default ProductsService