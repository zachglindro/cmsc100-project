import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/SignUp.css'

function SignUp() {
  // const [user, setUsers] = useState([])
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
          <br />
          <div className="sign-up"> SIGN UP </div>
          <input className='input' type='text' placeholder='First Name' value={fname} onChange={(e) => setFname(e.target.value)} />
          {/* <br /> */}
          <br />
          <input className='input' type='text' placeholder='Last Name' value={lname} onChange={(e) => setLname(e.target.value)} />
          {/* <br /> */}
          <br />
          <input className='input' type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          {/* <br /> */}
          <br />
          <input className='input' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          {/* <br /> */}
          <br />
          <input className='input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          {/* <br /> */}
          <div className="bottom-container"> 
          {/* button */}
          <p className="terms"> By clicking sign up, you agree to Field To Feast’s User Agreement, Privacy Policy, and Cookie Policy </p>
          {/* <br /> */}
          <button className='sign-up-button' type='submit'> Sign Up </button>
          <br />
          <p className="log-in-link">Already have an account? Log in<a href='http://localhost:3000/login'> here</a></p>
          <br />
          </div>
        </form>
      </div>      
    </div>
  )
}

export default SignUp
