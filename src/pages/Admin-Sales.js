import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Admin-Sales.css'

function AdminSales() {
  const [confirmedOrders, setConfirmedOrders] = useState([]);

  useEffect(() => {
    fetchConfirmedOrders();
  }, []);

  const fetchConfirmedOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3001/get-confirmed-orders');
      setConfirmedOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className='admin-sales-container'>
      <div className="floating-container">
        <div className='sales-container'>
          <div className='drop-down-container'>
            <p className='sales-heading'><b>SALES REPORT</b></p>
              <label className='sort-report' htmlFor="sort-attribute-menu"><b>SORT BY:</b></label>
              <select id="sort-report-menu" >
                <option className='option' value="recent">Most Recent</option>
                <option className='option' value="weekly">Weekly</option>
                <option className='option' value="monthly">Monthly</option>
                <option className='option' value="annual">Annual</option>
              </select>
          </div>
          <ul className='order-transactions-list'>
              {confirmedOrders.map((transaction, index) => (
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
                </li>
              ))}
            </ul>
        </div>              
      </div>
    </div>
  );
}

export default AdminSales
