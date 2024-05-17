import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
      }, [])
    
      const fetchUsers = () => {
        axios
        .get('http://localhost:3001/register')
        .then((res) => {
          console.log(res.data)
        })
      }    

      const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password })
            const { message, userType } = response.data
    
            alert(message)
            setUsername('')
            setPassword('')
            fetchUsers();
    
            if (userType === 'merchant') {
                navigate('/merchant')
            } else {
                navigate('/account')
            }
    
            localStorage.setItem('token', 'dummyToken')
        } catch (error) {
            console.error('Login Error:', error.response.data)
            alert('Login Error!')
        }
    }

    return (
        <div className='log-in-container'>
            <div className='log-in-form-container'>
                <form className='log-in-form' onSubmit={handleLogin}>
                {/* email input */}
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
                <button className='log-in-button' type='submit'> Log-in </button>
                </form>
            </div>      
        </div>
    )
}

export default Login
