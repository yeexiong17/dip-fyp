import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const MyContext = createContext()

const ContextProvider = ({ children }) => {

    const [userSignIn, setUserSignIn] = useState(false)
    const [adminSignIn, setAdminSignIn] = useState(false)
    const [userProfile, setUserProfile] = useState(null)
    const [adminProfile, setAdminProfile] = useState(null)

    const [reportCategory, setReportCategory] = useState(null)

    const navigate = useNavigate()

    const userLogin = (userProfile) => {
        setUserProfile(userProfile)
        setUserSignIn(true)
        setAdminSignIn(false)
        navigate('/')
    }

    const userLogout = () => {
        setUserSignIn(false)
        setUserProfile(null)
        location.href = '/login'
    }

    const adminLogin = (adminProfile) => {
        setAdminProfile(adminProfile)
        setAdminSignIn(true)
        setUserSignIn(false)
        navigate('/admin/dashboard')
    }

    const adminLogout = () => {
        setAdminSignIn(false)
    }

    const contextValue = {
        userSignIn,
        userLogin,
        userLogout,
        userProfile,
        setUserProfile,
        adminLogin,
        adminLogout,
        adminProfile,
        adminSignIn,
        reportCategory,
        setReportCategory,
        navigate
    }

    return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
}

const useAuthContext = () => {
    return useContext(MyContext)
}

export {
    ContextProvider,
    useAuthContext
}