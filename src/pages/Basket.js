import React, { useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import '../styles/Basket.css'

function Basket() {
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const userId = decodedToken ? decodedToken.userId : null;

    const [cart, setCart] = useState([]);

    const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

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

    const removeFromCart = (itemToRemove) => {
        setCart(cart.filter(item => item._id !== itemToRemove._id));
    };

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="basket-container">
            <h1 className='basket-heading'> BASKET </h1>
            <p className='total-items'>Total Items: {totalItemsInCart}</p>
            <div className='items-in-basket'>
                <ul className='basket-list'>
                    {cart.map(item => (
                        <li className='basket-item' key={item._id}>
                            {/* <img src={item.img} alt={item.name} className="product-image" /> */}
                            <p className='item-name'><b>{item.name}</b></p>
                            <p className='item-qty'>Quantity: {item.quantity}</p>
                            <p className='item-amount'>Total Amount: <b>${item.price * item.quantity}</b></p>
                            <button className='remove-btn' onClick={() => removeFromCart(item)}><b> REMOVE </b></button>
                        </li>
                    ))}
                </ul>
            </div>
            <p className='sub-total'>Subtotal: <b>${subtotal.toFixed(2)}</b></p>
            <button className='check-out-btn'><b> CHECK OUT </b></button>
        </div>
    );
}

export default Basket;
