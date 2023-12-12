import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import './App.css'

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdmimLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import Forgetpw from "./pages/Forgetpw";
import Menu from "./pages/Menu";
import Tracking from "./pages/Tracking";
import ReportForm from "./pages/ReportForm";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

import Faq from './components/Faq/Faq'
import Review from './components/Review/Review'
import Profile from './components/Profile/Profile'
import Sidebar from './components/Admin/Sidebar/Sidebar'
import Dashboard from './components/Admin/Dashboard/Dashboard'
import Incoming from './components/Admin/Incoming/Incoming'
import AllReport from './components/Admin/AllReport/AllReport'
import AdminProfile from './components/Admin/Profile/Profile';

function App() {

  const location = useLocation()
  const currentPath = location.pathname

  const pathWithoutNav = ['/signin', '/signup', '/admin/dashboard', '/admin/incoming']
  const isAdmin = false

  const [isSignedIn, setIsSignedIn] = useState(true)

  function onSignIn(bool) {
    bool ? setIsSignedIn(true) : setIsSignedIn(false)
  }

  function setSignIn() {
    setIsSignedIn(false)
  }

  const navVisible = !isAdmin && isSignedIn && !pathWithoutNav.includes(currentPath)

  return (
    <>
      {/* {navVisible && <Nav isSignedIn={isSignedIn} setSignIn={setSignIn} />} */}
      {isAdmin && <Sidebar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adlogin" element={<AdmimLogin />} />
        <Route path="/adsignup" element={<AdminSignup />} />
        <Route path="/forgetpw" element={<Forgetpw />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/track" element={<Tracking />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/review' element={<Review />} />
        <Route path="/faq" element={<Faq />} />

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