import React, { useState } from 'react'

import { useAuthContext } from '../../../MyContext'

import Sidebar from '../../../components/Sidebar'

const AdminProfile = () => {

    const { adminProfile, navigate } = useAuthContext()

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const oldPasswordInput = (e) => {
        setOldPassword(e.target.value)
    }

    const newPasswordInput = (e) => {
        setNewPassword(e.target.value)
    }

    const confirmPasswordInput = (e) => {
        setConfirmPassword(e.target.value)
    }

    const changePassword = async () => {
        if (newPassword !== confirmPassword) {
            return alert('New password does not match with confirm password')
        }

        const passwordObject = {
            adminId: adminProfile.admin_id,
            oldPassword: oldPassword,
            newPassword: confirmPassword
        }

        try {
            const response = await fetch('http://localhost:8000/admin/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(passwordObject),
                credentials: 'include'
            })

            if (response.ok) {
                const responseJson = await response.json()
                alert(responseJson.message)

                setOldPassword('')
                setNewPassword('')
                setConfirmPassword('')
                navigate('/admin/dashboard')
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

    return (
        <>
            <Sidebar />
            <div className='pl-64 h-full'>
                <div className='flex flex-col h-full px-12 pt-8'>
                    <div>
                        <h1 className='text-2xl font-bold text-neutral-800'>Profile</h1>
                    </div>

                    <div className='flex mt-6 mb-18'>
                        <div className='grow'>
                            <div className='flex items-center mb-4'>
                                <h1 className='text-lg font-bold text-neutral-800 mr-8'>Name:</h1>
                                <p className='text-lg text-neutral-800'>{adminProfile.admin_name}</p>
                            </div>
                            <div className='flex items-center mb-4'>
                                <h1 className='text-lg font-bold text-neutral-800 mr-8'>Email:</h1>
                                <p className='text-lg text-neutral-800'>{adminProfile.admin_email}</p>
                            </div>
                        </div>
                    </div>

                    <div className='mt-20'>
                        <h1 className='text-2xl font-bold text-neutral-800'>Change Password</h1>
                    </div>

                    <div className='flex mt-6'>
                        <div className='grow'>
                            <div className='flex items-center mb-4'>
                                <label className='text-lg font-bold text-neutral-800 mr-8 w-56'>Old Password:</label>
                                <input type="password" placeholder="Enter old password here..." className="input input-bordered input-sm w-full max-w-xs" onChange={oldPasswordInput} />
                            </div>
                            <div className='flex items-center mb-4'>
                                <label className='text-lg font-bold text-neutral-800 mr-8 w-56'>New Password:</label>
                                <input type="password" placeholder="Enter new password here..." className="input input-bordered input-sm w-full max-w-xs" onChange={newPasswordInput} />
                            </div>
                            <div className='flex items-center mb-4'>
                                <label className='text-lg font-bold text-neutral-800 mr-8 w-56'>Confirm New Password:</label>
                                <input type="password" placeholder="Confirm new password here..." className="input input-bordered input-sm w-full max-w-xs" onChange={confirmPasswordInput} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button onClick={() => { changePassword() }} className={`btn text-neutral-50 ${oldPassword == '' || newPassword == '' || confirmPassword == '' ? 'btn-disabled' : 'btn-success'}`}>Update Password</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProfile;
