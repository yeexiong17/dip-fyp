import React, { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import Nav from '../../../components/Nav'
import { useAuthContext } from '../../../MyContext'

const Profile = () => {

    const { userProfile, setUserProfile, navigate } = useAuthContext()
    const [inputs, setInputs] = useState({ email: userProfile.user_email, username: userProfile.user_username })
    const [phone, setPhone] = useState(userProfile.user_phone)
    const [editProfile, setEditProfile] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isGeneralTabChecked, setGeneralTabChecked] = useState(true)

    const handleGeneralTabClick = () => {
        setGeneralTabChecked(true)
    }

    const handleSecurityTabClick = () => {
        setGeneralTabChecked(false)
    }

    const handleInput = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    const changePassword = async () => {

        if (newPassword !== confirmPassword) {
            return alert('New password does not match with confirm password')
        }

        const passwordObject = {
            userId: userProfile.user_id,
            oldPassword: oldPassword,
            newPassword: confirmPassword
        }

        try {
            const response = await fetch('http://localhost:8000/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(passwordObject)
            })

            if (response.ok) {
                const responseJson = await response.json()
                alert(responseJson.message)

                setOldPassword('')
                setNewPassword('')
                setConfirmPassword('')
                navigate('/')
            }
            else {
                const responseJson = await response.json()
                alert(responseJson.message)
            }
        }
        catch (error) {
            console.log(error)
        }

    }

    const updateProfile = async () => {

        if (inputs.username == '' || inputs.email == '' || phone == '') {
            return alert('Do not leave blank')
        }

        const updateUserObject = {
            username: inputs.username,
            email: inputs.email,
            phone: phone
        }

        try {
            const response = await fetch(`http://localhost:8000/user/update-profile/${userProfile.user_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(updateUserObject)
            })
            if (response.ok) {
                setUserProfile(value => ({ ...value, user_username: inputs.username, user_email: inputs.email, user_phone: phone }))
            }
        }
        catch (error) {
            console.error('Unable to save username')
        }
        finally {
            setEditProfile(false)
        }

    }

    return (
        <>
            <Nav />

            <div className='h-full pt-20 overflow-y-auto'>
                <div className='flex flex-col items-center'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-4xl font-bold text-center'>Profile</h1>
                    </div>
                    <div role="tablist" className="tabs tabs-bordered w-9/12">
                        <input
                            type="radio"
                            name="my_tabs_2"
                            role="tab"
                            className="tab"
                            aria-label="General"
                            checked={isGeneralTabChecked}
                            onChange={handleGeneralTabClick}
                        />
                        <div role="tabpanel" className="tab-content bg-base-100 rounded-box p-6">
                            <div className="bg-white w-full justify-center flex flex-col gap-5 md:flex-row text-[#161931]">
                                <main className="flex justify-center w-full py-1 md:w-2/3 lg:w-3/4 sm:grow">
                                    <div className="flex justify-center w-full p-2 md:p-4">
                                        <div className="w-5/6 px-6 pb-8 sm:rounded-lg">
                                            <div className="flex flex-col lg:flex-row mx-auto mt-8 gap-x-10">
                                                <div className="flex lg:flex-col sm:flex-row items-center space-y-5">

                                                    <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-neutral-300 dark:ring-neutral-500"
                                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                                                        alt="Bordered avatar" />

                                                    <div className="flex flex-col lg:ml-0 sm:ml-10 space-y-5 mt-6">
                                                        <button type="button"
                                                            className="py-3.5 px-7 text-base font-medium text-neutral-100 focus:outline-none bg-[#35353d] rounded-lg border border-neutral-200 hover:bg-neutral-900 focus:z-10 focus:ring-4 focus:ring-neutral-200 ">
                                                            Change picture
                                                        </button>
                                                        <button type="button"
                                                            className="py-3.5 px-7 text-base font-medium text-neutral-900 focus:outline-none bg-white rounded-lg border border-orange-200 hover:bg-neutral-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-orange-200 ">
                                                            Delete picture
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col justify-center text-[#202142] grow">

                                                    <div className="mb-6 w-full">
                                                        <label htmlFor="first_name"
                                                            className="block mb-2 text-lg font-semibold text-neutral-900">Username</label>
                                                        {
                                                            editProfile
                                                                ? <input type="text" id="username"
                                                                    name='username'
                                                                    className="bg-orange-50 border border-orange-300 text-neutral-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 placeholder:text-neutral-600 block w-full p-2.5 "
                                                                    value={inputs.username}
                                                                    onChange={(e) => { handleInput(e) }}
                                                                />
                                                                : <p className="bg-orange-50 border text-neutral-900 text-sm rounded-lg block w-full p-2.5 ">{userProfile.user_username}</p>
                                                        }
                                                    </div>
                                                    <div className="mb-6 w-full">
                                                        <label htmlFor="first_name"
                                                            className="block mb-2 text-lg font-semibold text-neutral-900">Email</label>
                                                        {
                                                            editProfile
                                                                ? <input type="text" id="email"
                                                                    name='email'
                                                                    className="bg-orange-50 border border-orange-300 text-neutral-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 placeholder:text-neutral-600 block w-full p-2.5 "
                                                                    value={inputs.email}
                                                                    onChange={(e) => { handleInput(e) }}
                                                                />
                                                                : <p className="bg-orange-50 border text-neutral-900 text-sm rounded-lg block w-full p-2.5 ">{userProfile.user_email}</p>
                                                        }
                                                    </div>
                                                    <div className="mb-6 w-full">
                                                        <label htmlFor="first_name"
                                                            className="block mb-2 text-lg font-semibold text-neutral-900">Phone</label>
                                                        <PhoneInput
                                                            placeholder="Enter phone number"
                                                            className="[&>*]:bg-orange-50 bg-orange-50 border border-orange-300 text-neutral-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 w-full p-2.5 "
                                                            value={phone}
                                                            onChange={setPhone}
                                                            disabled={!editProfile ? true : false}
                                                        />
                                                    </div>

                                                    <div className="flex justify-end">
                                                        {
                                                            editProfile
                                                                ? <>
                                                                    <button
                                                                        className="text-neutral-50 bg-red-500  hover:bg-red-600 active:bg-red-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mr-4 text-center dark:bg-orange-600"
                                                                        onClick={() => { setEditProfile(false); setPhone(userProfile.user_phone); setNewUsername(userProfile.user_username) }}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        className="text-neutral-50 bg-green-500  hover:bg-green-600 active:bg-green-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600"
                                                                        onClick={() => { updateProfile() }}
                                                                    >
                                                                        Save
                                                                    </button>
                                                                </>
                                                                : <button
                                                                    className="text-neutral-50 bg-orange-500  hover:bg-orange-600 active:bg-orange-700 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center dark:bg-orange-600"
                                                                    onClick={() => { setEditProfile(true) }}
                                                                >
                                                                    Edit
                                                                </button>
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </div>

                        <input
                            type="radio"
                            name="my_tabs_2"
                            role="tab"
                            className="tab"
                            aria-label="Security"
                            checked={!isGeneralTabChecked}
                            onChange={handleSecurityTabClick}
                        />
                        <div role="tabpanel" className="tab-content bg-base-100 rounded-box p-6">
                            <div>
                                <h1 className='text-2xl font-bold text-neutral-800'>Change Password</h1>
                            </div>

                            <div className='flex mt-6'>
                                <div className='grow'>
                                    <div className='flex items-center mb-4'>
                                        <label className='text-lg font-bold text-neutral-800 mr-8 w-56'>Old Password:</label>
                                        <input type="password" placeholder="Enter old password here..." className="input input-bordered input-sm w-full max-w-xs" onChange={(e) => setOldPassword(e.target.value)} />
                                    </div>
                                    <div className='flex items-center mb-4'>
                                        <label className='text-lg font-bold text-neutral-800 mr-8 w-56'>New Password:</label>
                                        <input type="password" placeholder="Enter new password here..." className="input input-bordered input-sm w-full max-w-xs" onChange={(e) => setNewPassword(e.target.value)} />
                                    </div>
                                    <div className='flex items-center mb-4'>
                                        <label className='text-lg font-bold text-neutral-800 mr-8 w-56'>Confirm New Password:</label>
                                        <input type="password" placeholder="Confirm new password here" className=" input input-bordered input-sm w-full max-w-xs" onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button onClick={() => changePassword()} className={`btn text-neutral-50 ${oldPassword == '' || newPassword == '' || confirmPassword == '' ? 'btn-disabled' : 'btn-success'}`}>Update Password</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
