import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import { useAuthContext } from './MyContext'

import './App.css'

import AdminLogin from './pages/Admin/AdminLogin/AdminLogin'
import AdminSignup from './pages/Admin/AdminSignup/AdminSignup'
import AddCategory from './pages/Admin/AddCategory/AddCategory'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import Incoming from './pages/Admin/Incoming/Incoming'
import AllReport from './pages/Admin/AllReport/AllReport'
import AdminProfile from './pages/Admin/Profile/Profile'
import AdminForgetpw from './pages/Admin/AdminForgetpw/AdminForgetpw'
import AdminResetpw from './pages/Admin/AdminResetpw/AdminResetpw'

import Login from './pages/User/Login/Login'
import Signup from './pages/User/Signup/Signup'
import Forgetpw from './pages/User/Forgotpw/Forgetpw'
import Resetpw from './pages/User/Resetpw/Resetpw'
import Home from './pages/User/Home/Home'
import Menu from './pages/User/Menu/Menu'
import Tracking from './pages/User/Tracking/Tracking'
import ReportForm from './pages/User/ReportForm/ReportForm'
import About from './pages/User/About/About'
import Contact from './pages/User/Contact/Contact'
import Profile from './pages/User/Profile/Profile'
import Review from './pages/User/Review/Review'
import Faq from './pages/User/Faq/Faq'

function App() {

  const { userSignIn, adminSignIn, userLogin, userLogout, navigate, setUserSignIn } = useAuthContext()
  const location = useLocation()

  useEffect(() => {

    const checkAuthenticate = async () => {
      try {

        const response = await fetch('http://localhost:8000/user/get-user-profile', {
          method: 'GET',
          credentials: 'include'
        })

        if (response.ok) {
          const responseJson = await response.json()
          userLogin(responseJson.userObject)
          navigate(location.pathname)
        }
        else {
          if (response.status == 401) {
            userLogout()
          }
          else {
            alert('Token Expired. Please Log In Again')
            navigate('/login')
          }

        }
      } catch (error) {
        console.error('Error during authentication:', error.message)
      }
    }

    checkAuthenticate()

  }, [])

  useEffect(() => {
    console.log(userSignIn);
  }, [userSignIn]);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/forget-password" element={<AdminForgetpw />} />
        <Route path="/admin/reset-password/:adminId/:token" element={<AdminResetpw />} />
        <Route path="/*" element={<Navigate to="/" />} />
        <Route path="/admin/*" element={<Navigate to="/admin/login" />} />

        {/* Protected Routes */}
        {
          !adminSignIn && userSignIn
            ? <>
              <Route path="/track" element={<Tracking />} />
              <Route path="/report" element={<ReportForm />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/review' element={<Review />} />
            </>
            : <>
              <Route path="/login" element={<Login />} />
              <Route path="/forget-password" element={<Forgetpw />} />
              <Route path="/reset-password/:userId/:token" element={<Resetpw />} />
            </>
        }

        {/* Admin Routes */}
        {
          adminSignIn && !userSignIn
            ? <>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/addcategory" element={<AddCategory />} />
              <Route path="/admin/incoming" element={<Incoming />} />
              <Route path="/admin/allreport" element={<AllReport />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
            </>
            : null
        }

      </Routes>
    </>
  );

}

export default App
