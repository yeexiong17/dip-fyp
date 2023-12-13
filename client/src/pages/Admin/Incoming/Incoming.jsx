import React, { useState, useEffect } from 'react';

import Sidebar from '../../../components/Sidebar';

const reportData = [
    {
        reportId: 0,
        faultCategory: 'Electrical',
        venue: 'FCI',
        level: 3,
        area: 'Lab',
        description: 'Lab L234 plug unusable',
        dateReported: '12/3/2023',
        reportStatus: 'Progressing',
        completedImage: false,
        userId: 0
    },
    {
        reportId: 1,
        faultCategory: 'Aircond Service',
        venue: 'FCM',
        level: 3,
        area: 'Office',
        description: 'Office O123 aircond needs service, not cold',
        dateReported: '12/3/2023',
        reportStatus: 'Progressing',
        completedImage: false,
        userId: 1
    },
    {
        reportId: 2,
        faultCategory: 'Electrical',
        venue: 'FOE',
        level: 3,
        area: 'Classroom',
        description: 'Classroom C345 ceiling light is flicking',
        dateReported: '12/3/2023',
        reportStatus: 'Completed',
        completedImage: false,
        userId: 2
    },
];

const userData = [
    {
        userId: 0,
        username: 'John',
        email: 'john@gamil.com',
        reportId: [0]
    },
    {
        userId: 1,
        username: 'Jake',
        email: 'jake@gamil.com',
        reportId: [1]
    },
    {
        userId: 2,
        username: 'Jess',
        email: 'jess@gamil.com',
        reportId: [2]
    }
]

const Incoming = () => {

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedReport, setSelectedReport] = useState(null)

    useEffect(() => {
        if (selectedReport) {
            console.log(selectedReport)
            setDrawerOpen(!drawerOpen)
        }
    }, [selectedReport])

    const handleRowClick = (report) => {
        if (selectedReport === report) {
            // If the same row is clicked again, clear the selected report to close the drawer
            setDrawerOpen(true)
        } else {
            setSelectedReport(report)
        }
    }

    const handleDecline = (event) => {
        // Handle Decline button click here
        event.stopPropagation()
    }

    const handleAccept = (event) => {
        // Handle Accept button click here
        event.stopPropagation()
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
                            <div className={`${Object.keys(reportData).length === 0 ? 'h-fit' : 'h-full'} overflow-y-auto scroll-smooth`}>
                                <table className="table table-pin-rows border-2 bg-neutral-50 shadow-md mt-8">
                                    {/* head */}
                                    <thead>
                                        <tr className='bg-neutral-150 text-neutral-800 text-sm border-b border-neutral-300'>
                                            <th></th>
                                            <th>Report Type</th>
                                            <th>Description</th>
                                            <th>Date Reported</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {
                                        Object.keys(reportData).length === 0
                                            ? null
                                            : <tbody>
                                                {
                                                    reportData.map((report, i) => (

                                                        <tr key={report.reportId} className='hover hover:cursor-pointer' onClick={() => handleRowClick(report)}>
                                                            <th>{i + 1}</th>
                                                            <td>{report.faultCategory}</td>
                                                            <td className='truncate max-w-xs'>{report.description}</td>
                                                            <td>{report.dateReported}</td>
                                                            <td>
                                                                <div>
                                                                    <button className="btn btn-outline btn-error text-red-500 bg-neutral-50 mr-4 w-20" onClick={handleDecline}>Decline</button>
                                                                    <button className="btn btn-success text-neutral-50 bg-green-500 hover:bg-green-600 w-20" onClick={handleAccept}>Accept</button>
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
                                Object.keys(reportData).length === 0
                                    ? <div className='h-fit flex items-center justify-center pt-10'>
                                        <h2 className='text-gray-600 font-bold text-2xl text-center'>Wooohooo! No incoming report available</h2>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
                <div className="drawer-side z-50 overflow-y-auto">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay" onClick={() => setDrawerOpen(false)}></label>
                    <ul className="menu p-4 w-96 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        {
                            selectedReport
                                ?
                                <>
                                    <div>
                                        <h1 className='text-2xl font-bold'>User Info</h1>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>{userData[selectedReport.userId].username}</p>
                                        <p>{userData[selectedReport.userId].email}</p>
                                    </div>
                                    <div className='mt-10'>
                                        <h1 className='text-2xl font-bold'>Report Info</h1>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Fault Category:</p>
                                        <p className='font-normal mt-2'>{selectedReport.faultCategory}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Venue:</p>
                                        <p className='font-normal mt-2'>{selectedReport.venue}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Level:</p>
                                        <p className='font-normal mt-2'>{selectedReport.level}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Room/Area:</p>
                                        <p className='font-normal mt-2'>{selectedReport.area}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Description:</p>
                                        <p className='font-normal mt-2'>{selectedReport.description}</p>
                                    </div>
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Date Reported:</p>
                                        <p className='font-normal mt-2'>{selectedReport.dateReported}</p>
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
