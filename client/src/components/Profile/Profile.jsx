import React, { useState } from 'react'
import Nav from '../Nav'

const Profile = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isGeneralTabChecked, setGeneralTabChecked] = useState(true);

    const handleGeneralTabClick = () => {
        setGeneralTabChecked(true);
    };

    const handleSecurityTabClick = () => {
        setGeneralTabChecked(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add your logic here for handling form submission with the input values
    };

    const oldPasswordInput = (e) => {
        setOldPassword(e.target.value)
    }

    const newPasswordInput = (e) => {
        setNewPassword(e.target.value)
    }

    const confirmPasswordInput = (e) => {
        setConfirmPassword(e.target.value)
    }

    return (
        <>
            <Nav />
            <div className='h-full pt-20 overflow-y-auto'>
                <div className='flex flex-col items-center'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-4xl font-bold text-center'>Profile</h1>
                    </div>
                    <div role="tablist" className="tabs tabs-lifted w-9/12">
                        <input
                            type="radio"
                            name="my_tabs_2"
                            role="tab"
                            className="tab"
                            aria-label="General"
                            checked={isGeneralTabChecked}
                            onChange={handleGeneralTabClick}
                        />
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                            <div className="bg-white w-full justify-center flex flex-col gap-5 md:flex-row text-[#161931]">
                                <main className="flex justify-center w-full min-h-screen py-1 md:w-2/3 lg:w-3/4 sm:grow">
                                    <div className="flex justify-center w-full p-2 md:p-4">
                                        <div className="w-5/6 px-6 pb-8 sm:rounded-lg">
                                            <div className="flex sm:flex-col lg:flex-row mx-auto mt-8 gap-x-10">
                                                <div className="flex lg:flex-col sm:flex-row items-center space-y-5">

                                                    <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                                                        alt="Bordered avatar" />

                                                    <div className="flex flex-col lg:ml-0 sm:ml-10 space-y-5 mt-6">
                                                        <button type="button"
                                                            className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                                            Change picture
                                                        </button>
                                                        <button type="button"
                                                            className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                                            Delete picture
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col text-[#202142] grow">

                                                    <div className="mb-6 w-full">
                                                        <label htmlFor="first_name"
                                                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your name</label>
                                                        <input type="text" id="first_name"
                                                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                            placeholder="Your first name" value="Jane" required />
                                                    </div>

                                                    <div className="mb-6">
                                                        <label htmlFor="message"
                                                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Bio</label>
                                                        <textarea id="message" rows="4"
                                                            className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                                                            placeholder="Write your bio here..."></textarea>
                                                    </div>

                                                    <div className="flex justify-end">
                                                        <button type="submit"
                                                            className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Save</button>
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
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                            <div>
                                <h1 className='text-2xl font-bold text-neutral-800'>Change Password</h1>
                            </div>

                            <div className='flex mt-6'>
                                <div className='grow'>
                                    <div className='flex items-center mb-4'>
                                        <label className='text-lg font-bold text-neutral-800 mr-8 w-56'>Old Password:</label>
                                        <input type="text" placeholder="Enter old password here..." className="input input-bordered input-sm w-full max-w-xs" onChange={oldPasswordInput} />
                                    </div>
                                    <div className='flex items-center mb-4'>
                                        <label className='text-lg font-bold text-neutral-800 mr-8 w-56'>New Password:</label>
                                        <input type="text" placeholder="Enter new password here..." className="input input-bordered input-sm w-full max-w-xs" onChange={newPasswordInput} />
                                    </div>
                                    <div className='flex items-center mb-4'>
                                        <label className='text-lg font-bold text-neutral-800 mr-8 w-56'>Confirm New Password:</label>
                                        <input type="text" placeholder="Confirm new password here..." className="input input-bordered input-sm w-full max-w-xs" onChange={confirmPasswordInput} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button className={`btn text-neutral-50 ${oldPassword == '' || newPassword == '' || confirmPassword == '' ? 'btn-disabled' : 'btn-success'}`}>Update Password</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Profile
