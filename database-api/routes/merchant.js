import { OrderTransaction } from "../models/order-transaction-model.js";
import { Product } from "../models/product-model.js";

const getOrders = async (req, res) => {
  try {
    const orders = await OrderTransaction.find();
    res.status(201).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to get orders." });
  }
};

const getActiveOrders = async (req, res) => {
  try {
    const orders = await OrderTransaction.find({orderStatus: '0'});
    res.status(201).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to get orders." });
  }
}; 

const getConfirmedOrders = async (req, res) => {
  try {
    const orders = await OrderTransaction.find({orderStatus: '1'});
    res.status(201).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to get orders." });
  }
}; 

const getOrderByUserAndProduct = async (req,res) => {
  try{
    const orderTransaction = await OrderTransaction.findOne({userId: req.query.userId, productId: req.query.productId})
    res.status(201).json(orderTransaction)
  } catch (error) {
    res.status(500).json({error: 'Order Transaction not found'})
  }
}

const confirmOrder = async (req,res) => {
  try {
    const orderTransaction = await OrderTransaction.findOne({_id: req.query.transactionId})

    orderTransaction.orderStatus = '1'
    await orderTransaction.save()
    
    let product = await Product.findOne({_id: orderTransaction.productId})
    
    product.quantity = product.quantity - orderTransaction.orderQty
    await product.save()

    res.status(201).json({message: "Order successfully confirmed"})
  } catch (error) {
    res.status(500).json({error: 'Unable to confirm order'})
  }
}

export { getOrders, getActiveOrders, getConfirmedOrders, getOrderByUserAndProduct, confirmOrder };
