import React, { useState } from 'react'

import './AllReport.css'

const reportData = [
    {
        reportId: 1,
        reportType: 'Electrical',
        description: 'Room 123 plug unusable',
        dateReported: '12/3/2023',
        reportStatus: 'Progressing',
        completedImage: false
    },
    {
        reportId: 2,
        reportType: 'Pipe Leakage',
        description: 'Level 1 male toilet toilet pipe leaking',
        dateReported: '1/5/2023',
        reportStatus: 'Completed',
        completedImage: true
    },
    {
        reportId: 3,
        reportType: 'Air Con Service',
        description: 'Room 234 air conditioner is not cold',
        dateReported: '22/6/2023',
        reportStatus: 'Progressing',
        completedImage: false
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


const AllReport = () => {

    const [open, setOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedReport, setSelectedReport] = useState(null)
    const [fileSelected, setFileSelected] = useState(false);

    const toastAnimate = () => {
        setOpen(true)

        setTimeout(() => {
            setOpen(false)
        }, 1500)
    }

    const drawerState = () => {
        setDrawerOpen(!drawerOpen)
    }

    const handleComplete = (event) => {
        // Handle Accept button click here
        event.stopPropagation()

        let completed = confirm('Mark this report as completed?')
        completed ? toastAnimate() : null
    };

    const handleFileChange = (e) => {
        setFileSelected(!!e.target.files.length) // Set to true if files are selected, false otherwise
    };

    const handleCompleted = () => {
        const input_image = document.querySelector('#input_image')
        input_image.value = ''
        setFileSelected(false)
    }

    return (
        <div className="drawer drawer-end h-full bg-sky-50">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={drawerOpen} onChange={() => { }} />
            <div className="drawer-content">
                {/* Page content here */}
                <div className='pl-64 h-full'>
                    <div className='flex flex-col h-full px-12 pt-8'>
                        <div>
                            <h1 className='text-2xl font-bold text-neutral-800'>All Report</h1>
                        </div>

                        <div className={`${Object.keys(reportData).length === 0 ? 'h-fit' : 'h-full'} overflow-y-auto scroll-smooth`}>
                            <table className="table table-pin-rows mt-8 bg-neutral-50 border-2 shadow-md">
                                {/* head */}
                                <thead>
                                    <tr className='bg-neutral-50 text-neutral-800 text-sm border-b border-neutral-300'>
                                        <th></th>
                                        <th>Report Type</th>
                                        <th>Description</th>
                                        <th>Date Reported</th>
                                        <th>Status</th>
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
                                                        <td>{report.reportStatus}</td>
                                                        <td>
                                                            {
                                                                report.reportStatus == 'Completed'
                                                                    ? <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
                                                                        <path fill="#c8e6c9" d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"></path><path fill="#4caf50" d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"></path>
                                                                    </svg>
                                                                    : <>
                                                                        <button className="btn btn-outline btn-success" onClick={(event) => { document.getElementById('my_modal_1').showModal(); event.stopPropagation() }}>Mark as Completed</button>
                                                                        <dialog id="my_modal_1" className="modal" onClick={(event) => { event.stopPropagation() }}>
                                                                            <div className="modal-box">
                                                                                <h3 className="font-bold text-lg">Upload a photo proof of repair</h3>
                                                                                <div className="modal-action flex flex-col items-center">
                                                                                    <form method="dialog" className='w-full'>
                                                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                                                        <input type="file" id="input_image" className="file-input file-input-bordered w-full max-w-xs" onChange={handleFileChange} />
                                                                                        <button className={`btn w-full mt-6 ${fileSelected ? 'btn-success text-neutral-50' : 'btn-disabled'}`} onClick={handleCompleted}>Complete</button>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </dialog>
                                                                    </>
                                                            }
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
                            Object.keys(reportData).length === 0
                                ? <div className='h-fit flex items-center justify-center pt-10'>
                                    <h2 className='text-gray-600 font-bold text-2xl text-center'>There is no report available</h2>
                                </div>
                                : null
                        }
                        <div className={`toast toast-end z-50 translate-x-full ${open ? 'toast-animation-slideIn' : null}`}>
                            <div className="alert alert-success">
                                <span className='text-neutral-50'>Status Saved Successfully</span>
                            </div>
                        </div>
                    </div>
                </div >
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

    )
}

export default AllReport
