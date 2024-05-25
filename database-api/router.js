import mongoose from 'mongoose';
import { register, login, getUsers, getUserByUsername } from './routes/auth.js';
import { addToCart, removeFromCart, getProducts, getProductsSorted, getProductByName, getCart, checkOut, cancelOrder } from './routes/shop.js';
import { getOrders, getActiveOrders, getOrderByUserAndProduct, confirmOrder } from './routes/merchant.js';
import { getCheckoutCart } from './routes/checkout.js';

await mongoose.connect('mongodb+srv://achillesheel0525:jokelangyungpassw0rd@fortesting.q8ml0qz.mongodb.net/farmToTable');

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
  app.get('/get-checkout-cart', getCheckoutCart)
  
  app.get('/get-orders', getOrders)
  app.get('/get-active-orders', getActiveOrders)
  app.get('/get-order-by-user-product', getOrderByUserAndProduct)
  app.get('/confirm-order', confirmOrder)
}