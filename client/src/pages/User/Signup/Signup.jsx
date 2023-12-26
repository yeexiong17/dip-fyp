import React, { useEffect, useState } from 'react'
import service from "../../../asset/service.jpg"

import { useAuthContext } from '../../../MyContext';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {

   const navigate = useNavigate()

   const [inputs, setInputs] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: ""
   });

   const { userLogin, userSignIn } = useAuthContext()

   const [matchPassword, setMatchPassword] = useState(true)
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      if (userSignIn) {
         navigate('/')
      }
   })

   const handleChange = (event) => {
      const name = event.target.name
      const value = event.target.value
      setInputs((values) => ({ ...values, [name]: value }))
   };

   const handleSubmit = async (event) => {
      event.preventDefault()

      if (inputs.password !== inputs.confirmPassword) {
         return setMatchPassword(false)
      }

      setIsLoading(true)

      try {
         const response = await fetch('http://localhost:8000/user/signup', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
         });

         if (response.ok) {
            userLogin()
         } else {
            console.error('Signup failed')
         }
      } catch (error) {
         console.error('Error during signup:', error)
      } finally {
         setIsLoading(false); // Set loading state to false regardless of success or failure
      }
   };

   return (
      <div className="min-h-screen py-14" style={{ backgroundImage: 'linear-gradient(115deg, #f7953e, #ebcaa3)' }}>
         <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
               <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-contain bg-center" style={{ backgroundImage: `url(${service})` }}>
               </div>
               <div className="flex flex-col w-full lg:w-1/2 py-12 px-12">
                  <h2 className="text-3xl mb-4">Register</h2>
                  <p className="mb-4">Create your account.</p>

                  <form onSubmit={handleSubmit}>
                     <div className="grid grid-cols-2 gap-5">
                        <input
                           className="border border-gray-400 py-1 px-2 rounded-lg"
                           placeholder="Firstname"
                           type="text"
                           name='firstname'
                           value={inputs.firstname}
                           onChange={handleChange}
                           required
                        />
                        <input
                           className="border border-gray-400 py-1 px-2 rounded-lg"
                           placeholder="Lastname"
                           type="text"
                           name='lastname'
                           value={inputs.lastname}
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className="mt-5">
                        <input
                           className="border border-gray-400 py-1 px-2 w-full rounded-lg"
                           placeholder="Email"
                           type="email"
                           name='email'
                           value={inputs.email}
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className="mt-5">
                        <input
                           className="border border-gray-400  py-1 px-2 w-full rounded-lg"
                           placeholder="Password"
                           type="password"
                           name='password'
                           value={inputs.password}
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className="mt-5">
                        <input
                           className={`border border-gray-400 ${!matchPassword ? 'border-red-500' : null} py-1 px-2 w-full rounded-lg`}
                           placeholder="Confirm Password"
                           type="password"
                           name='confirmPassword'
                           value={inputs.confirmPassword}
                           onChange={handleChange}
                           required
                        />
                     </div>
                     {
                        !matchPassword
                           ? <div className='mt-5'>
                              <p className='text-red-500 font-bold'>*Password do not match</p>
                           </div>
                           : null
                     }
                     <div className="mt-5">
                        <input type="checkbox" required className="border border-gray-400" />
                        <span>
                           {' '}I accept the <a href="#" className="text-orange-500 font-semibold hover:underline">Terms of Use</a> & <a href="#" className="text-orange-500 font-semibold hover:underline">Privacy Policy</a>
                        </span>
                     </div>
                     <div className="mt-5 flex flex-col gap-y-4">
                        <button
                           type="submit"
                           className={`w-full bg-orange-500 text-center text-white py-4 rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : 'active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform'}`}
                           disabled={isLoading}
                        >
                           {isLoading ? 'Signing up...' : 'Register Now'}
                        </button>
                     </div>
                  </form>
                  <div className='mt-6'>
                     <p className='text-center'>Have an account? <a className='text-orange-600 hover:underline' href='/login'>Login Here</a></p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Signup;