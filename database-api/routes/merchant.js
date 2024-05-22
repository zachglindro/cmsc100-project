import { OrderTransaction } from "../models/order-transaction-model.js";

const getOrders = async (req, res) => {
  try {
    const orders = await OrderTransaction.find();
    res.status(201).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to get orders." });
  }
};

const createOrder = async (req,res) => {
  try{
    const {transactionId, productId, orderQty, email, dateOrdered, time} = req.body
    
    const newOrder = new OrderTransaction({transactionId, productId, orderQty, email, dateOrdered, time, orderStatus: 1})
    
    res.status(201).json({message: "Order transaction successfully created"});
  } catch (error) {
    res.status(500).json({error: "Unable to create order transaction"})
  }
}

const confirmOrder = async (req,res) => {
  try {
    transactionId = req.body.transactionId

    await db.collection('Order-transactions').updateOne(
      {transactionId: transactionId},
      { $set: {orderStatus: 2}}
    )

    res.status(201).json({message: "Order successfully confirmed"})
  } catch (error) {

  }
}

export { getOrders };
