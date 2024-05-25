import mongoose from 'mongoose';

const orderTransactionSchema = new mongoose.Schema({
    productId: {type: String, required: true},
    productName: {type: String, required: true},
    userId: {type: String, required: true},
    orderQty: {type: Number, required: true},
    orderStatus: {type: Number, enum: [0,1,2], required: true},
    email: {type: String, required: true},
    dateOrdered: {type: Date, required: true},
    amountToPay: {type: Number, required: true}
})

const OrderTransaction = mongoose.model('Order_transaction', orderTransactionSchema)

export { OrderTransaction };