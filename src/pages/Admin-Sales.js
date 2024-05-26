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
          <div className='sales-summary-table'>
            <ul className='sales-summary'>
                {confirmedOrders.map(transaction => (
                  <li key={transaction._id} className='product-sales'>
                    <div className='sales-details-div'>
                      <p className='prod-id'><b>Product ID: <br/></b>{transaction._id}</p>
                      <p className='prod-name'><b>Product Name: <br/></b>{transaction.productName ? transaction.productName : transaction._id}</p>
                      <p className='prod-sales-qty'><b>Quantity Sold: </b>{transaction.orderQty}</p>
                    </div>
                    <div className='prod-sales-div'>
                      <p className='prod-sales-total'>Total Income: <b>${transaction.amountToPay ? transaction.amountToPay.toFixed(2) : 'N/A'}</b></p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <p className='total-sales'>Total Sales: <b>$100,000.00</b></p>
        </div>              
      </div>
    </div>
  );
}

export default AdminSales
