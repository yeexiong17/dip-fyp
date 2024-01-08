import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { v4 } from 'uuid'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase.config'

import { useAuthContext } from '../MyContext';

function Form() {

    const [inputs, setInputs] = useState({})
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { reportCategory, userProfile, navigate, userValidation } = useAuthContext()

    useEffect(() => {
        const category = reportCategory

        const validate = async () => {
            try {
                await userValidation();
            } catch (error) {
                console.error('Error during user validation:', error);
            }
        };

        validate();

        setInputs(values => ({
            ...values,
            category: category,
            status: 'Incoming',
            review: 0
        }))
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const storeImage = async (reportId) => {

        const imageRef = ref(storage, `report/make/${image.name + v4()}`)

        const uploadTask = uploadBytesResumable(imageRef, image)

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
                    const response = await fetch(`http://localhost:8000/user/save-report-image/${reportId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(urlObject)
                    })

                    if (response.ok) {
                        const responseJSON = await response.json()
                        console.log(responseJSON.message)
                    }
                }
                catch (error) {
                    console.error(error)
                }
                finally {
                    console.log(downloadUrl)
                }
            }
        );

    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        setIsLoading(true)

        if (image == null) {
            return alert('Please attach an image or video')
        }

        try {
            const response = await fetch('http://localhost:8000/user/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...inputs, user_id: userProfile.user_id })
            })

            if (response.ok) {

                const responseJSON = await response.json()

                await storeImage(responseJSON.result.reportId)
                console.log('Report Created Successfully')

            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setImage(null)
            navigate('/menu')
            setIsLoading(false)
        }
    }

    return (
        <div className="pt-16 bg-gray-500 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto ">
                <div className="w-1/2 bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="pb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Incident Report Form
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            {/* <h1 className="pb-4 text-base font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                                Personal Details
                            </h1>

                            <div className="flex gap-10">
                                <div className="w-1/2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Name
                                    </label>
                                    <input
                                        className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="text"
                                        name='username'
                                        value={inputs.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        E-mail
                                    </label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type='email'
                                        name='email'
                                        value={inputs.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <h1 className="text-base font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                                Incident Details
                            </h1> */}

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Fault Category
                                </label>
                                <input type="text" name='category' placeholder={reportCategory} className="input input-bordered disabled:placeholder:text-neutral-600 disabled:placeholder:font-semibold w-full" disabled />
                                {/* <select className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                    <option>-- Select --</option>
                                    <option>Water failure</option>
                                    <option>Power failure</option>
                                    <option>Aircond service</option>
                                    <option>Cleaning</option>
                                    <option>Building</option>
                                    <option>Outdoor</option>
                                    <option>Facilities</option>
                                    <option>Pest control</option>
                                </select > */}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Venue
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type='text'
                                    name='venue'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Level
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type='number'
                                    name='level'
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Room/Area
                                </label>
                                <select name='room' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                    <option>-- Select --</option>
                                    <option>Office</option>
                                    <option>Lab</option>
                                    <option>Classroom</option>
                                    <option>Student Residence</option>
                                    <option>Off Campus</option>
                                </select >
                            </div>

                            <div className="my-4">
                                <div className="mb-4">
                                    <label className="block text-sm mb-2" htmlFor="description">
                                        <strong>Description</strong>
                                    </label>
                                    <textarea
                                        className="form-textarea resize-none border border-gray-300 rounded-md w-full py-2 px-3"
                                        rows="3"
                                        type='email'
                                        name='description'
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm mb-2" htmlFor="file">
                                        Attach file
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            className="cursor-pointer opacity-0 absolute w-full h-full "
                                            id="file"
                                            name='image'
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                        <div className="border border-gray-300 bg-white rounded-md py-2 px-3 flex items-center">
                                            <span className="mr-2">
                                                {
                                                    image
                                                        ? image.name
                                                        : 'Choose a file...'
                                                }
                                            </span>
                                            <span className="text-blue-500 ">Browse</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {
                                        isLoading
                                            ? <span class="loading loading-spinner loading-md"></span>
                                            : 'Submit'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form;