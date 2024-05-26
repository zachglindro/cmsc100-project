// OrderList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Order-Cards.css'; // Make sure you have the appropriate CSS file

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3001/get-orders');
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getOrderStatus = (status) => {
    switch(status) {
      case 0:
        return "Pending";
      case 1:
        return "Completed";
      case 2:
        return "Canceled";
      default:
        return "Unknown";
    }
  };

  const confirmOrder = async (transactionId) => {
    try {
      const res = await axios.put(`http://localhost:3001/confirm-order?transactionId=${transactionId}`);
      console.log(res.data.message); // Optional: Log success message
      fetchOrders(); // Refresh the orders after confirming the order
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  return (
    <div className='orders-body'>
      <div className='order-cards-container'>
        <ul className='order-cards'>
          {orders.map(order => (
            <div className='order-card' key={order._id}>
              <li>
                <p className='info'><b>Product ID:</b> {order.productId}</p>
                <p className='info'><b>User ID:</b> {order.userId}</p>
                <p className='info'><b>Order Quantity:</b> {order.orderQty}</p>
                <p className='info'><b>Order Status:</b> {getOrderStatus(order.orderStatus)}</p>
                <p className='info'><b>Email:</b> {order.email}</p>
                <p className='info'><b>Date Ordered:</b> {new Date(order.dateOrdered).toLocaleDateString()}</p>
                <br />
                {(order.orderStatus === 0) && (
                <center>
                  <button className='confirm-button' onClick={() => confirmOrder(order._id)}>CONFIRM</button>
                </center>  
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrderList;
