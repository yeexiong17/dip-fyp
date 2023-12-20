import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuthContext } from '../MyContext';

function LoginForm() {

    const [inputs, setInputs] = useState({ email: "", password: "" });
    const { userLogin } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:8000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            });
            if (response.ok) {
                const responseJson = await response.json();
                if (responseJson.result) {
                    userLogin()
                }
            } else {
                alert('User credential incorrect')
                console.error('Login failed')
            }
        } catch (error) {
            console.error('Error during login:', error)
        } finally {
            setIsLoading(false); // Set loading state to false regardless of success or failure
        }
    }

    return (
        <form onSubmit={handleSubmit} className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
            <h1 className='text-4xl font-semibold'>Login </h1>
            <p className='font-medium text-gray-500 mt-4'>Welcome back! Please login to your account.</p>
            <div className='mt-8'>
                <div className='flex flex-col'>
                    <label className='text-lg font-medium'>Email</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder="Enter your email"
                        type='email'
                        name='email'
                        value={inputs.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='flex flex-col mt-4'>
                    <label className='text-lg font-medium'>Password</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder="Enter your password"
                        type='password'
                        name='password'
                        value={inputs.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='mt-8 flex justify-between items-center'>
                    <div>
                        <input type="checkbox" id='remember' />
                        <label className='ml-2 font-medium text-base' htmlFor="remember">Remember me</label>
                    </div>

                    <Link to="/forgetpw">
                        <button className='font-medium text-base text-orange-500'>Forgot password?</button>
                    </Link>
                </div>

                <div className='mt-8 flex flex-col gap-y-4'>
                    <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-orange-500 rounded-xl text-white font-bold text-center '>Sign in</button>
                </div>

                <div className='mt-8 flex justify-center items-center'>
                    <p className='font-medium text-base'>Don't have an account?</p>
                    <Link to="/signup">
                        <button className='ml-2 font-medium text-base text-orange-500' >Sign up</button>
                    </Link>
                </div>

                <div className='mt-3 flex justify-center items-center'>
                    <p className='font-medium text-base'>Or</p>
                </div>

                <div className='mt-3 flex justify-center items-center'>
                    <p className='font-medium text-base'>Admin Login</p>
                    <Link to="/admin/login">
                        <button className='ml-2 font-medium text-base text-orange-500' >Here</button>
                    </Link>
                </div>
            </div>
        </form>

    )
}

export default LoginForm;