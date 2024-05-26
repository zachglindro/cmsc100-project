import React, { useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import '../styles/Product-Cards.css';

function ProductCards() {
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const userId = decodedToken ? decodedToken.userId : null;

    const [products, setProducts] = useState([]);

    const [sortAttribute, setSortAttribute] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSortAttributeChange = (event) => {
        setSortAttribute(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const fetchProducts = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:3001/products-sorted?attribute=${sortAttribute}&order=${sortOrder}`);
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, [sortAttribute, sortOrder]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleAddToCart = async (event, productId, userId) => {
        event.preventDefault();

        try {
            const res = await axios.post('http://localhost:3001/add-to-cart', {
                productId: productId,
                userId: userId
            });
            
            console.log(res.data.message); // Optional: Log success message
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        <div className='product-cards-container'>
            <div className='drop-down-container'>
                  <p className='products-heading'><b>PRODUCTS</b></p>
                    <label className='sort-attribute' htmlFor="sort-attribute-menu"><b>SORT BY:</b></label>
                    <select id="sort-attribute-menu" onChange={handleSortAttributeChange}>
                        <option className='option' value="name">Name</option>
                        <option className='option' value="type">Type</option>
                        <option className='option' value="price">Price</option>
                        <option className='option' value="quantity">Quantity</option>
                    </select>

                    <label className='sort-order' htmlFor="sort-order-menu"><b>ORDER:</b></label>
                    <select id="sort-order-menu" onChange={handleSortOrderChange}>
                        <option className='option' value="asc">Ascending</option>
                        <option className='option' value="desc">Descending</option>
                    </select>
                </div>
            <ul className='product-cards'>
                {products.map(product => (
                    <div className='product-card' key={product._id}>
                        <li>
                            <center><img src={product.img} alt={product.name} className="product-image" /></center>
                            <p className='product-name'><b><i>{product.name}</i></b></p>
                        
                            <center> <p className='product-type'><b><i>{product.type === 1 ? "Crop" : product.type === 2 ? "Poultry" : product.type}</i></b></p></center>
                            <p className='product-price'>${product.price}</p>
                            <p className='product-desc'>{product.description}</p>
                            <p className='product-qty'> Stock: {product.quantity} </p>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default ProductCards;
