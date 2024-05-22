import React from 'react'
// import { jwtDecode } from 'jwt-decode'
// import './Products.css'
import '../styles/Products.css'
import ProductCards from '../components/Product-Cards'

function Products() {

  return (
    <div className='products-container'>
      <div className="floating-container">
          <ProductCards /> 
      </div>
    </div>
  )
}

export default Products