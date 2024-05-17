import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignUp() {
  const [user, setUsers] = useState([])
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [userType, setUserType] = useState('Customer')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = () => {
    axios
    .get('http://localhost:3001/register')
    .then((res) => {
      // console.log(res.data)
    })
  }

  const handleRegister = (event) => {
    event.preventDefault()

    axios
    .post('http://localhost:3001/register', { fname, lname, userType, email, username, password })
    .then(() => {
      alert('Registration Successful!')
      setFname('')
      setLname('')
      setUserType('Customer')
      setEmail('')
      setUsername('')
      setPassword('')
      fetchUsers()
      navigate('/login')
    })
    .catch((error) => {
      console.log('Unable to register user!')
    })
  }

  return (
    <div className='sign-up-container'>
      <div className='sign-up-form-container'>
        <form className='sign-up-form' onSubmit={handleRegister}>
          <label> First Name </label>
          <br />
          <input className='fname-input' type='text' placeholder='First Name' value={fname} onChange={(e) => setFname(e.target.value)} />
          <br />
          <br />
          <label> Last Name </label>
          <br />
          <input className='lname-input' type='text' placeholder='Last Name' value={lname} onChange={(e) => setLname(e.target.value)} />
          <br />
          <br />
          <label> Email </label>
          <br />
          <input className='email-input' type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <br />
          <label> Username </label>
            <br />
          <input className='username-input' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <br />
          <br />
          <label> Password </label>
            <br />
          <input className='password-input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <br />
          {/* button */}
          <button className='sign-up-button' type='submit'> Sign Up </button>
        </form>
      </div>      
    </div>
  )
}

export default SignUp
