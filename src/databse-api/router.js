import { getProducts, getProductById, addProduct, deleteProduct } from './product-controller.js';
import { getUsers, getUserByEmail, addUser, deleteUser } from './user-controller.js';

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
}