import React from 'react';
import { useState } from 'react';
import service from "../../../asset/service.jpg";

function Signup() {

   const [inputs, setInputs] = useState({ firstname: "", surname: "", email: "", password: "" });

   const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({ ...values, [name]: value }))
   }

   const handleSubmit = (event) => {
      event.preventDefault();

      location.href = "/home";
   }

   return (
      <div className="min-h-screen py-20" style={{ backgroundImage: 'linear-gradient(115deg, #f7953e, #ebcaa3)' }}>
         <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
               <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-contain bg-center" style={{ backgroundImage: `url(${service})` }}>
               </div>
               <div className="w-full lg:w-1/2 py-16 px-12">
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
                           placeholder="Surname"
                           type="text"
                           name='surname'
                           value={inputs.surname}
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
                           className="border border-gray-400 py-1 px-2 w-full rounded-lg"
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
                           className="border border-gray-400 py-1 px-2 w-full rounded-lg"
                           placeholder="Confirm Password"
                           type="password"
                           name='password'
                           value={inputs.password}
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className="mt-5">
                        <input type="checkbox" required className="border border-gray-400" />
                        <span>
                           {' '}I accept the <a href="#" className="text-orange-500 font-semibold hover:underline">Terms of Use</a> & <a href="#" className="text-orange-500 font-semibold hover:underline">Privacy Policy</a>
                        </span>
                     </div>

                     <div className="mt-5 flex flex-col gap-y-4">
                        <button className="w-full bg-orange-500 text-center text-white active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 rounded-lg">Register Now</button>
                     </div>

                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Signup;