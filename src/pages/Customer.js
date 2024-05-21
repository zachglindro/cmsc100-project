import React from 'react'
import { jwtDecode } from 'jwt-decode'
import '../styles/Customer.css'

function Customer() {
  const token = localStorage.getItem('token')
  let userFname = null

  if (token) {
    try {
        const decodedToken = jwtDecode(token)
        userFname = decodedToken.userFname
    } catch (error) {
        console.error('Invalid token:', error)
        // Handle the invalid token case
        localStorage.removeItem('token')
    }
  }

  return (
    <div className='customer-container'>
      <div className="floating-container">
        <div className="welcome-greeting">
          WELCOME, <br/> {userFname}!
        </div>
      </div>
    </div>
  )
}

export default Customer
