import React, { useEffect, useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
} from 'react-image-crop'
import { v4 } from 'uuid'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../../../firebase.config'

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
    const [file, setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

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

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        console.log(e.target.files[0])
        // if (e.target.files[0]) {
        //     document.getElementById('my_modal_3').showModal()
        // }
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
                body: JSON.stringify(passwordObject),
                credentials: 'include'
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

    const updateImage = async () => {

        setIsLoading(true)

        const imageRef = ref(storage, `user/profile/${file.name + v4()}`)

        const uploadTask = uploadBytesResumable(imageRef, file)

        uploadTask.on("state_changed",
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Attachment Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Attachment Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.error("Error uploading attachment:", error);
            },
            async () => {

                const downloadUrl = await getDownloadURL(imageRef);

                const urlObject = {
                    imageUrl: downloadUrl
                }

                try {
                    const response = await fetch(`http://localhost:8000/user/save-user-image/${userProfile.user_id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(urlObject),
                        credentials: 'include'
                    })

                    if (response.ok) {
                        const responseJSON = await response.json()
                        setUserProfile(responseJSON.userObject)
                        alert(responseJSON.message)
                    }
                }
                catch (error) {
                    console.error(error)
                }
                finally {
                    setFile(null)
                    setIsLoading(false)
                    document.getElementById('my_modal_3').close()
                }
            }
        );
    }

    const deleteProfilePicture = async () => {

        let answer = confirm('Are you sure to delete profile picture?')

        if (!answer) {
            return
        }

        try {
            const response = await fetch('http://localhost:8000/user/delete-profile-picture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userProfile.user_id }),
                credentials: 'include'
            })

            if (response.ok) {
                const responseJson = await response.json()
                setUserProfile(responseJson.userObject)
                alert(responseJson.message)
            }
        } catch (error) {

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

                                                    {
                                                        userProfile.user_profile_picture
                                                            ? <img className="object-cover w-36 h-36 p-1 rounded-full ring-2 ring-neutral-300 dark:ring-neutral-500"
                                                                src={userProfile.user_profile_picture}
                                                                alt="Bordered avatar" />
                                                            : <div className="avatar placeholder">
                                                                <div className="bg-neutral text-neutral-content rounded-full w-32">
                                                                    <span className="text-4xl">
                                                                        {userProfile.user_username[0]}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                    }

                                                    <div className="flex flex-col lg:ml-0 sm:ml-10 space-y-5 mt-6">
                                                        <button className="btn px-6 text-base font-medium text-neutral-100 focus:outline-none bg-orange-500 rounded-lg border border-neutral-200 hover:bg-orange-600 focus:z-10 focus:ring-4 focus:ring-neutral-200"
                                                            onClick={() => document.getElementById('my_modal_3').showModal()}>
                                                            Change Picture
                                                        </button>
                                                        <dialog id="my_modal_3" className="modal">
                                                            <div className="modal-box">
                                                                <form method="dialog">
                                                                    {/* if there is a button in form, it will close the modal */}
                                                                    <button
                                                                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                                                        onClick={() => { setFile(null); }}
                                                                        disabled={isLoading ? true : false}
                                                                    >
                                                                        ✕
                                                                    </button>
                                                                </form>
                                                                <h3 className="font-bold text-xl">Change Your Profile Picture</h3>
                                                                <div className='mt-6'>
                                                                    <input
                                                                        type="file"
                                                                        id="fileInput"
                                                                        onChange={(event) => handleFileChange(event)}
                                                                    />
                                                                </div>

                                                                <button
                                                                    className="btn btn-success mt-8 min-h-0 h-10 w-24 text-neutral-50"
                                                                    disabled={file ? false : true}
                                                                    onClick={() => updateImage()}
                                                                >
                                                                    {
                                                                        isLoading
                                                                            ? <span className="loading loading-spinner loading-md"></span>
                                                                            : 'Change'
                                                                    }
                                                                </button>

                                                            </div>
                                                        </dialog>

                                                        <button type="button"
                                                            className={`py-2 px-6 text-base font-medium focus:outline-none bg-white rounded-lg border ${userProfile.user_profile_picture ? 'hover:bg-neutral-100 hover:text-[#202142] border-orange-200 focus:z-10 focus:ring-4 focus:ring-orange-200 text-neutral-900' : 'text-neutral-500'}`}
                                                            onClick={() => deleteProfilePicture()}
                                                            disabled={userProfile.user_profile_picture ? false : true}
                                                        >
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
