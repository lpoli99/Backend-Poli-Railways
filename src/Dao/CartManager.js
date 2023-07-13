import fs from 'fs'

export class CartManager {
  #route = '/src/carts.json'
  constructor() {
    this.path = this.#route
  }

    getCartProducts = async (cid) => {
      try {
        let dB = await fs.promises.readFile(this.path, 'utf-8')
        let cartsDb = JSON.parse(dB)
        let cart = cartsDb[cid - 1]
        return cart.products
      } catch (error) {
        console.log(error)
      }
    }
  
    createCart = async () => {
      try {
        let cart = {}
        if(fs.existsSync(this.path)) {
          let dB = await fs.promises.readFile(this.path, 'utf-8')
          let cartsDb = JSON.parse(dB)
          cart.id = cartsDb[cartsDb.length -1].id + 1
          cart.products = []
          cartsDb.push(cart)
          await fs.promises.writeFile(this.path, `${JSON.stringify(cartsDb, null, 2)}`, 'utf-8')
        } else {
          cart.id = 1
          cart.products = []
          const arrayCart = [cart]
          await fs.promises.writeFile(this.path, `${JSON.stringify(arrayCart, null, 2)}`, 'utf-8')
        }
      } catch (error) {
        console.log(error)
      }  
    }
  
    addToCart = async (cid, pid) => {
      try {
        let dB = await fs.promises.readFile(this.path, 'utf-8')
        let cartsDb = JSON.parse(dB)
        let cart = cartsDb[cid - 1]
        let idx = cart.products.findIndex(product => product.id === pid)
        if (idx !== -1) {
          let product = cart.products[idx]
          product.quantity++
          cart.products[idx] = product
        } else {
          let product = {}
          product.id = pid
          product.quantity = 1
          cart.products = [...cart.products, product]
        }
        cartsDb[cid - 1] = cart
        await fs.promises.writeFile(this.path, JSON.stringify(cartsDb, null, 2), 'utf-8')
      } catch (error) {
        console.log(error)
      }
    }
}

