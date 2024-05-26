import React from 'react'
import '../styles/Account-Cards.css'
import UserList from '../components/Account-Cards'

function AdminAccounts() {
  return (
    <div className='accounts-container'>
      <div class="floating-container">
            <UserList />
            
      </div>
    </div>
  )
}

export default AdminAccounts
