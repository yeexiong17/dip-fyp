import React from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../MyContext'

export default function Nav() {

    const { userSignIn, userLogout } = useAuthContext()

    return (
        <div className="navbar fixed top-0 z-50 px-6 bg-base-100">
            {/* Small Screen */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/' className='py-2'>Home</Link></li>

                        <li>
                            <details>
                                <summary className='py-2'>Services</summary>
                                <ul>
                                    <li><Link to='/menu'>Make a report</Link></li>
                                    <li><Link to='/track'>Track my report</Link></li>
                                </ul>
                            </details>
                        </li>

                        <li><Link to='/review' className='py-2'>Review</Link></li>
                        <li><Link to='/contact' className='py-2'>Contact Us</Link></li>

                        <li>
                            <details>
                                <summary className='py-2'>Info</summary>
                                <ul>
                                    <li><Link to='/about'>About Us</Link></li>
                                    <li><Link to='/faq'>Faq</Link></li>
                                </ul>
                            </details>
                        </li>
                        {
                            userSignIn
                                ? <div className='flex flex-col justify-center items-center'>
                                    <button onClick={() => location.href = '/signup'} className="btn btn-outline min-h-[2.5rem] h-10 w-full mt-4 px-6 border-orange-500 text-orange-500 hover:text-neutral-50 hover:bg-orange-500 hover:border-orange-500">Sign Up</button>
                                    <button onClick={() => location.href = '/login'} className="btn btn-outline min-h-[2.5rem] h-10 w-full mt-2 px-6 text-neutral-50 bg-orange-500 hover:bg-orange-600 hover:border-orange-600">Log In</button>
                                </div>
                                : null
                        }
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost font-bold text-3xl text-orange-500 hover:bg-transparent">Resolve</Link>
            </div>

            {/* Main */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to='/'>Home</Link></li>

                    <div className="dropdown dropdown-hover">
                        <li><a>Services</a></li>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to='/menu'>Make a report</Link></li>
                            <li><Link to='/track'>Track my report</Link></li>
                        </ul>
                    </div>

                    <li><Link to='/review'>Review</Link></li>
                    <li><Link to='/contact'>Contact Us</Link></li>

                    <div className="dropdown dropdown-hover">
                        <li><a>Info</a></li>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to='/about'>About Us</Link></li>
                            <li><Link to='/faq'>Faq</Link></li>
                        </ul>
                    </div>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    userSignIn
                        ? <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <Link to='/profile' className="justify-between">
                                        Profile
                                    </Link>
                                </li>
                                <li><Link onClick={() => userLogout()}>Logout</Link></li>
                            </ul>
                        </div>
                        : <div className='hidden md:flex items-center'>
                            <button onClick={() => location.href = '/signup'} className="btn btn-outline min-h-[2.5rem] h-10 w-28 mr-4 px-6 border-orange-500 text-orange-500 hover:text-neutral-50 hover:bg-orange-500 hover:border-orange-500">Sign Up</button>
                            <button onClick={() => location.href = '/login'} className="btn btn-outline min-h-[2.5rem] h-10 w-28 px-6 text-neutral-50 bg-orange-500 hover:bg-orange-600 hover:border-orange-600">Log In</button>
                        </div>
                }

            </div>
        </div>
    );
}
