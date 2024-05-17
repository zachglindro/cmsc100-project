const mongoose = require('mongoose')

const productSchema = mongoose.Schema('Product', {
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    type: { type: Number, enum: [1, 2, 3], required: true },
    quantity: {type: Number, required: true},
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product