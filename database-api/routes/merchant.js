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

    res.status(201).json(Object.values(salesReport));
  } catch (error) {
    res.status(500).json({ error: "Unable to get orders." });
    console.log(error)
  }
}

// input sortBy = year, month or week in query
// sample: 'http://localhost:3001/generate-sales-report-by-date?sortBy=year'
// return a list of completed order transactions separated by week, month or year
const generateSalesReportByDate = async (req,res) => {
  try {
    const orders = await OrderTransaction.find({orderStatus: '1'});
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const sortBy = req.query.sortBy

    var salesReport = {}

    if(sortBy === 'year'){
      salesReport = orders.reduce((acc, order) => {
        const year = order.dateOrdered.getFullYear();
        if (!acc[year]) {
          acc[year] = {
            date: year,
            totalIncome: 0,
            productSummary: []
          }
        }
        acc[year].totalIncome += order.amountToPay
        acc[year].productSummary.push(order.productName.concat(" x", order.orderQty))
        //acc[year].push(order)
        return acc;
      }, {})
    } else if(sortBy === 'month'){
      salesReport = orders.reduce((acc, order) => {
        const year = order.dateOrdered.getFullYear();
        const month = months[order.dateOrdered.getMonth()];
        const yearMonth = month.concat(" ", year)

        if (!acc[yearMonth]) {
          acc[yearMonth] = {
            date: yearMonth,
            totalIncome: 0,
            productSummary: []
          }
        }
        acc[yearMonth].totalIncome += order.amountToPay
        acc[yearMonth].productSummary.push(order.productName.concat(" x", order.orderQty))
        //acc[yearMonth].push(order)
        return acc;
      }, {})
    } else if(sortBy === 'week') {
      salesReport = orders.reduce((acc, order) => {
        const year = order.dateOrdered.getFullYear();
        var monthStart = months[order.dateOrdered.getMonth()];
        var monthEnd = monthStart
        var weekStart = order.dateOrdered.getDate() - order.dateOrdered.getDay();
        var weekEnd = weekStart + 7;
        if(weekEnd > 31){
          monthEnd = months[order.dateOrdered.getMonth()+1]
          weekEnd = weekEnd - 31
        }
        if(weekEnd < 1){
          monthStart = months[order.dateOrdered.getMonth()-1]
          weekEnd = weekStart + 31
        }

        const week = monthStart.concat(" ", weekStart, "-", monthEnd, " ", weekEnd, " ", year)

        if (!acc[week]) {
          acc[week] = {
            date: week,
            totalIncome: 0,
            productSummary: []
          }
        }
        acc[week].totalIncome += order.amountToPay
        acc[week].productSummary.push(order.productName.concat(" x", order.orderQty))
        //acc[week].push(order)
        return acc;
      }, {})
    }

    res.status(201).json(Object.values(salesReport));
  } catch (error) {
    res.status(500).json({ error: "Unable to get orders." });
    console.log(error)
  }
}

const incrementProductStock = async (req, res) => {
  const productId = req.body.productId;

  try {
    const product = await Product.findOne({ _id: productId });

    product.quantity += 1;
    await product.save();

    res.status(201).json({ message: "Product stock incremented" });
  } catch (error) {
    res.status(500).json({ error: "Unable to increment product stock" });
  }
};

const decrementProductStock = async (req, res) => {
  const productId = req.body.productId;

  try {
    const product = await Product.findOne({ _id: productId });

    if (product.quantity === 0) {
      return res.status(400).json({ error: "Product stock is already 0" });
    }

    product.quantity -= 1;
    await product.save();

    res.status(201).json({ message: "Product stock decremented" });
  } catch (error) {
    res.status(500).json({ error: "Unable to decrement product stock" });
  }
};

export {
  getOrders,
  getActiveOrders,
  getConfirmedOrders,
  getOrderByUserAndProduct,
  confirmOrder,
  generateSalesReportByProduct,
  generateSalesReportByDate,
  incrementProductStock,
  decrementProductStock
};
