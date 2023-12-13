import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import './App.css'

import AdminLogin from './pages/Admin/AdminLogin/AdminLogin'
import AdminSignup from './pages/Admin/AdminSignup/AdminSignup'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import Incoming from './pages/Admin/Incoming/Incoming'
import AllReport from './pages/Admin/AllReport/AllReport'
import AdminProfile from './pages/Admin/Profile/Profile'

import Login from './pages/User/Login/Login'
import Signup from './pages/User/Signup/Signup'
import Forgetpw from './pages/User/Forgotpw/Forgetpw'
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

  const location = useLocation()
  const currentPath = location.pathname

  const isAdmin = false

  const [isSignedIn, setIsSignedIn] = useState(true)

  function onSignIn(bool) {
    bool ? setIsSignedIn(true) : setIsSignedIn(false)
  }

  function setSignIn() {
    setIsSignedIn(false)
  }

  return (
    <>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpw" element={<Forgetpw />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/track" element={<Tracking />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/review' element={<Review />} />
        <Route path="/faq" element={<Faq />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/incoming" element={<Incoming />} />
        <Route path="/admin/allreport" element={<AllReport />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
      </Routes>
    </>
  );

}

export default App



// const [route, setRoute] = useState('')
// const [isSignedIn, setIsSignedIn] = useState(false)

// const onRouteChange = (route) => {
//   if (route === 'Home') {
//     setIsSignedIn(true)
//   }
//   else {
//     setIsSignedIn(false)
//   }
// }

// <div>
//   {isSignedIn ? (
//     <>
//       <Nav />
//       <Home />
//     </>
//   ) : <Signup onRouteChange={onRouteChange} />}
// </div>