import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Admin-Sales.css';

function AdminSales() {
  const [productSales, setProductSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [sortOption, setSortOption] = useState('overall');

  useEffect(() => {
    fetchProductSales();
  }, [sortOption]);

  const fetchProductSales = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/generate-sales-report-by-date?sortBy=${sortOption}`);
      const salesData = res.data;
      const formattedSalesData = formatSalesData(salesData);
      setProductSales(formattedSalesData);
      calculateTotalSales(formattedSalesData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const formatSalesData = (salesData) => {
    const formattedData = [];
    for (const period in salesData) {
      salesData[period].forEach(order => {
        const existingProduct = formattedData.find(product => product._id === order.productId);
        if (existingProduct) {
          existingProduct.soldQuantity += order.orderQty;
          existingProduct.totalIncome += order.amountToPay;
        } else {
          formattedData.push({
            _id: order.productId,
            name: order.productName,
            soldQuantity: order.orderQty,
            totalIncome: order.amountToPay
          });
        }
      });
    }
    return formattedData;
  };

  const calculateTotalSales = (salesData) => {
    const total = salesData.reduce((sum, sales) => sum + (sales.totalIncome || 0), 0);
    setTotalSales(total);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className='admin-sales-container'>
      <div className="floating-container">
        <div className='sales-container'>
          <div className='drop-down-container'>
            <p className='sales-heading'><b>SALES REPORT</b></p>
            <label className='sort-report' htmlFor="sort-attribute-menu"><b>SORT BY:</b></label>
            <select id="sort-report-menu" value={sortOption} onChange={handleSortChange}>
              <option className='option' value="overall">Overall</option>
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
                    <p className='prod-id'><b>Product ID: <br /></b>{sales._id}</p>
                    <p className='prod-name'><b>Product Name: <br /></b>{sales.name ? sales.name : sales._id}</p>
                    <p className='prod-sales-qty'><b>Quantity Sold: </b>{sales.soldQuantity}</p>
                  </div>
                  <div className='prod-sales-div'>
                    <p className='prod-sales-total'>Total Income: <b>${sales.totalIncome ? sales.totalIncome.toFixed(2) : 'N/A'}</b></p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className='total-sales'>Total Sales: <b>${totalSales.toFixed(2)}</b></p>
        </div>
      </div>
    </div>
  );
}

export default AdminSales;
