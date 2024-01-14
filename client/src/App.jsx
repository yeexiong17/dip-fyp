import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

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

  const { userSignIn, adminSignIn, userLogin, userLogout, navigate, adminLogout, adminLogin } = useAuthContext()
  const location = useLocation()

  useEffect(() => {

    const checkUserAuthenticate = async () => {
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
            // If someone purposely change the cookie in storage, then logout
            userLogout()
          }
          else {
            alert('Token Expired. Please Log In Again')
            Cookies.remove('userToken')
            navigate('/login')
          }

        }
      } catch (error) {
        console.error('Error during authentication:', error.message)
      }
    }

    const checkAdminAuthenticate = async () => {
      try {

        const response = await fetch('http://localhost:8000/admin/get-admin-profile', {
          method: 'GET',
          credentials: 'include'
        })

        if (response.ok) {
          const responseJson = await response.json()
          adminLogin(responseJson.adminObject)
          navigate(location.pathname)
        }
        else {
          if (response.status == 401) {
            // If someone purposely change the cookie in storage, then logout
            adminLogout()
          }
          else {
            alert('Token Expired. Please Log In Again')
            Cookies.remove('adminToken')
            navigate('/admin/login')
          }

        }
      } catch (error) {
        console.error('Error during authentication:', error.message)
      }
    }

    checkUserAuthenticate()
    checkAdminAuthenticate()

  }, [])

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />

        {/* Protected Routes */}
        {
          userSignIn
            ? <>
              {/* These routes only available when logged in */}
              <Route path="/*" element={<Navigate to="/" />} />
              <Route path="/track" element={<Tracking />} />
              <Route path="/report" element={<ReportForm />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/review' element={<Review />} />
            </>
            : <>
              {/* Since we have logged in, we do not need these routes anymore */}
              <Route path="/*" element={<Navigate to="/login" />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forget-password" element={<Forgetpw />} />
              <Route path="/reset-password/:userId/:token" element={<Resetpw />} />
            </>
        }

        {
          adminSignIn
            ? <>
              {/* These routes only available when logged in */}
              <Route path="/admin/*" element={<Navigate to="/admin/dashboard" />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/addcategory" element={<AddCategory />} />
              <Route path="/admin/incoming" element={<Incoming />} />
              <Route path="/admin/allreport" element={<AllReport />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
            </>
            : <>
              {/* Since we have logged in, we do not need these routes anymore */}
              <Route path="/admin/*" element={<Navigate to="/admin/login" />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/signup" element={<AdminSignup />} />
              <Route path="/admin/forget-password" element={<AdminForgetpw />} />
              <Route path="/admin/reset-password/:adminId/:token" element={<AdminResetpw />} />
            </>
        }

      </Routes>
    </>
  );

}

export default App
