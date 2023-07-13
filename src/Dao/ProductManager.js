import fs from "fs"

export class ProductManager {
  #route = '/src/products.json'
  constructor() {
    this.path = this.#route
  }

  getProducts = async () => {
    try {
      let dB = await fs.promises.readFile(this.path, 'utf-8')
      let dBJs = JSON.parse(dB)
      return dBJs
    } catch (error) {
      console.log(error)
    }
  }

  addProduct = async (title, description, price, thumbnail, code, stock, status, category) => {
    let product = {title, description, price, thumbnail, code, stock, status, category}
    try {
      if(fs.existsSync(this.path)){
      console.log("File exists");
      let dB = await fs.promises.readFile(this.path, 'utf-8')
      let dBJs = JSON.parse(dB)
      product.id = dBJs[dBJs.length - 1].id + 1
      dBJs.push(product)
      await fs.promises.writeFile(this.path, `${JSON.stringify(dBJs, null, 2)}`, 'utf-8')
    } else{
      product.id = 1
      const arrayProducts = [product]
      await fs.promises.writeFile(this.path, `${JSON.stringify(arrayProducts, null, 2)}`, 'utf-8')
    }
    } catch (error) {
      console.log(error)
    }
  }

  getProductById = async (id) => {
    try {
      let dB = await fs.promises.readFile(this.path, 'utf-8')
      let dBJs = JSON.parse(dB)
      const prodById = dBJs.find(product => product.id === id)
      return prodById
    } catch (error) {
      console.log(error)
    } 
  }

  updateProduct = async (id, prod) => {
    try {
      let dB = await fs.promises.readFile(this.path, 'utf-8')
      let dBJs = JSON.parse(dB)
      let prodById = dBJs.find(product => product.id === id)
      prodById = prod
      prodById.id = id
      dBJs.splice((id - 1), 1, prodById)
      await fs.promises.writeFile(this.path, `${JSON.stringify(dBJs, null, 2)}`, 'utf-8')
    } catch (error) {
      console.log(error)
    }
  }

  deleteProduct = async (id) => {
    try {
      let dB = await fs.promises.readFile(this.path, 'utf-8')
      let dBJs = JSON.parse(dB)
      dBJs.splice((id - 1), 1)
      let counter = 1
      dBJs.forEach(product => {
        product.id = counter++
      })
      await fs.promises.writeFile(this.path, `${JSON.stringify(dBJs, null, 2)}`, 'utf-8')
    } catch (error){
      console.log(error)
    }
  }
}