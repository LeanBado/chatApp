import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'


const RegisterPage = () => {
    const {handleUserRegister} = useAuth()
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password1: '',
        password2: '',
     })

    const handleInputChange = (event) => {
        const name = event.target.name
        const value = event.target.value
  
        setCredentials({...credentials, [name]: value})
    }

  return (
    <div className='auth--cotainer'>
        <div className='form--wrapper'>
            <form onSubmit={(event) => handleUserRegister(event, credentials)}>
                <div className='field--wrapper'>
                    <label>Name</label>
                    <input type='text' required name='name' placeholder='Enter your name...' value={credentials.name} onChange={handleInputChange}></input>
                </div>

                <div className='field--wrapper'>
                    <label>Email</label>
                    <input type='email' required name='email' placeholder='Enter your email...' value={credentials.email} onChange={handleInputChange}></input>
                </div>

                <div className='field--wrapper'>
                    <label>Password</label>
                    <input type='password' required name='password1' placeholder='Enter your password...' value={credentials.password1} onChange={handleInputChange}></input>
                </div>

                <div className='field--wrapper'>
                    <label>Confirm Password</label>
                    <input type='password' required name='password2' placeholder='Confirm your password...' value={credentials.password2} onChange={handleInputChange}></input>
                </div>

                <div className='field--wrapper'>
                <input className='btn btn--lg btn--main' type='submit' value='Register'></input>
                </div>

                <p>Do you have an account? Log in <Link to='/login'>HERE</Link></p>

            </form>
        </div>
    </div>
  )
}

export default RegisterPage