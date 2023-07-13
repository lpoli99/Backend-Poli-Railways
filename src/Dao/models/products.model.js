import { Schema, model } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = 'products'

const productSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true,
        default: 'admin'
    }
})

productSchema.plugin(mongoosePaginate)

export default model(productCollection, productSchema)