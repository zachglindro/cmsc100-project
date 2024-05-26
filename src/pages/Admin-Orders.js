import React from 'react'
import '../styles/Merchant.css'
import OrderList from '../components/MerchantOrders.js'


function AdminOrders() {
  return (
    <div className='merchant-container'>
      <div class="floating-container">
        <OrderList />
      </div>
    </div>
  )
}

export default AdminOrders
