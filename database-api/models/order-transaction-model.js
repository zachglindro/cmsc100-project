const mongoose = require('mongoose')

const orderTransactionSchema = mongoose.Schema('Order_transaction', {
    transactionId: {type: String, required: true},
    productId: {type: String, required: true},
    orderQty: {type: Number, required: true},
    orderStatus: {type: Number, required: true},
    email: {type: String, required: true},
    dateOrdered: {type: Date, required: true},
    time: {type: TimeRanges, required: true},
})

const OrderTransaction = mongoose.model('Order_transaction', orderTransactionSchema)

module.exports = OrderTransaction