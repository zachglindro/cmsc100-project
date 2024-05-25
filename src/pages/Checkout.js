import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import '../styles/Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userId : null;

  const [cart, setCart] = useState([]);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const amounttopay = subtotal + 45;

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

  const handleConfirmCheckout = async () => {
    try {
      await axios.get(`http://localhost:3001/checkout?userId=${userId}`);
      setCart([]);
      alert('Checkout successful!');
      navigate('/orders');
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <div className='checkout-container'>
      <div className='floating-container'>
        <div className='items-summary-container'>
          <p className='checkout-heading'><b>CHECKOUT</b></p>
          <div className='items-summary'>
            <ul className='checkout-basket-list'>
              {cart.map(item => (
                <li className='checkout-item' key={item._id}>
                  <img src={"https://cosmosmagazine.com/wp-content/uploads/2021/04/GettyImages-1178796552-small.jpg"} alt={item.name} className="checkout-item-image" />
                  <div className='item-details-container'>
                    <p className='checkout-item-name'><b>{item.name}</b></p>
                    <p className='checkout-item-qty'>Quantity: {item.quantity}</p>
                    <p className='checkout-item-amount'><b>${item.price * item.quantity}</b></p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='computation-summary-container'>
          <p className='checkout-subtotal'>Subtotal:  <span className='spacing-subtotal'></span><b>${subtotal.toFixed(2)}</b></p>
          <p className='checkout-sf'>Shipping Fee: <span className='spacing-sf'></span><b>$45.00</b></p>
          <p className='checkout-mop'>Mode of Payment: <span className='spacing-mop'></span><b>Cash on Delivery</b></p>
          <p className='checkout-atp'>Amount to Pay:  <span className='spacing-atp'></span><b>${amounttopay.toFixed(2)}</b></p>
          <button className='confirm-check-out-btn' onClick={handleConfirmCheckout}><b> CONFIRM CHECK OUT </b></button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
