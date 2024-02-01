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
import LiveChat from './pages/Admin/LiveChat/LiveChat'

function App() {

  const { userSignIn, adminSignIn, userProfile, adminProfile, userLogin, userLogout, navigate, adminLogout, adminLogin, socket, setSocket, setAllConnectedUser } = useAuthContext()
  const location = useLocation()

  const [openLiveChat, setOpenLiveChat] = useState(false)
  const [startChat, setStartChat] = useState(false)
  const [userMessage, setUserMessage] = useState(null)
  const [allmessage, setAllMessage] = useState([])
  const [adminChatStarted, setAdminChatStarted] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [noAdmin, setNoAdmin] = useState(null)
  const [adminDisconnect, setAdminDisconnect] = useState(false)

  useEffect(() => {

    // if (location.pathname.startsWith('/admin')) {
    //   window.addEventListener('beforeunload', function (e) {
    //     e.preventDefault()

    //     e.returnValue = ''
    //   })
    // }

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
            userLogout()
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
          setAdminChatStarted(true)
        }
        else {
          if (response.status == 401) {
            // If someone purposely change the cookie in storage, then logout
            adminLogout()
          }
          else {
            alert('Token Expired or Invalid. Please Log In Again')
            adminLogout()
            navigate('/admin/login')
          }

        }
      } catch (error) {
        console.error('Error during authentication:', error.message)
      }
    }

    if (location.pathname.startsWith('/admin')) {
      // If admin have not started chat, then start it
      if (!adminChatStarted) {
        checkAdminAuthenticate()
      }
    } else {
      // If is user route, then log user in
      checkUserAuthenticate()
    }

  }, [])

  useEffect(() => {
    if (adminProfile) {
      handleStartChat('admin')
    }
  }, [adminProfile])

  // Scroll down to latest message after sending new message
  useEffect(() => {
    if (allmessage.length && location.path == '/') {
      const chatContainer = document.querySelector('#message-container')
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [allmessage])

  const handleStartChat = async (role) => {

    setAllMessage([])

    const newChatSocket = io('http://localhost:8000')

    newChatSocket.on('connect', () => {

      setStartChat(true)
      setSocket(newChatSocket)

      if (role == 'admin') {
        newChatSocket.emit('createAdminChat', {
          adminId: adminProfile.admin_id,
          username: adminProfile.admin_name,
          socketId: newChatSocket.id
        })
      }

      else if (role == 'user') {
        newChatSocket.emit('userConnected', {
          username: userProfile.user_username,
          socketId: newChatSocket.id,
        })
      }

    })

    newChatSocket.on('message', (messageObject) => {
      // Handle the received message
      setAllMessage((prev) => [
        ...prev,
        messageObject
      ])

      console.log('Received message: ', messageObject)
    })

    newChatSocket.on('storeMessage', (messageObject) => {
      setAllMessage((prev) => [
        ...prev,
        messageObject
      ])
    })

    newChatSocket.on('no-admin', (messageObject) => {
      setNoAdmin(messageObject)
      setAdminDisconnect(true)
    })

    newChatSocket.on('adminSelected', (admin) => {
      setSelectedAdmin(admin)
    })

    newChatSocket.on('adminDisconnect', (messageObject) => {
      setAllMessage((prev) => [
        ...prev,
        messageObject
      ])
      setAdminDisconnect(true)
    })
  }

  const sendMessage = () => {

    const userTextField = document.querySelector('#user-message')

    if (!userMessage) {
      setUserMessage(null)
      userTextField.value = null
      userTextField.focus()
      return alert('Message Cannot be empty')
    }

    socket.emit('chatMessage', {
      username: userProfile.user_username,
      message: userMessage,
      socketId: selectedAdmin.socketId,
      role: 'user'
    })

    setUserMessage(null)
    userTextField.value = null
    userTextField.focus()
  }

  const closeConnection = () => {

    let endChat = confirm('Are you sure you want to end the chat?')

    if (endChat) {
      socket.disconnect()
      setStartChat(false)
      setOpenLiveChat(false)
      setAllMessage([])
      setSelectedAdmin(null)
    }
  }

  return (

    <>
      {
        // If at admin page, do not render user live chat component
        !location.pathname.startsWith('/admin') && userSignIn
          ? <div id='live-chat-container' className='flex flex-col fixed bottom-6 right-6 z-50'>
            {/* Chat Box */}
            {
              openLiveChat
                ?
                <div className="flex-1 mb-4 z-50 w-96 bg-white shadow-xl rounded-lg relative overflow-hidden">
                  {
                    // When click start live chat, change to chat page
                    startChat
                      ?
                      <div id="chat-container" className="w-96">
                        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
                          <div className="px-4 py-3 border-b bg-orange-500 text-white rounded-t-lg flex justify-between items-center">
                            <p className="text-lg font-semibold">
                              {
                                selectedAdmin
                                  ? selectedAdmin.username
                                  : 'Resolve Bot'
                              }
                            </p>
                            <button
                              onClick={() => { closeConnection() }}
                              id="close-chat" className="text-neutral-50 hover:text-neutral-300 active:outline-none active:text-neutral-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </button>
                          </div>
                          <div id="chatbox" className="flex flex-col justify-end h-80 mb-4">
                            <div id='message-container' className='px -4 overflow-y-auto'>

                              {
                                allmessage.length != 0
                                  ? allmessage.map((msg, i) => {
                                    return (
                                      <div key={i} className={`chat ${msg.role == 'user' ? 'chat-end' : 'chat-start'}`}>
                                        <div className="chat-header">
                                          {msg.message.username}
                                          <time className="ml-2 text-xs opacity-50">{msg.message.time}</time>
                                        </div>
                                        <div className="chat-bubble min-h-0 bg-orange-500 text-neutral-50 break-all">
                                          {msg.message.text}
                                          {
                                            noAdmin
                                              ?
                                              <a href="/contact" className='hover:underline'></a>
                                              : null
                                          }
                                        </div>
                                      </div>
                                    )
                                  })
                                  : ''
                              }
                              {
                                noAdmin
                                  ?
                                  <div className='chat chat-start'>
                                    <div className="chat-header">
                                      {
                                        noAdmin.message.username
                                      }
                                      <time className="ml-2 text-xs opacity-50">{noAdmin.message.time}</time>
                                    </div>
                                    <div className="chat-bubble min-h-0 bg-orange-500 text-neutral-50 break-all">
                                      {noAdmin.message.text}
                                      <a href="/contact" className='hover:underline'>http://localhost:5173/contact</a>
                                    </div>
                                  </div>
                                  : null
                              }
                            </div>

                          </div>
                          <div className="p-4 border-t flex">
                            <input disabled={adminDisconnect ? true : false} onChange={(e) => { setUserMessage(e.target.value.trim()) }} id="user-message" type="text" placeholder="Type a message" className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
                            <button onClick={() => { sendMessage() }} id="send-button" className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 active:bg-orange-700 transition duration-300">Send</button>
                          </div>
                        </div>
                      </div>

                      : <>
                        <div className="bg-orange-500 h-full rounded-t-lg absolute w-full z-0"></div>
                        <div className="flex flex-col overflow-y-auto h-full p-4 space-y-4">
                          <div className="flex flex-col z-10 ml-4 text-white">
                            <div className="text-2xl">Hi {userProfile.user_username}</div>
                          </div>
                          <div className="border-0 border-t-4 border-orange-500 rounded z-10 shadow-md text-sm">
                            <div className="bg-white border border-t-0 rounded-t-none rounded-b flex flex-col space-y-2">
                              <div className="px-6 py-4 flex flex-col items-start gap-3">
                                <div className="flex flex-row gap-3">
                                  <div className="flex flex-col justify-center">
                                    <div className="text-gray-500">Click the button below to chat with our admin</div>
                                  </div>
                                </div>
                                <button type="button"
                                  onClick={(e) => { handleStartChat('user') }}
                                  className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-full text-white flex flex-row gap-2 py-3 px-5">
                                  <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                  </svg>
                                  Start Live Chat
                                </button>
                              </div>
                              {/* <div className="border-t px-6 py-4">
                                <a href="#" className="text-sm text-blue-500 hover:text-blue-300">See all your
                                  conversations</a>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </>
                  }
                </div>
                : null
            }

            <button onClick={() => { setOpenLiveChat((prev) => !prev) }} className="flex justify-center items-center ml-auto bg-orange-500 hover:bg-orange-600 active:bg-orange-700 aspect-square w-16 h-16 rounded-full">
              <svg className='mx-auto w-12' xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f97316">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
            </button>
          </div >
          : null
      }

      {/* <div className={`h-full ${startChat && !location.pathname.startsWith('/admin') ? 'pointer-events-none' : null}`}> */}
      <Routes>
        {/* Public Routes */}
        <Route path="/*" element={<Navigate to="/" />} />
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
              <Route path="/track" element={<Tracking />} />
              <Route path="/report" element={<ReportForm />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/review' element={<Review />} />
            </>
            : <>
              {/* Since we have logged in, we do not need these routes anymore */}
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
              <Route path="/admin/livechat" element={<LiveChat />} />
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

      </Routes >
      {/* </div> */}
    </>

  )

}

export default App
