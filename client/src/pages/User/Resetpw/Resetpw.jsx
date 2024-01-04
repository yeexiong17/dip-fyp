import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../../MyContext";

export default function Resetpw() {

    const [inputs, setInputs] = useState()

    const { navigate } = useAuthContext()
    const { userId, token } = useParams()

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs((values) => ({ ...values, [name]: value }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (inputs.password !== inputs.confirmPassword) {
            return alert('Password Not Match')
        }

        const password = {
            password: inputs.password
        }

        try {
            const response = await fetch(`http://localhost:8000/user/reset-password/${userId}/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(password)
            })

            if (response.ok) {
                console.log('Password Changed successfully')

                navigate('/login')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-full pt-20 overflow-y-auto'>
            <div className='flex flex-col items-center'>
                <main id="content" role="main" className="w-full max-w-lg mx-auto p-6">
                    <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-orange-300">
                        <div className="p-4 sm:p-7">
                            <div className="flex flex-col text-center">
                                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Create a new password</h1>
                                <p className="mt-2 text-sm text-gray-600">Please create a strong password.</p>
                            </div>

                            <div className="mt-5">
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <div className="grid gap-y-4">
                                        <div>
                                            <label for="password" className="block text-sm font-bold ml-1 mb-2 dark:text-white">New Password</label>
                                            <div className="relative">
                                                <input onChange={(e) => { handleChange(e) }} type="password" id="password" name="password" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-orange-500 focus:ring-orange-500 shadow-sm" required aria-describedby="email-error" />
                                            </div>
                                            <label for="confirmPassword" className="block text-sm font-bold mt-6 ml-1 mb-2 dark:text-white">Confirm New Password</label>
                                            <div className="relative">
                                                <input onChange={(e) => { handleChange(e) }} type="password" id="confirmPassword" name="confirmPassword" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-orange-500 focus:ring-orange-500 shadow-sm" required aria-describedby="email-error" />
                                            </div>
                                        </div>
                                        <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Set New Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}