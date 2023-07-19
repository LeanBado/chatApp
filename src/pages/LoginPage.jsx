import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

const LoginPage = () => {

  const {user, handleUserLogin} = useAuth()
  const navigate = useNavigate()

 const [credentials, setCredentials] = useState({
    email: '',
    password: '',
 })

  useEffect(() => {
    if(user){
      navigate('/')
    }
  }, [])

  const handleInputChange = (event) => {
      const name = event.target.name
      const value = event.target.value

      setCredentials({...credentials, [name]: value})
  }
  
  return (
    <div className='auth--cotainer'>
      <div className='form--wrapper'>
        <form onSubmit={(event) => handleUserLogin(event, credentials)}>
          <div className='field--wrapper'>
            <label>Email</label>
            <input type='email' required name='email' placeholder='Enter your email...' value={credentials.email} onChange={handleInputChange}></input>
            <label>Password</label>
            <input type='password' required name='password' placeholder='Enter your password...' value={credentials.password} onChange={handleInputChange}></input>
          </div>
          <div className='field--wrapper'>
            <input className='btn btn--lg btn--main' type='submit' value='Login'></input>
          </div>
          <p>Dont have an account? Register <Link to='/register'>HERE</Link></p>
        </form>
      </div>
   
    </div>
  )
}

export default LoginPage