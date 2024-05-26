// UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Account-Cards.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/register');
      setUsers(res.data);
      setUserCount(res.data.count);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className='accounts-body'>
    <div className='account-cards-container'>
      <ul className='account-cards'>
        {users.map(user => (
          <div className='account-card' key={(user._id)}>
            <li>
              <p className='info'><b>First Name:</b> {user.fname}</p>
              <p className='info'><b>Last Name:</b> {user.lname}</p>
              <p className='info'><b>User Type:</b> {user.userType}</p>
              <p className='info'><b>Username:</b> {user.username}</p>
              <p className='info'><b>Email:</b> {user.email}</p>
              {/* <p><b>Shopping Cart:</b> {user.shoppingCart.map(product => product.name).join(', ')}</p> */}
            </li>
          </div>
        ))}
      </ul>
    </div>
          <div className='total-users-container'>
            <p className='total-number-users'> TOTAL NUMBER OF </p>
            <p className='total-number-users'> USERS </p>
            <p className='total-number-users'> s {userCount} </p>
      </div>
    </div>
  );
}

export default UserList;
