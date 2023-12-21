import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const MyContext = createContext()

const ContextProvider = ({ children }) => {

    const [userSignIn, setUserSignIn] = useState(false)
    const [adminSignIn, setAdminSignIn] = useState(true)
    const [userProfile, setUserProfile] = useState(null)

    const navigate = useNavigate()

    const userLogin = () => {
        // Your login logic here
        setUserSignIn(true)
        navigate('/')
    }

    const userLogout = () => {
        // Your logout logic here
        setUserSignIn(false)
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
        adminSignIn,
        userLogin,
        userLogout,
        adminLogin,
        adminLogout,
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