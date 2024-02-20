import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom"
import admin from '../../../asset/admin.png'
import { useAuthContext } from '../../../MyContext'
import Cookies from 'js-cookie'

function AdminLogin() {

  const [inputs, setInputs] = useState({ email: "", password: "" })

  const { adminLogin, navigate } = useAuthContext()

  useEffect(() => {
    const handleEnterClick = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        document.querySelector('#login-btn').click()
      }
    }

    // Add event listener to the document body
    document.body.addEventListener('keypress', handleEnterClick)

    // Remove the event listener when the component unmounts
    return () => {
      document.body.removeEventListener('keypress', handleEnterClick)
    };
  }, [])

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      })

      if (response.ok) {
        const responseJson = await response.json()

        adminLogin(responseJson.cleanAdmin)

        Cookies.set('adminToken', responseJson.token, { secure: true, sameSite: 'None' })
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-20"
          src={admin}
          alt="Admin"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Admin Log In
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="email"
                name='email'
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <Link to="/admin/forget-password">
                  <button className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</button>
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type='password'
                name='password'
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <button
              id='login-btn'
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log In
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/admin/signup">
            <button className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up</button>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AdminLogin;