import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    const isUserSignedIn = !!localStorage.getItem('token')
    const navigate = useNavigate()

    const handleSignOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

  return (
    <nav className='nav-bar'>
        <div className='logo-div'>
            <h1 className='logo-header'> AuthDB </h1>
        </div>
        <div className='nav-list-div'>
            <ul className='nav-list'>
                { isUserSignedIn ? (
                    <>
                    <Link to='/account'><li> Account </li></Link>
                    <li><button onClick={handleSignOut}> Sign Out </button></li>
                    </>
                ) : (
                    <>
                    <Link to='/login'><li> Login </li></Link>
                    <Link to='/signup'><li> Sign Up </li></Link>
                    </>
                )}
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
