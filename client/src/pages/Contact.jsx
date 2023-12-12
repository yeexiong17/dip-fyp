import React from 'react';
import { useState } from 'react';
import NavAfter from "../components/NavAfter";
import Nav from '../components/Nav';

function Contact() {

    const [inputs, setInputs] = useState({ username: "", email: "", message: "" });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <Nav />
            <div class="w-full pt-20 flex justify-center items-center">
                <div class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:items-stretch md:space-x-12 bg-cyan-700 w-full max-w-5xl p-8 sm:px-12 sm:py-10 rounded-xl shadow-lg text-white overflow-hidden">
                    <div class="md:py-4 flex-grow flex flex-col space-y-16">
                        <div class="font-bold text-4xl tracking-wide">
                            Contact Us
                        </div>
                        <div class="flex flex-col space-y-6">
                            <div class="inline-flex space-x-2 items-center">
                                <ion-icon name="call" class="text-xl text-teal-300"></ion-icon>
                                <span class="select-all">1-300-40-6700</span>
                            </div>
                            <div class="inline-flex space-x-2 items-center">
                                <ion-icon name="mail" class="text-xl text-teal-300"></ion-icon>
                                <span class="select-all">resolve@website.com</span>
                            </div>
                            <div class="inline-flex space-x-2 items-center">
                                <ion-icon name="location" class="text-xl text-teal-300"></ion-icon>
                                <span class="select-all">Persiaran Multimedia 63100 Cyberjaya Selangor</span>
                            </div>
                        </div>
                        <div class="flex space-x-4 text-lg">
                            <a href="#" class="hover:text-teal-300"><ion-icon name="logo-facebook"></ion-icon></a>
                            <a href="#" class="hover:text-teal-300"><ion-icon name="logo-twitter"></ion-icon></a>
                            <a href="#" class="hover:text-teal-300"><ion-icon name="logo-linkedin"></ion-icon></a>
                            <a href="#" class="hover:text-teal-300"><ion-icon name="logo-instagram"></ion-icon></a>
                        </div>
                    </div>
                    <div class="relative md:w-2/3">
                        <div class="absolute -top-28 -right-28 z-0 bg-teal-400 w-40 h-40 rounded-full"></div>
                        <div class="absolute -bottom-16 -left-28 z-0 bg-teal-400 w-40 h-40 rounded-full"></div>
                        <div class="relative md:w-full h-full bg-white p-8 text-gray-600 rounded-xl shadow-lg">
                            <form onSubmit={handleSubmit} class="flex flex-col space-y-4">
                                <div>
                                    <label class="text-sm">Your name</label>
                                    <input
                                        class="border border-gray-300 mt-2 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
                                        type="text"
                                        name='username'
                                        value={inputs.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label class="text-sm">Email Address</label>
                                    <input
                                        class="border border-gray-300 mt-2 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
                                        type='email'
                                        name='email'
                                        value={inputs.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label class="text-sm">Message</label>
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
                                <button class="inline-block self-end bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;