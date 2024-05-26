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

  const handleCancelOrder = async (transactionId, index) => {
    try {
      await axios.get(`http://localhost:3001/cancel-order?transactionId=${transactionId}`);
      setOrderTransactions(prevTransactions => {
        const updatedTransactions = [...prevTransactions];
        updatedTransactions[index].orderStatus = 2; // Marking as cancelled
        return updatedTransactions;
      });
      alert('Are you sure you want to cancel this order?');
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
            <div className='trans-details-heading'>
              
            </div>
            <div className='trans-stat-heading'>
              <li><b>STATUS</b></li>
            </div>
            <div className='trans-atp-heading'>
              <li><b>AMOUNT</b></li>
            </div>
            <div className='cancel-heading'>
              
            </div>
          </ul>
        </div>
        <div className='transactions-table'>
          <div className='transaction-details-container'>
            <ul className='order-transactions-list'>
              {orderTransactions.map((transaction, index) => (
                <li key={transaction._id} className='order-transaction-item'>
                  <div className='trans-details-div'>
                    <p className='trans-id'><b>Transaction ID: <br/></b>{transaction._id}</p>
                    <p className='prod-name'><b>Product Name: <br/></b>{transaction.productName ? transaction.productName : transaction._id}</p>
                    <p className='trans-date'><b>Date Ordered: </b>{new Date(transaction.dateOrdered).toLocaleDateString()}</p>
                    <p className='trans-qty'><b>Quantity: </b>{transaction.orderQty}</p>
                  </div>
                  <div className='trans-stat-div'>
                    <p className='trans-stat'>{transaction.orderStatus === 0 ? 'Pending' : transaction.orderStatus === 1 ? 'Shipped' : transaction.orderStatus === 2 ? 'Canceled' : 'Delivered'}</p>
                  </div>
                  <div className='trans-atp-div'>
                    <p className='trans-atp'>${transaction.amountToPay ? transaction.amountToPay.toFixed(2) : 'N/A'}</p>
                  </div>
                  <div className='trans-cancel-div'>
                    <button className='cancel-btn' onClick={() => handleCancelOrder(transaction._id, index)} disabled={transaction.orderStatus === 1 || transaction.orderStatus === 2}><b> CANCEL </b></button>
                  </div>
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
