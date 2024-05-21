import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    type: { type: Number, enum: [1, 2, 3], required: true },
    price: { type: Number, required: true},
    quantity: {type: Number, required: true},
})

const Product = mongoose.model('Product', productSchema)

export { Product };