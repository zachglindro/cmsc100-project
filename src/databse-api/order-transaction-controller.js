import mongoose from 'mongoose';

await mongoose.connect('mongodb+srv://achillesheel0525:jokelangyungpassw0rd@fortesting.q8ml0qz.mongodb.net/?retryWrites=true&w=majority&appName=fortesting');

const OrderTransaction = mongoose.model('Order_transaction', {
    transactionId: String,
    productId: String,
    orderQty: Number,
    orderStatus: Number,
    email: String,
    dateOrdered: Date,
    time: String
})

