import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

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
    }

    const userLogout = async () => {
        Cookies.remove('userToken')

        try {
            const response = await fetch('http://localhost:8000/user/log-out', {
                method: 'GET'
            })

            if (response.ok) {
                setUserSignIn(false)
                setUserProfile(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const adminLogin = (adminProfile) => {
        setAdminProfile(adminProfile)
        setAdminSignIn(true)
        navigate('/admin/dashboard')
    }

    const adminLogout = async () => {
        Cookies.remove('adminToken')

        try {
            const response = await fetch('http://localhost:8000/admin/log-out', {
                method: 'GET'
            })

            if (response.ok) {
                setAdminSignIn(false)
                setAdminProfile(null)
                navigate('/admin/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const contextValue = {
        userSignIn,
        userLogin,
        userLogout,
        userProfile,
        setUserProfile,
        setUserSignIn,
        adminLogin,
        adminLogout,
        adminProfile,
        adminSignIn,
        reportCategory,
        setReportCategory,
        navigate,
    }

    return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
}

const useAuthContext = () => {
    return useContext(MyContext)
}

export {
    ContextProvider,
    useAuthContext,
}