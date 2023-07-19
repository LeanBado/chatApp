import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'


const PrivateRoutes = () => {
  const {user} = useAuth()
  return (
    <>
      {user ? <Outlet></Outlet> : <Navigate to='/login'></Navigate>}
    </>
  )
}

export default PrivateRoutes