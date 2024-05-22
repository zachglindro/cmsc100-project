import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Product-Cards.css'

function ProductCards() {
    const [products, setProducts] = useState([]);
    const user = null;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:3001/products');
                setProducts(res.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = async (event, productId) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/addToCart', { productId, user });
            const message = response.data;
            const token = response.data.token;

            window.location.reload();
            localStorage.setItem('token', token);
        } catch (error) {
            console.error('Add to Cart Error:', error);
            alert('Add to Cart Error!');
        }
    };

    return (
        <div className='product-cards-container'>
            <ul className='product-cards'>
                {products.map(product => (
                    <div className='product-card' key={product.id}>
                        <li>
                            <center><img src={product.img} alt={product.name} className="product-image" /></center>
                            <p className='product-name'><b><i>{product.name}</i></b></p>
                            <p className='product-price'>${product.price}</p>
                            <p className='product-desc'>{product.description}</p>
                            <br />
                            <center><button className='add-to-cart' onClick={(event) => handleAddToCart(event, product.id)}><b> ADD TO CART </b></button></center>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default ProductCards;
