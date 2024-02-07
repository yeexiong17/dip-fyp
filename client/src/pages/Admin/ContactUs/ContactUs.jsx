import React, { useState, useEffect } from 'react'

import Sidebar from '../../../components/Sidebar'

const ContactUs = () => {

    const [allContact, setAllContact] = useState([])
    const [selectedContact, setSelectedContact] = useState(null)
    const [drawerOpen, setDrawerOpen] = useState(false)

    useEffect(() => {

        fetchAllContact()

    }, [])

    const fetchAllContact = async () => {
        const response = await fetch('http://localhost:8000/admin/get-all-contact', {
            method: 'GET',
            credentials: 'include'
        })

        if (response.ok) {
            const responseJson = await response.json()

            setAllContact(responseJson.data)
        }
    }

    const handleDelete = async (e, contactId) => {
        e.stopPropagation()

        let answer = confirm('Do you want to delete this row?')

        if (answer) {
            const response = await fetch('http://localhost:8000/admin/delete-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ contactId }),
                credentials: 'include'
            })

            if (response.ok) {
                alert('Row deleted successfully')
                await fetchAllContact()
            }
        }
    }

    const handleRowClick = (contact) => {
        setSelectedContact(contact)
    }

    return (
        <>
            <Sidebar />
            <div className="drawer drawer-end h-full bg-sky-50">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={drawerOpen} onChange={() => { }} />
                <div className="drawer-content">
                    <div className='pl-64 h-full'>
                        <div className='flex flex-col h-full px-12 pt-8'>
                            <div>
                                <h1 className='text-2xl font-bold text-neutral-800'>All Contact</h1>
                            </div>

                            <div className={`${Object.keys(allContact).length === 0 ? 'h-fit' : 'h-full'} overflow-y-auto scroll-smooth`}>
                                <table className="table table-pin-rows mt-8 w-full bg-neutral-50 border-2 shadow-md">
                                    {/* head */}
                                    <thead>
                                        <tr className='bg-neutral-50 text-neutral-800 text-sm border-b border-neutral-300'>
                                            <th style={{ width: '5%' }}>ID</th>
                                            <th style={{ width: '15%' }}>Name</th>
                                            <th style={{ width: '15%' }}>Phone</th>
                                            <th style={{ width: '35%' }}>Message</th>
                                            <th style={{ width: '20%' }}>Date Created</th>
                                            <th style={{ width: '10%' }}>Action</th>
                                        </tr>
                                    </thead>

                                    {
                                        allContact.length == 0
                                            ? null
                                            : <tbody>
                                                {
                                                    allContact
                                                        .filter((item) => item.contact_us_delete == 'false')
                                                        .map((contact, key) => (

                                                            <tr key={key} className='hover hover:cursor-pointer' onClick={() => { handleRowClick(contact); setDrawerOpen(true) }}>
                                                                <th>{contact.contact_us_id}</th>
                                                                <td className='break-all'>{contact.contact_us_name}</td>
                                                                <td>{contact.contact_us_phone}</td>
                                                                <td className=''>{contact.contact_us_message}</td>
                                                                <td>
                                                                    {
                                                                        new Date(contact.contact_us_created_date).toLocaleDateString('en-US', {
                                                                            day: 'numeric',
                                                                            month: 'long',
                                                                            year: 'numeric',
                                                                        })
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <button type='button' onClick={(e) => { handleDelete(e, contact.contact_us_id) }} className='flex p-2 rounded-md w-fit hover:bg-neutral-300 active:bg-neutral-400 transition duration-200 ease-in-out '>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className='w-5 h-5'>
                                                                            <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path>
                                                                        </svg>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                }
                                            </tbody>
                                    }

                                </table>
                                {/* <button className="btn btn-sm btn-outline btn-success" onClick={handleComplete}>Completed</button> */}
                            </div>
                            {
                                Object.keys(allContact).length === 0
                                    ? <div className='h-fit flex items-center justify-center pt-10'>
                                        <h2 className='text-gray-600 font-bold text-2xl text-center'>There is no report available</h2>
                                    </div>
                                    : null
                            }
                        </div>
                    </div >
                </div>
                <div className="drawer-side z-50 overflow-y-auto">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay" onClick={() => { setDrawerOpen(false); setSelectedContact(null) }}></label>
                    <ul className="menu p-4 w-96 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        {
                            selectedContact
                                ?
                                <>
                                    <div>
                                        <h1 className='text-2xl font-bold'>Contact Info</h1>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>ID:</p>
                                        <p className='font-normal mt-2'>{selectedContact.contact_us_id}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Name:</p>
                                        <p className='font-normal mt-2'>{selectedContact.contact_us_name}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Email:</p>
                                        <p className='font-normal mt-2'>{selectedContact.contact_us_email}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Phone:</p>
                                        <p className='font-normal mt-2'>{selectedContact.contact_us_phone}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Message:</p>
                                        <p className='font-normal mt-2'>{selectedContact.contact_us_message}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Date Created:</p>
                                        <p className='font-normal mt-2'>
                                            {
                                                new Date(selectedContact.contact_us_created_date).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })
                                            }
                                        </p>
                                    </div>

                                </>
                                : null
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ContactUs
