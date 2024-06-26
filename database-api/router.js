import mongoose from 'mongoose';
import { register, login, getUsers, getUserByUsername } from './routes/auth.js';
import { addToCart, removeFromCart, getProducts, getProductsSorted, getProductByName, getCart, checkOut, getUserOrderTransactions, cancelOrder } from './routes/shop.js';
import { getOrders, getActiveOrders, getOrderByUserAndProduct, confirmOrder, generateSalesReportByProduct, generateSalesReportByDate, incrementProductStock, decrementProductStock } from './routes/merchant.js';
import { connectionString } from './secrets.js';

await mongoose.connect(connectionString);

export default function router(app) {
 	// Allow Cross Origin Resource Sharing
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
  })

  app.post('/register', register)
  app.get('/register',  getUsers)
  app.post('/login', login)
  app.get('/get-user-by-username', getUserByUsername)


  app.get('/products', getProducts);
  app.get('/get-product-by-name', getProductByName)
  app.get('/products-sorted', getProductsSorted)
  app.post('/add-to-cart', addToCart)
  app.get('/remove-from-cart', removeFromCart)
  app.get('/get-cart', getCart)
  app.get('/checkout', checkOut)
  app.get('/cancel-order', cancelOrder)
  app.get('/get-user-orders', getUserOrderTransactions)
  
  app.get('/get-orders', getOrders)
  app.get('/get-active-orders', getActiveOrders)
  app.get('/get-order-by-user-product', getOrderByUserAndProduct)
  app.get('/confirm-order', confirmOrder)
  app.get('/generate-sales-report-by-product', generateSalesReportByProduct)
  app.get('/generate-sales-report-by-date', generateSalesReportByDate)
  app.put('/increment-stock', incrementProductStock);
  app.put('/decrement-stock', decrementProductStock);
}