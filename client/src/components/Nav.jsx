import React from 'react';
import { Navbar, Dropdown, Avatar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <div className="navbar fixed top-0 z-50 px-6 bg-base-100">
            {/* Small Screen */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a href='/home' className='py-2'>Home</a></li>
                        <li><a href='/menu'>Menu</a></li>

                        <li>
                            <details>
                                <summary className='py-2'>Services</summary>
                                <ul>
                                    <li><a href='/report'>Make a report</a></li>
                                    <li><a href='/track'>Track my report</a></li>
                                </ul>
                            </details>
                        </li>

                        <li><a href='/review' className='py-2'>Review</a></li>
                        <li><a href='/contact' className='py-2'>Contact Us</a></li>

                        <li>
                            <details>
                                <summary className='py-2'>Info</summary>
                                <ul>
                                    <li><a href='/about'>About Us</a></li>
                                    <li><a href='/faq'>Faq</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
                <Link to='/home' className="btn btn-ghost font-bold text-3xl text-orange-500 hover:bg-transparent">Resolve</Link>
            </div>

            {/* Main */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a href='/home'>Home</a></li>
                    <li><a href='/menu'>Menu</a></li>

                    <div className="dropdown dropdown-hover">
                        <li><a>Services</a></li>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a href='/report'>Make a report</a></li>
                            <li><a href='/track'>Track my report</a></li>
                        </ul>
                    </div>

                    <li><a href='/review'>Review</a></li>
                    <li><a href='/contact'>Contact Us</a></li>

                    <div className="dropdown dropdown-hover">
                        <li><a>Info</a></li>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a href='/about'>About Us</a></li>
                            <li><a href='/faq'>Faq</a></li>
                        </ul>
                    </div>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a href='/profile' className="justify-between">
                                Profile
                            </a>
                        </li>
                        <li><a href='/'>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
        // <Navbar fluid rounded >
        //     <NavbarBrand href="#">
        //         <img src="/favicon.svg" className="mr-3 h-6 sm:h-12" alt="" />
        //         <span className="self-center whitespace-nowrap text-4xl font-semibold text-orange-500">Resolve</span>
        //     </NavbarBrand>
        //     <div className="flex md:order-2 space-x-7 mr-7">
        //         <div className="flex space-x-3">
        //             <Link to="/">
        //                 <Button href="/Login.jsx" variant="outlined" size="sm" color="blue-gray" fullWidth>
        //                     Log In
        //                 </Button>
        //             </Link>
        //             <Link to="signup">
        //                 <Button variant="gradient" size="sm" fullWidth>
        //                     Sign Up
        //                 </Button>
        //             </Link>
        //         </div>
        //         <NavbarToggle />
        //     </div>
        //     <div className="ml-32">
        //         <NavbarCollapse>
        //             <NavbarLink href="/home"><span className="text-lg">Home</span></NavbarLink>
        //             <NavbarLink href="/aboutus"><span className="text-lg">About</span></NavbarLink>
        //             <NavbarLink href="/menu"><span className="text-lg">Services</span></NavbarLink>
        //             <NavbarLink href="/contact"><span className="text-lg">Contact</span></NavbarLink>
        //             <NavbarLink href="faq"><span className="text-lg">FAQ</span></NavbarLink>
        //         </NavbarCollapse>
        //     </div>
        // </Navbar >
    );
}
