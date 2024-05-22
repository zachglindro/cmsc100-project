import mongoose from 'mongoose';

const orderTransactionSchema = mongoose.Schema({
    transactionId: {type: String, required: true},
    productId: {type: String, required: true},
    orderQty: {type: Number, required: true},
    orderStatus: {type: Number, enum: [1,2,3], required: true},
    email: {type: String, required: true},
    dateOrdered: {type: Date, required: true},
    time: {type: TimeRanges, required: true},
})

const OrderTransaction = mongoose.model('Order_transaction', orderTransactionSchema)

export { OrderTransaction };