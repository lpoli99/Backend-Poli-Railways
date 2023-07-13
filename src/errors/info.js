export const generateProductErrorInfo = (product) => {
    return `One or more properties were incomplete or not valid.
    List of required properties:
        - title: Needs to be a String, recived: ${product.title}
        - description: Needs to be a String, recived: ${product.description}
        - code: Needs to be a Number, recived: ${product.code}
        - price: Needs to be a Number, recived: ${product.price}
        - status: Needs to be a String, recived: ${product.status}
        - stock: Needs to be a Number, recived: ${product.stock}
        - category: Needs to be a String, recived: ${product.category}
        - thumbnail: Needs to be a String, recived: ${product.thumbnail}`
}

export const generateCartProductErrorInfo = (pid) => {
    return `The product that are you looking for weren't in DB.
    List of required properties:
        - pid: Needs to be a mongo object id, recived ${pid}`
}