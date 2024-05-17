import { getProducts, getProductById, addProduct, deleteProduct } from './product-controller.js';
import { getUsers, getUserByEmail, addUser, deleteUser } from './user-controller.js';
import { getOrderTransaction, getOrderTransactionById, getOrderTransactionByStatus, addOrderTransaction, deleteOrderTransaction } from './order-transaction-controller.js';
import mongoose from 'mongoose';

await mongoose.connect('mongodb+srv://achillesheel0525:jokelangyungpassw0rd@fortesting.q8ml0qz.mongodb.net/?retryWrites=true&w=majority&appName=fortesting');

export default function router(app) {
 	// Allow Cross Origin Resource Sharing
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
  })
  
  // routes for product functions
  app.get('/get-products', getProducts);
  app.get('/get-product-by-id', getProductById);
  app.post('/add-product', addProduct);
  app.post('/delete-product', deleteProduct);

  // routes for user functions
  app.get('/get-users', getUsers);
  app.get('/get-user-by-email', getUserByEmail);
  app.post('/add-user', addUser);
  app.post('/delete-user', deleteUser);

  // routes for order-transaction functions
  app.get('/get-order-transaction', getOrderTransaction);
  app.get('/get-order-transaction-by-id', getOrderTransactionById);
  app.get('/get-order-transaction-by-status', getOrderTransactionByStatus);
  app.post('/add-order-transaction', addOrderTransaction);
  app.post('/delete-order-transaction', deleteOrderTransaction);

}