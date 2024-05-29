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
      const sortedOrders = res.data.sort((a, b) => a.orderStatus - b.orderStatus);
      setOrders(sortedOrders);
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
      const res = await axios.get(`http://localhost:3001/confirm-order?transactionId=${transactionId}`);
      alert('Order confirmed!');
      console.log(res.data.message); // Optional: Log success message
      fetchOrders(); // Refresh the orders after confirming the order
    } catch (error) {
      alert('Error confirming order!');
      console.error('Error confirming order:', error);
    }
  };

  return (
    <div className='orders-body'>
      <p className='order-transactions-heading'><b>ORDER FULFILLMENT</b></p>
      <div className='order-cards-container'>
        <ul className='order-cards'>
          <div className='ordercardtop'> 
            {orders.map(order => (
              <div className='order-card' key={order._id}>
                <li>
                  <p className='info'><b>Transaction ID:</b> {order._id}</p>
                  <p className='info'><b>Product Name:</b> {order.productName}</p>
                  <p className='info'><b>User ID:</b> {order.userId}</p>
                  <p className='info'><b>Order Quantity:</b> {order.orderQty}</p>
                  <p className='info'><b>Order Status:</b> {getOrderStatus(order.orderStatus)}</p>
                  <p className='info'><b>Email:</b> {order.email}</p>
                  <p className='info'><b>Date Ordered:</b> {new Date(order.dateOrdered).toLocaleDateString()}</p>
                  <br />
                </li>
                <div className='button-container'> 
                  <center>
                    <button className='confirm-button' onClick={() => confirmOrder(order._id)} 
                    disabled={order.orderStatus === 1 || order.orderStatus === 2}>
                    {order.orderStatus === 0 ? 'CONFIRM' : order.orderStatus === 2 ? 'CANCELED' : 'DONE'}
                    </button>      
                  </center>  
                </div>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default OrderList;
