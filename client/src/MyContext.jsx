import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const MyContext = createContext()

const ContextProvider = ({ children }) => {

    const [userSignIn, setUserSignIn] = useState(false)
    const [adminSignIn, setAdminSignIn] = useState(false)
    const [userProfile, setUserProfile] = useState(null)

    const [reportCategory, setReportCategory] = useState(null)

    const navigate = useNavigate()

    const userLogin = (userProfile) => {
        // Your login logic here

        setUserProfile(userProfile)
        setUserSignIn(true)
        setAdminSignIn(false)
        navigate('/')
    }

    const userLogout = () => {
        // Your logout logic here
        setUserSignIn(false)
        setUserProfile(null)
        location.href = '/login'
    }

    const adminLogin = () => {
        // Admin login logic here
        setAdminSignIn(true)
    }

    const adminLogout = () => {
        // Admin logout logic here
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