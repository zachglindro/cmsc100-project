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

    console.log(sortBy)

    const salesReportYearly = orders.reduce((acc, order) => {
      const year = order.dateOrdered.getFullYear();
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(order)
      return acc;
    }, {})

    const salesReportMonthly = orders.reduce((acc, order) => {
      const year = order.dateOrdered.getFullYear();
      const month = months[order.dateOrdered.getMonth()];
      const yearMonth = month.concat(" ", year)

      if (!acc[yearMonth]) {
        acc[yearMonth] = []
      }
      acc[yearMonth].push(order)
      return acc;
    }, {})

    const salesReportWeekly = orders.reduce((acc, order) => {
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
        acc[week] = []
      }
      acc[week].push(order)
      return acc;
    }, {})

    if(sortBy == 'year'){
      res.status(201).json(salesReportYearly);
    } else if(sortBy == 'month'){
      res.status(201).json(salesReportMonthly);
    } else if(sortBy == 'week'){
      res.status(201).json(salesReportWeekly);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to get orders." });
    console.log(error)
  }
}

export { getOrders, getActiveOrders, getOrderByUserAndProduct, confirmOrder, generateSalesReportByProduct, generateSalesReportByDate };
