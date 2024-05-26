import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Admin-Sales.css'

function AdminSales() {
  const [productSales, setProductSales] = useState([]);

  useEffect(() => {
    fetchProductSales();
  }, []);

  const fetchProductSales = async () => {
    try {
      const res = await axios.get('http://localhost:3001/generate-sales-report-by-product');
      setProductSales(res.data);
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
                {productSales.map(sales => (
                  <li key={sales._id} className='product-sales'>
                    <div className='sales-details-div'>
                      <p className='prod-id'><b>Product ID: <br/></b>{sales._id}</p>
                      <p className='prod-name'><b>Product Name: <br/></b>{sales.productName ? sales.productName : sales._id}</p>
                      <p className='prod-sales-qty'><b>Quantity Sold: </b>{sales.soldQuantity}</p>
                    </div>
                    <div className='prod-sales-div'>
                      <p className='prod-sales-total'>Total Income: <b>${sales.totalIncome ? sales.totalIncome.toFixed(2) : 'N/A'}</b></p>
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
