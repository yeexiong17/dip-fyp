import React, { useEffect, useState } from 'react'

import { useAuthContext } from '../../../MyContext'

import Sidebar from '../../../components/Sidebar'

const LiveChat = () => {

    const { socket, setAdminAllMessage, adminAllMessage, allConnectedUser, setAllConnectedUser } = useAuthContext()

    const [adminMessage, setAdminMessage] = useState(null)
    const [selectedChat, setSelectedChat] = useState(null)

    useEffect(() => {

        const saveUser = (user) => {
            setAllConnectedUser(user)
        }

        const storeMessage = (messageObject) => {
            setAdminAllMessage((prev) => [
                ...prev,
                messageObject
            ])
        }

        const removeMessage = (removeUser) => {
            let updatedMessage = adminAllMessage.filter(message => message.message.username != removeUser.username)

            setAdminAllMessage(updatedMessage)
        }

        const resetSelectedChat = (removeUser) => {
            if (selectedChat && (selectedChat.username == removeUser.username)) {
                setSelectedChat(null)
            }
        }

        const removeUser = (removeUser) => {
            let updatedUser = allConnectedUser.filter(user => user.socketId != removeUser.disconnectedUserSocket)

            setAllConnectedUser(updatedUser)
            removeMessage(removeUser)
            resetSelectedChat(removeUser)
        }

        if (socket) {
            socket.on('sendUser', saveUser)
            socket.on('storeMessage', storeMessage)
            socket.on('removeUser', removeUser)
        }

        return () => {
            if (socket) {
                socket.off('sendUser', saveUser)
                socket.off('storeMessage', storeMessage)
                socket.off('removeUser', removeUser)
            }
        }

    }, [socket, allConnectedUser, adminAllMessage, selectedChat])

    useEffect(() => {
        if (adminAllMessage.length) {
            const chatContainer = document.querySelector('.chat-container')
            chatContainer.scrollTop = chatContainer.scrollHeight
        }
    }, [adminAllMessage])

    const sendMessage = (e) => {
        const adminTextField = document.querySelector('#admin-message')

        if (!adminMessage) {
            setAdminMessage(null)
            adminTextField.value = null
            adminTextField.focus()
            return alert('Message Cannot be empty')
        }

        socket.emit('chatMessage', {
            username: selectedChat.username,
            message: adminMessage,
            socketId: selectedChat.socketId,
            role: 'admin'
        })

        setAdminMessage(null)
        adminTextField.value = null
        adminTextField.focus()
    }

    return (
        <>
            <Sidebar />
            <div className='pl-60 h-full'>
                <div className='flex flex-col h-full px-12 py-4 grow'>

                    <div className="min-w-full border rounded lg:grid lg:grid-cols-3 grow">
                        {/* Left Side */}
                        <div className="border-r border-gray-300 lg:col-span-1">
                            <div className='flex flex-col h-full'>
                                <div className="mx-3 my-3">
                                    <div className="relative text-gray-600">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </span>
                                        <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                                            placeholder="Search" required />
                                    </div>
                                </div>

                                <ul className="w-full h-96 overflow-y-auto grow">
                                    <h2 className="my-2 mx-3 text-lg text-neutral-800">Chats</h2>
                                    {
                                        allConnectedUser.length != 0
                                            ? allConnectedUser.map((user, i) => (
                                                <li key={i}>
                                                    <a
                                                        className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
                                                        onClick={() => { setSelectedChat(user) }}
                                                    >
                                                        <div className="w-full pb-2">
                                                            <div className="flex justify-between">
                                                                <span className="block ml-2 font-semibold text-gray-600">{user.username}</span>
                                                            </div>
                                                            <span className="block ml-2 text-sm text-gray-600 overflow-ellipsis overflow-hidden whitespace-nowrap">
                                                                {
                                                                    adminAllMessage
                                                                        ? adminAllMessage
                                                                            .filter((message) => message.message.username == user.username)
                                                                            .slice(-1)
                                                                            .map((lastMessage) => {
                                                                                return lastMessage.message.text;
                                                                            })
                                                                        : ' '
                                                                }
                                                            </span>
                                                        </div>
                                                    </a>
                                                </li>
                                            ))
                                            : <div className='mx-3'>
                                                No message available
                                            </div>
                                    }
                                </ul>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="hidden lg:col-span-2 lg:block">
                            <div className="flex flex-col w-full h-full">
                                <div className="flex items-center p-3 border-b border-gray-300">
                                    <span className="w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                                    <span className="block ml-2 font-bold text-neutral-800">
                                        {
                                            selectedChat
                                                ? selectedChat.username
                                                : ''
                                        }
                                    </span>
                                </div>

                                <div id="chatbox" className="chat-container flex items-end grow p-4 overflow-y-auto">
                                    <div className='w-full h-96'>
                                        {
                                            selectedChat
                                                ? adminAllMessage.filter((message) => message.message.username == selectedChat.username).map((msg, i) => (
                                                    <div key={i} className={`chat ${msg.role == 'user' ? 'chat-start' : 'chat-end'}`}>
                                                        <div className="chat-header">
                                                            {msg.message.username}
                                                            <time className="ml-2 text-xs opacity-50">{msg.message.time}</time>
                                                        </div>
                                                        <div className="chat-bubble min-h-0 bg-orange-500 text-neutral-50">
                                                            {msg.message.text}
                                                        </div>
                                                    </div>
                                                ))
                                                : ''
                                        }
                                    </div>
                                </div>

                                <div className="flex items-center justify-between w-full mt-auto p-3 border-t border-gray-300">
                                    <input onChange={(e) => { setAdminMessage(e.target.value) }} type="text" placeholder="Message"
                                        disabled={!selectedChat ? true : false}
                                        id='admin-message'
                                        className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                                        name="message" required />
                                    <button onClick={(e) => sendMessage(e)} className='hover:bg-neutral-300 active:bg-neutral-400 p-2 rounded-full'>
                                        <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LiveChat
