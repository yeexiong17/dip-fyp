import React, { useState, useEffect } from 'react';

import Sidebar from '../../../components/Sidebar';

const Incoming = () => {

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedReport, setSelectedReport] = useState(null)
    const [incomingReport, setIncomingReport] = useState([])
    const [userData, setUserData] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        if (selectedReport) {
            setDrawerOpen(!drawerOpen)
        }

    }, [selectedReport])

    useEffect(() => {
        // Fetch user data when userId changes
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8000/admin/get-user-from-report', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                    credentials: 'include'
                })

                if (response.ok) {
                    const responseJson = await response.json()
                    setUserData(responseJson.userObject)
                } else {
                    const responseJson = await response.json()
                    alert(responseJson.message)
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (userId) {
            fetchUserData()
        }
    }, [userId])

    useEffect(() => {
        // Fetch all reports when the component mounts
        fetchAllReports();

    }, [])

    const fetchAllReports = async () => {
        try {
            const response = await fetch('http://localhost:8000/admin/dashboard-data', {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const responseJson = await response.json()

                setIncomingReport(responseJson.allReport.filter((report) => report.report_status == 'Incoming'))
            } else {
                const responseJson = await response.json()

                alert(responseJson.message)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleRowClick = (report) => {
        setSelectedReport(report)
        setUserId(report.user_id)
    }

    const handleAccept = async (event, report) => {
        event.stopPropagation()

        const response = await fetch('http://localhost:8000/admin/accept-new-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reportId: report.report_id }),
            credentials: 'include'
        })

        if (response.ok) {
            const responseJson = await response.json()
            fetchAllReports()
            alert(responseJson.message)
        }
        else {
            const responseJson = await response.json()

            alert(responseJson.message)
        }
    }

    const handleReject = async (event, report) => {
        // Handle Decline button click here
        event.stopPropagation()

        let confirmSelection = confirm('Are you sure you want to reject this report?')

        if (!confirmSelection) {
            return
        }

        const response = await fetch('http://localhost:8000/admin/reject-new-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reportId: report.report_id }),
            credentials: 'include'
        })

        if (response.ok) {
            fetchAllReports()
            alert(`Report Id: ${report.report_id} has been rejected`)
        }
        else {
            const responseJson = await response.json()

            alert(responseJson.message)
        }
    }

    return (
        <>
            <Sidebar />
            <div className="drawer drawer-end h-full bg-sky-50">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={drawerOpen} onChange={() => { }} />
                <div className="drawer-content">
                    {/* Page content here */}
                    <div className='pl-64 h-full'>
                        <div className='flex flex-col h-full px-12 pt-8'>
                            <div>
                                <h1 className='text-2xl font-bold text-neutral-800'>Incoming Report</h1>
                            </div>
                            <div className={`${Object.keys(incomingReport).length === 0 ? 'h-fit' : 'h-full'} overflow-y-auto scroll-smooth`}>
                                <table className="table table-pin-rows border-2 bg-neutral-50 shadow-md mt-8">
                                    {/* head */}
                                    <thead>
                                        <tr className='bg-neutral-150 text-neutral-800 text-sm border-b border-neutral-300'>
                                            <th></th>
                                            <th>Report Category</th>
                                            <th>Venue</th>
                                            <th>Description</th>
                                            <th>Date Reported</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {
                                        Object.keys(incomingReport).length === 0
                                            ? null
                                            : <tbody>
                                                {
                                                    incomingReport.map((report, key) => (

                                                        <tr key={key} className='hover hover:cursor-pointer' onClick={() => { handleRowClick(report); setUserId(report.user_id) }}>
                                                            <th>{report.report_id}</th>
                                                            <td>{report.report_category}</td>
                                                            <td>{report.report_venue}</td>
                                                            <td className='truncate max-w-xs'>{report.report_description}</td>
                                                            <td>
                                                                {
                                                                    new Date(report.report_created_date).toLocaleDateString('en-US', {
                                                                        day: 'numeric',
                                                                        month: 'long',
                                                                        year: 'numeric',
                                                                    })
                                                                }
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <button className="btn btn-outline btn-error text-red-500 bg-neutral-50 mr-4 w-20" onClick={((event) => { handleReject(event, report) })}>Reject</button>
                                                                    <button className="btn btn-success text-neutral-50 bg-green-500 hover:bg-green-600 w-20" onClick={(event) => { handleAccept(event, report) }}>Accept</button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                    }
                                </table>
                            </div>
                            {
                                Object.keys(incomingReport).length === 0
                                    ? <div className='h-fit flex items-center justify-center pt-10'>
                                        <h2 className='text-gray-600 font-bold text-2xl text-center'>Wooohooo! No incoming report available</h2>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
                <div className="drawer-side z-50 overflow-y-auto">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay" onClick={() => { setDrawerOpen(false); setSelectedReport(null); setUserId(null) }}></label>
                    <ul className="menu p-4 w-96 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        {
                            selectedReport && userData
                                ?
                                <>
                                    <div>
                                        <h1 className='text-2xl font-bold'>User Info</h1>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>{userData.user_username}</p>
                                        <p>{userData.user_email}</p>
                                    </div>
                                    <div className='mt-6'>
                                        <h1 className='text-2xl font-bold'>Report Info</h1>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>ID:</p>
                                        <p className='font-normal mt-2'>{selectedReport.report_id}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Category:</p>
                                        <p className='font-normal mt-2'>{selectedReport.report_category}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Venue:</p>
                                        <p className='font-normal mt-2'>{selectedReport.report_venue}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Level:</p>
                                        <p className='font-normal mt-2'>{selectedReport.report_level}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Room/Area:</p>
                                        <p className='font-normal mt-2'>{selectedReport.report_room}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Description:</p>
                                        <p className='font-normal mt-2 break-all'>{selectedReport.report_description}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Status:</p>
                                        <p className='font-normal mt-2'>{selectedReport.report_status}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Date Reported:</p>
                                        <p className='font-normal mt-2'>
                                            {
                                                new Date(selectedReport.report_created_date).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })
                                            }
                                        </p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Report Image:</p>
                                        <img className='w-full mt-4' src={selectedReport ? selectedReport.report_image : ''} alt="category-image" />
                                    </div>
                                </>
                                : null
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Incoming;
