import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Forgetpw() {

   const [email, setEmail] = useState()

   const handleSubmit = async (event) => {
      event.preventDefault()

      const emailObject = {
         email: email
      }

      try {
         const response = await fetch('http://localhost:8000/user/forget-password', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailObject)
         })

         if (response.ok) {
            console.log('Password Changed successfully')
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
      <div className='h-full pt-20 overflow-y-auto'>
         <div className='flex flex-col items-center'>
            <main id="content" role="main" className="w-full max-w-lg mx-auto p-6">
               <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-orange-300">
                  <div className="p-4 sm:p-7">
                     <div className="flex flex-col text-center">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
                        <p className="mt-2 text-sm text-gray-600">Enter your email and we'll send you a link to reset your password.</p>
                     </div>

                     <div className="mt-5">
                        <form onSubmit={(e) => handleSubmit(e)}>
                           <div className="grid gap-y-4">
                              <div>
                                 <label for="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                                 <div className="relative">
                                    <input onChange={(e) => { setEmail(e.target.value) }} type="email" id="email" name="email" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-orange-500 focus:ring-orange-500 shadow-sm" required aria-describedby="email-error" />
                                 </div>
                                 <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                              </div>
                              <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Reset password</button>
                              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                 Remember your password?
                                 <Link to='/login' className="ml-2 text-orange-500 decoration-2 hover:underline font-medium" href="#">
                                    Login here
                                 </Link>
                              </p>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>

               <p className="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
                  <Link to='/contact' className="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-orange-600 dark:text-gray-500 dark:hover:text-gray-200" href="#">
                     Contact us!
                  </Link>
               </p>
            </main>
         </div>
      </div>
   )
}