import { Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Customer from './pages/Customer';
import Merchant from './pages/Merchant';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Basket from './pages/Basket.js';
import Checkout from './pages/Checkout.js';
import AdminAccounts from './pages/Admin-Accounts.js';
import AdminProducts from './pages/Admin-Products.js';
import AdminOrders from './pages/Admin-Orders.js';
import AdminSales from './pages/Admin-Sales.js';
import { jwtDecode } from 'jwt-decode';

function App() {
  const token = localStorage.getItem('token');
  const isUserSignedIn = !!token;
  const decodedToken = token ? jwtDecode(token) : null;
  const userType = decodedToken ? decodedToken.userType : null;

  console.log(token);

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        {/* Render routes for customers */}
        {isUserSignedIn && userType === 'customer' && (
          <>
            <Route path='/customer' element={<Customer />} />
            <Route path='/products' element={<Products />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/checkoutpage' element={<Checkout />} />
          </>
        )}
        {/* Render routes for merchants */}
        {isUserSignedIn && userType === 'merchant' && (
          <>
            <Route path='/merchant' element={<Merchant />} />
            <Route path='/admin-accounts' element={<AdminAccounts />} />
            <Route path='/admin-products' element={<AdminProducts />} />
            <Route path='/admin-orders' element={<AdminOrders />} />
            <Route path='/admin-sales' element={<AdminSales />} />
          </>
        )}
        {/* Redirect to login if user is not signed in */}
        {!isUserSignedIn && <Route path='/login' element={<Login />} />}
      </Routes>      
    </div>
  );
}

export default App;
