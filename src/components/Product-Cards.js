import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import '../styles/Product-Cards.css';

function ProductCards() {
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const userId = decodedToken ? decodedToken.userId : null;

    const [products, setProducts] = useState([]);

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
            <ul className='product-cards'>
                {products.map(product => (
                    <div className='product-card' key={product._id}>
                        <li>
                            <center><img src={product.img} alt={product.name} className="product-image" /></center>
                            <p className='product-name'><b><i>{product.name}</i></b></p>
                            <p className='product-price'>${product.price}</p>
                            <p className='product-desc'>{product.description}</p>
                            <br />
                            <center><button className='add-to-cart' onClick={(event) => handleAddToCart(event, product._id, userId)}><b> ADD TO CART </b></button></center>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default ProductCards;
