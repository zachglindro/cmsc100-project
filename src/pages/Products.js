import React from 'react';
import '../styles/Products.css';
import ProductCards from '../components/Product-Cards';

function Products() {
    return (
        <div className='products-container'>
            <div className="floating-container">
                <ProductCards />
            </div>
        </div>
    );
}

export default Products;
