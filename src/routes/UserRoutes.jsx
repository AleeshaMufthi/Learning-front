import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Footer from '../components/common/Footer'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/User/LandingPage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import OtpPass from '../components/common/OtpPass'
import ForgetPassword from '../components/common/ForgetPassword'

const UserRoutes = () => {

  return (
    <>
    <Toaster />
    <Routes>
      <Route path='/' element={<LandingPage />}/>
      <Route path='/signin' element={<Login />} />
      <Route path='/signup' element={<Register />} />
      <Route path='/sendotp' element={<OtpPass />} />
      <Route path='/forgetPassword' element={<ForgetPassword />} />
    </Routes>
    </>
  )
}

export default UserRoutes
