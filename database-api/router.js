import mongoose from 'mongoose';
import { register, login, getUsers, getUserByUsername } from './routes/auth.js';
import { addToCart, getProducts, getProductsSorted, getCart, updateCart } from './routes/shop.js';
import { getOrders } from './routes/merchant.js';

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

  app.post('/register', register);
  app.get('/register',  getUsers);
  app.post('/login', login);
  app.get('/get-user-by-username', getUserByUsername)

  app.get('/products', getProducts);
  app.get('/products-sorted', getProductsSorted);
  app.post('/shop/add-to-cart', addToCart);
  app.get('/shop/get-cart', getCart);
  app.put('/shop/update-cart', updateCart);
  
  app.get('/merchant/orders', getOrders);
}