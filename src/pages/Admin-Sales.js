import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Admin-Sales.css';

function AdminSales() {
  const [productSales, setProductSales] = useState([]);
  const [salesReport, setSalesReport] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [sortOption, setSortOption] = useState('year'); // Default sorting option

  useEffect(() => {
    fetchProductSales();
    fetchSalesReport();
  }, []);

  const fetchProductSales = async () => {
    try {
      const res = await axios.get('http://localhost:3001/generate-sales-report-by-product');
      const salesData = res.data;
      setProductSales(salesData);
      calculateTotalSales(salesData);
    } catch (error) {
      console.error('Error fetching product sales:', error);
    }
  };

  const fetchSalesReport = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/generate-sales-report-by-date?sortBy=${sortOption}`);
      const reportData = res.data;
      setSalesReport(reportData);
    } catch (error) {
      console.error('Error fetching sales report:', error);
    }
  };

  const calculateTotalSales = (reportData) => {
    const total = reportData.reduce((sum, report) => sum + (report.totalIncome || 0), 0);
    setTotalSales(total);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value); 
    fetchSalesReport();
  };
  

  return (
    <div className='admin-sales-container'>
      <div className="floating-container">
        <div className='sales-container'>
          <div className='drop-down-container'>
            <p className='sales-heading'><b>SALES REPORT</b></p>
            <label className='sort-report' htmlFor="sort-report-menu"><b>SORT BY:</b></label>
            <select id="sort-report-menu" value={sortOption} onChange={handleSortChange}>
              <option value="year">Annual</option>
              <option value="month">Monthly</option>
              <option value="week">Weekly</option>
            </select>
          </div>
          <div className='trans-sales-summary-table'>
            <ul className='trans-sales-summary'>
              {salesReport.map(report => (
                <li key={report._id} className='trans-sales'>
                  <div className='trans-sales-details-div'>
                    <h1 className='report-date'><b>{report.date}</b></h1>
                    <p className='report-total-income'><b>Total Income: </b> ${report.totalIncome ? report.totalIncome.toFixed(2) : 'N/A'}</p>
                    <p className='report-prod-summary'><b> Products Summary: </b>{report.productSummary.join(', ')}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='transactions-table-header'>
          <ul className='transactions-tabler-header-list'>
            <div className='trans-details-heading'>
              <h1>PRODUCTS SALES</h1>           
            </div>
          </ul>
        </div>
          <div className='sales-summary-table'>
            <ul className='sales-summary'>
                {productSales.map(sales => (
                  <li key={sales._id} className='product-sales'>
                    <div className='sales-details-div'>
                      <p className='prod-id'><b>Product ID: <br/></b>{sales._id}</p>
                      <p className='prod-name'><b>Product Name: <br/></b>{sales.name ? sales.name : sales._id}</p>
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

export default AdminSales
