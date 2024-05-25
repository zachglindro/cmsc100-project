import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import '../styles/Orders.css';

function Orders() {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userId : null;

  const [orderTransactions, setOrderTransactions] = useState([]);

  useEffect(() => {
    const fetchOrderTransactions = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/get-user-orders?userId=${userId}`);
        setOrderTransactions(res.data);
      } catch (error) {
        console.error('Error fetching order transactions:', error);
      }
    };

    fetchOrderTransactions();
  }, [userId]);

  const handleCancelOrder = async (transactionId) => {
    try {
      await axios.get(`http://localhost:3001/cancel-order?transactionId=${transactionId}`);
      setOrderTransactions(orderTransactions.map(transaction =>
        transaction._id === transactionId ? { ...transaction, orderStatus: 2 } : transaction
      ));
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel the order. Please try again.');
    }
  };

  return (
    <div className='orders-container'>
      <div className='orders-floating-container'>
        <p className='order-transactions-heading'><b>ORDER TRANSACTIONS</b></p>
        <div className='transactions-table-header'>
          <ul className='transactions-tabler-header-list'>
            <li className='trans-id-heading'><b>TRANSACTION</b></li>
            <li className='prod-name-heading'><b>PRODUCT</b></li>
            <li className='trans-qty-heading'><b>QUANTITY</b></li>
            <li className='trans-stat-heading'><b>STATUS</b></li>
            <li className='trans-date-heading'><b>DATE</b></li>
            <li className='trans-atp-heading'><b>TOTAL</b></li>
          </ul>
        </div>
        <div className='transactions-table'>
          <div className='transaction-details-container'>
            <ul className='order-transactions-list'>
              {orderTransactions.map(transaction => (
                <li key={transaction._id} className='order-transaction-item'>
                  <p className='trans-id'>{transaction._id.slice(0, 6)}...{transaction._id.slice(-4)}</p>
                  <p className='prod-name'>{transaction.productName ? transaction.productName : transaction._id}</p>
                  <p className='trans-qty'>{transaction.orderQty}</p>
                  <p className='trans-stat'>{transaction.orderStatus === 0 ? 'Pending' : transaction.orderStatus === 1 ? 'Shipped' : transaction.orderStatus === 2 ? 'Canceled' : 'Delivered'}</p>
                  <p className='trans-date'>{new Date(transaction.dateOrdered).toLocaleDateString()}</p>
                  <p className='amt-atp'>${transaction.amountToPay ? transaction.amountToPay.toFixed(2) : 'N/A'}</p>
                  <button className='cancel-btn' onClick={() => handleCancelOrder(transaction._id)}><b> CANCEL </b></button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
