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

// returns a list of products with additional fields for soldQuantity and totalIncome
const generateSalesReportByProduct = async (req,res) => {
  try {
    const orders = await OrderTransaction.find({orderStatus: '1'})
    
    const salesReport = {}

    for (const order of orders) {
      const productId = order.productId
      const product = await Product.findOne({ _id: productId })

      if (product) {
        if (!salesReport[productId]) {
          salesReport[productId] = {
            ...product.toObject(),
            soldQuantity: 0,
            totalIncome: 0
          };
        }

        salesReport[productId].soldQuantity += order.orderQty
        salesReport[productId].totalIncome += order.amountToPay
      }
    }

    res.status(201).json(salesReport);
  } catch (error) {
    res.status(500).json({ error: "Unable to get orders." });
    console.log(error)
  }
}

// input weekly, monthly or annual in query
// return a list of completed order transactions separated by week, month or year
const generateSalesReportByDate = async (req,res) => {
  try {
    const orders = await OrderTransaction.find({orderStatus: '1'});
    
    const salesReport = orders.reduce((acc, order) => {
      const year = order.dateOrdered.getFullYear();
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(order)
      return acc;
    }, {})

    res.status(201).json(salesReport);
  } catch (error) {
    res.status(500).json({ error: "Unable to get orders." });
  }
}

export { getOrders, getActiveOrders, getOrderByUserAndProduct, confirmOrder, generateSalesReportByProduct, generateSalesReportByDate };
