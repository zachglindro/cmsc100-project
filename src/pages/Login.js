import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../styles/Login.css"
import logo from '../assets/welcome/logo.png'


function Login() {
    // const [users, setUsers] = useState([])
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
            const token = response.data.token
    
            alert(message)
            setUsername('')
            setPassword('')
            fetchUsers();
    
            if (userType === 'merchant') {
                navigate('/merchant')
            } else {
                navigate('/customer')
            }
    
            window.location.reload();
            localStorage.setItem('token', token)
        } catch (error) {
            console.error('Login Error:', error)
            alert('Login Error!')
        }
    }

    return (
        <div className='log-in-container'>
            <div className='log-in-form-container'>

                <img className="logo" src={logo} alt="Logo" />
                <form className='log-in-form' onSubmit={handleLogin}>

                <br />
                <p className="log-in"><b><center>LOGIN</center></b></p>
                <input className='username-input' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <br />
                <input className='password-input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <br />

                <div className="loginandsignup"> 
                <button className='log-in-button' type='submit'> Login </button>

                <div className="sign-up-link"> 

                <p> No account yet? <a href='http://localhost:3000/signup'> Sign Up </a></p>
                </div>
                </div>
                </form>
            </div>      
        </div>
    )
}

export default Login
