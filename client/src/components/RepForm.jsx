import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";

function Form() {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className="pt-16 bg-gray-500 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto ">
                <div className="w-1/2 bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="pb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Incident Report Form
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <h1 className="pb-4 text-base font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                                Personal Details
                            </h1>

                            <div className="flex gap-10">
                                <div className="w-1/2">
                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Name
                                    </label>
                                    <input
                                        class=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="text"
                                        name='username'
                                        value={inputs.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        E-mail
                                    </label>
                                    <input
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type='email'
                                        name='email'
                                        value={inputs.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <h1 className="py-4 text-base font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                                Incident Details
                            </h1>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Fault Category
                                </label>
                                <select className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                    <option>-- Select --</option>
                                    <option>Water failure</option>
                                    <option>Power failure</option>
                                    <option>Aircond service</option>
                                    <option>Cleaning</option>
                                    <option>Building</option>
                                    <option>Outdoor</option>
                                    <option>Facilities</option>
                                    <option>Pest control</option>
                                </select >
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Venue
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type='text'
                                    name='venue'
                                    value={inputs.venue}
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
                                    value={inputs.level}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Room/Area
                                </label>
                                <select className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
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
                                        name='desciption'
                                        value={inputs.desciption}
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
                                        />
                                        <div className="border border-gray-300 bg-white rounded-md py-2 px-3 flex items-center">
                                            <span className="mr-2">Choose a file...</span>
                                            <span className="text-blue-500 ">Browse</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Link to="/home">
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Submit
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form;