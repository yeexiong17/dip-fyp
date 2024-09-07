import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const MyContext = createContext()

const ContextProvider = ({ children }) => {

    const [userSignIn, setUserSignIn] = useState(false)
    const [adminSignIn, setAdminSignIn] = useState(false)
    const [userProfile, setUserProfile] = useState(null)
    const [adminProfile, setAdminProfile] = useState(null)
    const [socket, setSocket] = useState(null)
    const [adminAllMessage, setAdminAllMessage] = useState([])
    const [allConnectedUser, setAllConnectedUser] = useState([])

    const [reportCategory, setReportCategory] = useState(null)

    const navigate = useNavigate()

    const userLogin = (userProfile) => {
        setUserProfile(userProfile)
        setUserSignIn(true)
    }

    const userLogout = async () => {
        Cookies.remove('userToken')
    }

    const adminLogin = (adminProfile) => {
        setAdminProfile(adminProfile)
        setAdminSignIn(true)
        navigate('/admin/dashboard')
    }

    const adminLogout = async () => {
        Cookies.remove('adminToken')
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
        socket,
        setSocket,
        setAdminAllMessage,
        adminAllMessage,
        setAllConnectedUser,
        allConnectedUser
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