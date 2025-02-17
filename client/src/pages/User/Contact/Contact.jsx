import React, { useEffect } from 'react'
import { useState } from 'react'
import Nav from '../../../components/Nav'

function Contact() {

    const [inputs, setInputs] = useState({ username: "", email: "", message: "", phone: "" })

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (inputs.username == '' || inputs.email == '' || inputs.message == '' || inputs.phone == '') return alert('Do not leave blank')

        const response = await fetch('http://localhost:8000/user/contact-us', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })

        if (response.ok) {
            const responseJson = await response.json()
            setInputs({ username: "", email: "", message: "", phone: "" })
            alert(responseJson.message)
        }
    }

    return (
        <div>
            <Nav />
            <div className="w-full pt-20 flex justify-center items-center">
                <div className="flex flex-col md:flex-row md:space-y-0 md:items-stretch md:space-x-12 bg-cyan-700 w-full max-w-5xl p-4 sm:px-12 sm:py-8 rounded-xl shadow-lg text-white overflow-hidden">
                    <div className="md:py-4 flex-grow flex flex-col space-y-8">
                        <div className="font-bold text-4xl tracking-wide">
                            Contact Us
                        </div>
                        <div className="flex flex-col space-y-6">
                            <div className="inline-flex space-x-2 items-center">
                                <ion-icon name="call" className="text-xl text-teal-300"></ion-icon>
                                <span className="select-all">1-300-40-6700</span>
                            </div>
                            <div className="inline-flex space-x-2 items-center">
                                <ion-icon name="mail" className="text-xl text-teal-300"></ion-icon>
                                <span className="select-all">resolve@website.com</span>
                            </div>
                            <div className="inline-flex space-x-2 items-center">
                                <ion-icon name="location" className="text-xl text-teal-300"></ion-icon>
                                <span className="select-all">Persiaran Multimedia 63100 Cyberjaya Selangor</span>
                            </div>
                        </div>
                        <div className="flex space-x-4 text-lg">
                            <a href="#" className="hover:text-teal-300"><ion-icon name="logo-facebook"></ion-icon></a>
                            <a href="#" className="hover:text-teal-300"><ion-icon name="logo-twitter"></ion-icon></a>
                            <a href="#" className="hover:text-teal-300"><ion-icon name="logo-linkedin"></ion-icon></a>
                            <a href="#" className="hover:text-teal-300"><ion-icon name="logo-instagram"></ion-icon></a>
                        </div>
                    </div>
                    <div className="relative md:w-2/3">
                        <div className="absolute -top-28 -right-28 z-0 bg-teal-400 w-40 h-40 rounded-full"></div>
                        <div className="absolute -bottom-16 -left-28 z-0 bg-teal-400 w-40 h-40 rounded-full"></div>
                        <div className="relative md:w-full h-full bg-white p-8 text-gray-600 rounded-xl shadow-lg">
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                                <div>
                                    <label className="text-sm">Your name</label>
                                    <input
                                        className="border border-gray-300 mt-2 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
                                        type="text"
                                        name='username'
                                        value={inputs.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm">Email Address</label>
                                    <input
                                        className="border border-gray-300 mt-2 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
                                        type='email'
                                        name='email'
                                        value={inputs.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm">Phone Number</label>
                                    <input
                                        className="border border-gray-300 mt-2 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
                                        type='text'
                                        name='phone'
                                        value={inputs.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm">Message</label>
                                    <textarea
                                        className="form-textarea resize-none border border-gray-300 rounded-md w-full mt-2 px-4 py-2 focus:ring-2 focus:ring-teal-300"
                                        id="description"
                                        rows="4"
                                        name='message'
                                        value={inputs.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type='button' onClick={(e) => { handleSubmit(e) }} className="inline-block self-end bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;