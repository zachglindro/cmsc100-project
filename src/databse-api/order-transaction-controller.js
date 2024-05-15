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


const getOrderTransaction = async (req,res) => {
    const orderTransactions = await OrderTransaction.find({});
    res.send(orderTransactions)
}

const getOrderTransactionById = async (req,res) => {
    const orderTransaction = await Subject.findOne({transactionId: req.query.transactionId});
    res.send(orderTransaction)
}

const getOrderTransactionByProduct = async (req,res) => {
    const orderTransactions = await OrderTransaction.find({productId: req.query.productId})
    res.send(orderTransactions)
}

const getOrderTransactionByStatus = async (req,res) => {
    const orderTransactions = await OrderTransaction.find({orderStatus: req.query.orderStatus})
    res.send(orderTransactions)
}

const addOrderTransaction = async (req,res) => {
    const { transactionId, productId, orderQty, orderStatus, email, dateOrdered, time } = req.body
    const newOrderTransaction = new OrderTransaction({transactionId, productId, orderQty, orderStatus, email, dateOrdered, time})

    const result = await newOrderTransaction.save()

    if (result._id) {
        res.send({ success: true })
    } else {
        res.send({ success: false})
    }
}

const deleteOrderTransaction = async (req,res) => {
    const {transactionId} = req.body

    const result = await OrderTransaction.deleteOne({transactionId})

    if (result.deletedCount == 1) {
        res.send({success: true})
    } else {
        res.send({success: false})
    }
}

export { getOrderTransaction, getOrderTransactionById, getOrderTransactionByStatus, addOrderTransaction, deleteOrderTransaction}