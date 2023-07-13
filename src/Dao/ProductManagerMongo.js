import productsModel from "./models/products.model.js"

export class ProductManagerMongo {

  getProducts = async (limit, page, filter) => {
    try {
      let products = await productsModel.paginate(filter, {limit: 10, page: page, lean: true,})
      if (!limit) {
        return products
      }
      return products = await productsModel(filter, {limit: limit, page: page, lean: true,})
    } catch (error) {
      console.log(error)
    }
  }

  addProduct = async (product) => {
    try {
      return await productsModel.create(product)
    } catch (error) {
      console.log(error)
    }
  }

  getProductById = async (pid) => {
    try {
      const dB = await productsModel.find()
      return dB.find(product => product.id === pid)
    } catch (error) {
      console.log(error)
    }
  }

  updateProduct = async (pid, prod) => {
    try {
      await productsModel.findOneAndReplace({ _id: pid }, prod)
    } catch (error) {
      console.log(error)
    }
  }

  deleteProduct = async (pid) => {
    try {
      await productsModel.findOneAndDelete({ _id: pid })
    } catch (error) {
      console.log(error)
    }
  }
}
