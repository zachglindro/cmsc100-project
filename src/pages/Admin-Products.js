import React from 'react';
import '../styles/Merchant.css';
import ProductCards from '../components/Product-Cards-Admin';

function Products() {
    return (
        <div className='merchant-container'>
            <div className="floating-container">
                <ProductCards />
            </div>
        </div>
    );
}

export default Products;
