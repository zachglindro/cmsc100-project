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
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userType, setUserType] = useState();
  const navigate = useNavigate();

  // Decode token to get user type
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.userType);
    } else {
      setUserType(null);
    }
  }, [token]);

  // Handle login. Passed as props to Login component 
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserType(null);
    navigate('/');
  };

  return (
    <div className='App'>
      <Navbar handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Login handleLogin={handleLogin} />} />
        <Route path='/login' element={<Login handleLogin={handleLogin} />} />
        <Route path='/signup' element={<SignUp />} />
        {/* Render routes for customers */}
        {token && userType === 'customer' && (
          <>
            <Route path='/customer' element={<Customer />} />
            <Route path='/products' element={<Products />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/checkoutpage' element={<Checkout />} />
          </>
        )}
        {/* Render routes for merchants */}
        {token && userType === 'merchant' && (
          <>
            <Route path='/merchant' element={<Merchant />} />
            <Route path='/admin-accounts' element={<AdminAccounts />} />
            <Route path='/admin-products' element={<AdminProducts />} />
            <Route path='/admin-orders' element={<AdminOrders />} />
            <Route path='/admin-sales' element={<AdminSales />} />
          </>
        )}
        {/* Redirect to login if user is not signed in */}
        {!token && <Route path='*' element={<Navigate to="/login" />} />}
      </Routes>      
    </div>
  );
}

export default App;
