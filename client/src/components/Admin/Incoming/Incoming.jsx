import React, { useState } from 'react';
import './Incoming.css';

const reportData = [
    {
        reportId: 1,
        reportType: 'Electrical',
        description: 'Room 123 plug unusable',
        dateReported: '12/3/2023'
    },
    {
        reportId: 2,
        reportType: 'Pipe Leakage',
        description: 'Level 1 male toilet toilet pipe leaking',
        dateReported: '1/5/2023'
    },
    {
        reportId: 3,
        reportType: 'Air Con Service',
        description: 'Room 234 air conditioner is not cold',
        dateReported: '22/6/2023'
    }
];

const userData = [
    {
        userId: 1,
        username: 'John',
        email: 'john@gamil.com',
        reportId: [1]
    },
    {
        userId: 2,
        username: 'Jake',
        email: 'jake@gamil.com',
        reportId: [2]
    },
    {
        userId: 3,
        username: 'Jess',
        email: 'jess@gamil.com',
        reportId: [3]
    }
]

const Incoming = () => {

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedReport, setSelectedReport] = useState(null)

    const drawerState = () => {
        setDrawerOpen(!drawerOpen)
    }

    const handleDecline = (event) => {
        // Handle Decline button click here
        event.stopPropagation()
    };

    const handleAccept = (event) => {
        // Handle Accept button click here
        event.stopPropagation()
    };

    return (
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

                                                    <tr key={report.reportId} className='hover hover:cursor-pointer' onClick={() => { setSelectedReport(report); drawerState(); }}>
                                                        <th>{i + 1}</th>
                                                        <td>{report.reportType}</td>
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
            <div className="drawer-side z-50 overflow-hidden">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay" onClick={drawerState}></label>
                <ul className="menu p-4 w-96 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <div>
                        <h1 className='text-2xl font-bold'>User Info</h1>
                    </div>
                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                        <p className='font-bold'>John Doe</p>
                        <p>johndoe@gmail.com</p>
                    </div>
                    <div className='mt-10'>
                        <h1 className='text-2xl font-bold'>Report Info</h1>
                    </div>
                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                        <p className='font-bold'>Report Type:<span className='font-normal ml-2'>Air Con Service</span></p>
                    </div>
                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                        <p className='font-bold'>Description:<span className='font-normal ml-2'>Room 234 air conditioner is not cold</span></p>
                    </div>
                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                        <p className='font-bold'>Date Reported:<span className='font-normal ml-2'>22/6/2023</span></p>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Incoming;
