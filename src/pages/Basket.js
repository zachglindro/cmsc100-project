import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import '../styles/Basket.css';

function Basket() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userId : null;

  const [cart, setCart] = useState([]);

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const fetchCart = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:3001/get-cart?userId=${userId}`);
      setCart(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  });

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const removeFromCart = async (productId) => {
    try {
      await axios.get(`http://localhost:3001/remove-from-cart?userId=${userId}&productId=${productId}`);
      setCart(cart.filter(item => item._id !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };


  const handleCheckout = () => {
    navigate('/checkoutpage');
  };

  return (
    <div className="basket-container">
      <h1 className='basket-heading'> BASKET </h1>
      <p className='total-items'>Total Items: {totalItemsInCart}</p>
      <div className='items-in-basket'>
        <ul className='basket-list'>
          {cart.map(item => (
            <li className='basket-item' key={item._id}>
              <img src={item.img} alt={item.name} className="basket-image" />
              <p className='item-name'><b>{item.name}</b></p>
              <p className='item-qty'>Quantity: {item.quantity}</p>
              <p className='item-amount'>Total Amount: <b>${item.price * item.quantity}</b></p>
              <button className='remove-btn' onClick={() => removeFromCart(item._id)}><b> REMOVE </b></button>
            </li>
          ))}
        </ul>
      </div>
      <p className='sub-total'>Subtotal: <b>${subtotal.toFixed(2)}</b></p>
      <button className='check-out-btn' onClick={handleCheckout} disabled={totalItemsInCart === 0}><b> PROCEED TO CHECK OUT </b></button>
    </div>
  );
}

export default Basket;
