import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import '../styles/Navbar.css';
import Basket from '../pages/Basket';

function Navbar() {
    const token = localStorage.getItem('token')
    const isUserSignedIn = !!token
    const navigate = useNavigate()
    let userType = null

    if (token) {
        try {
            const decodedToken = jwtDecode(token)
            userType = decodedToken.userType
        } catch (error) {
            console.error('Invalid token:', error)
            // Handle the invalid token case
            localStorage.removeItem('token')
            navigate('/login')
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const handleCustomerProducts = () => {
        navigate('/products')
    }

    const handleCustomerOrders = () => {
        navigate('/orders')
    }

    const handleAdminAccounts = () => {
        navigate('/admin-accounts')
    }

    const handleAdminProducts = () => {
        navigate('/admin-products')
    }

    const handleAdminOrders = () => {
        navigate('/admin-orders')
    }

    const handleAdminSales = () => {
        navigate('/admin-sales')
    }

    const [showSidebar, setShowSidebar] = useState(false);

    const handleCustomerBasket = () => {
        setShowSidebar(true);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    // Conditionally render the navbar based on whether the user is signed in
    if (!isUserSignedIn) {
        return null; // If user is not signed in, return null to hide the navbar
    }

    return (
        <>
            <nav className='nav-bar'>
                <div className='nav-list-div'>
                    <ul className='nav-list'>
                        {userType === 'merchant' && (
                            <>
                                <Link to='/merchant'><li className='dashboard-heading'><b>DASHBOARD</b></li></Link>
                                <li><button className='accounts-btn' onClick={handleAdminAccounts}>ACCOUNTS</button></li>
                                <li><button className='products-btn' onClick={handleAdminProducts}>PRODUCTS</button></li>
                                <li><button className='orders-btn' onClick={handleAdminOrders}>ORDERS</button></li>
                                <li><button className='sales-btn' onClick={handleAdminSales}>SALES</button></li>
                                <li><button className='signout-btn' onClick={handleSignOut}><b>LOG OUT</b></button></li>
                            </>
                        )}
                        {userType === 'customer' && (
                            <>
                                <li><button className='products-btn2' onClick={handleCustomerProducts}>PRODUCTS</button></li>
                                <li><button className='orders-btn2' onClick={handleCustomerOrders}>ORDERS</button></li>
                                <li><button className='basket-btn' onClick={handleCustomerBasket}></button></li>
                                <li><button className='signout-btn2' onClick={handleSignOut}><b>LOG OUT</b></button></li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            {showSidebar && (
                <div className="sidebar-overlay show" onClick={closeSidebar}></div>
            )}
            <div className={`sidebar-container ${showSidebar ? 'show' : ''}`}>
                <button className="close-sidebar-button" onClick={closeSidebar}><b>X</b></button>
                <Basket />
            </div>
        </>
    );
}

export default Navbar;