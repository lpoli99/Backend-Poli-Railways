import cartModel from "./models/cart.model.js"

export class CartManagerMongo {

  getCartProducts = async (cid, limit, page) => {
    try {
      const cartProducts = await cartModel.paginate({_id: cid}, {limit: limit, page: page, lean: true})
      return cartProducts
    } catch (error) {
      console.log(error)
    }
  }

  createCart = async () => {
    try {
      let cart = await cartModel.create({products: []})
      return cart     
    } catch (error) {
      console.log(error)
    }
  }

  addProduct = async (cid, pid) => {
    try {
      let cart = await cartModel.findOne({_id: cid})
      let product = cart.products.find(product => product.pid === pid)
      if (product !== undefined) {
        return await cartModel.updateOne(
          {_id: cid},
          {$set: {'products.$[pid]': {'pid': pid, 'quantity': product.quantity + 1}}},
          {arrayFilters: [{"pid.pid": pid}]}
        )
      }
      if (product === undefined) {
        return await cartModel.findByIdAndUpdate(cid, {$push: {'products': {pid: pid, quantity: 1}}})
      }
    } catch (error) {
      console.log(error)
    }
  }

  productArrayUpdate = async (cid, data) => {
    try {
      await cartModel.updateOne(
        {_id: cid},
        {$set: {'products': data}}
      )
    } catch (error) {
      console.log(error)
    }
  }

  deleteProduct = async (cid, pid) => {
    try {
        let cart = await cartModel.findOne({cid: cid})
        let products = cart.products.filter(product => product.pid !== pid)
        console.log(products)
        return await cartModel.updateOne(
            {cid: cid},
            {$set: {'products': products}}
        )
    } catch (error) {
        console.log(error)
    }
  }

  deleteAllCartProducts = async (cid) => {
    try {
        let products = []
        await cartModel.updateOne(
            {_id: cid}, {$set:{'products': products}}
        )
    } catch (error) {
        console.log(error)
    }
  }
}
