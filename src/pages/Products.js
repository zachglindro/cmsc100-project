import React, { useState } from 'react';
import '../styles/Products.css';
import ProductCards from '../components/Product-Cards';

function Products() {
    const [sortAttribute, setSortAttribute] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSortAttributeChange = (event) => {
        setSortAttribute(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    return (
        <div className='products-container'>
            <div className="floating-container">
                <div className='drop-down-container'>
                    <label htmlFor="sort-attribute-menu">Sort by: </label>
                    <select id="sort-attribute-menu" onChange={handleSortAttributeChange}>
                        <option value="name">Name</option>
                        <option value="type">Type</option>
                        <option value="price">Price</option>
                        <option value="quantity">Quantity</option>
                    </select>

                    <label htmlFor="sort-order-menu">Order: </label>
                    <select id="sort-order-menu" onChange={handleSortOrderChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <ProductCards sortAttribute={sortAttribute} sortOrder={sortOrder} />
            </div>
        </div>
    );
}

export default Products;
