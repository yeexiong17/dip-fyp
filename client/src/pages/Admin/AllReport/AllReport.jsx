import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../../../firebase.config'

import Sidebar from '../../../components/Sidebar'

import './AllReport.css'

const AllReport = () => {

    const [open, setOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedReport, setSelectedReport] = useState(null)
    const [fileSelected, setFileSelected] = useState(false)
    const [allReport, setAllReport] = useState([])
    const [allReview, setAllReview] = useState([])
    const [userData, setUserData] = useState({})
    const [selectedReview, setSelectedReview] = useState(null)
    const [userId, setUserId] = useState(null)
    const [completedImage, setCompletedImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const toastAnimate = () => {
        setOpen(true)

        setTimeout(() => {
            setOpen(false)
        }, 2800)
    }

    useEffect(() => {
        // Fetch user data when userId changes
        if (userId) {
            fetchUserData()
        }
    }, [userId])

    useEffect(() => {

        const fetchReviewData = async () => {
            try {
                const response = await fetch('http://localhost:8000/admin/get-all-review', {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.ok) {
                    const responseJson = await response.json()

                    setAllReview(responseJson.allReview)
                }
                else {
                    const responseJson = await response.json()

                    alert(responseJson.message)
                }
            }
            catch (error) {
                console.log(error)
            }

        }
        fetchAllReports()
        fetchReviewData()
    }, [])

    const fetchAllReports = async () => {
        try {
            const response = await fetch('http://localhost:8000/admin/dashboard-data', {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const responseJson = await response.json()

                setAllReport(responseJson.allReport.filter((report) => report.report_status != 'Incoming'))
            } else {
                const responseJson = await response.json()

                alert(responseJson.message)
            }

        } catch (error) {
            console.log(error)
        }
    }

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

    const handleRowClick = (report) => {
        setSelectedReport(report)
        setUserId(report.user_id)

        const [review] = allReview.filter((review) => review.review_id == report.review_id)

        setSelectedReview(review)
    }

    const handleFileChange = (e) => {
        setFileSelected(!!e.target.files.length) // Set to true if files are selected, false otherwise
    }

    const handleCloseModal = () => {
        if (!isLoading) {
            const input_image = document.querySelector('#input_image')
            input_image.value = ''
            setFileSelected(false)
            setCompletedImage(null)
            document.getElementById('my_modal_1').close()
        }
    }

    const handleCompleted = async (event, report) => {
        event.stopPropagation()

        setIsLoading(true)

        try {

            const imageRef = ref(storage, `report/completed/${completedImage.name + v4()}`)

            const uploadTask = uploadBytesResumable(imageRef, completedImage)

            uploadTask.on("state_changed",
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Attachment Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Attachment Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.error("Error uploading attachment:", error);
                },
                async () => {

                    const downloadUrl = await getDownloadURL(imageRef);

                    const urlObject = {
                        imageUrl: downloadUrl
                    }

                    try {
                        const response = await fetch(`http://localhost:8000/admin/set-completed-image/${report.report_id}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(urlObject),
                            credentials: 'include'
                        })

                        if (response.ok) {
                            const responseJSON = await response.json()
                            fetchAllReports()
                            toastAnimate()
                        }
                    }
                    catch (error) {
                        console.error(error)
                    }
                    finally {
                        setIsLoading(false)
                        handleCloseModal()
                        console.log(downloadUrl)
                    }
                }
            );

        }
        catch (error) {
            console.log(error)
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
                                <h1 className='text-2xl font-bold text-neutral-800'>All Report</h1>
                            </div>

                            <div className={`${Object.keys(allReport).length === 0 ? 'h-fit' : 'h-full'} overflow-y-auto scroll-smooth`}>
                                <table className="table table-pin-rows mt-8 bg-neutral-50 border-2 shadow-md">
                                    {/* head */}
                                    <thead>
                                        <tr className='bg-neutral-50 text-neutral-800 text-sm border-b border-neutral-300'>
                                            <th>ID</th>
                                            <th>Report Category</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Date Reported</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {
                                        Object.keys(allReport).length === 0
                                            ? null
                                            : <tbody>
                                                {
                                                    allReport.map((report, key) => (

                                                        <tr key={key} className='hover hover:cursor-pointer' onClick={() => { handleRowClick(report); setDrawerOpen(true) }}>
                                                            <th>{report.report_id}</th>
                                                            <td>{report.report_category}</td>
                                                            <td className='truncate max-w-xs'>{report.report_description}</td>
                                                            <td>{report.report_status}</td>
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
                                                                {
                                                                    report.report_status == 'Completed'
                                                                        ? <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                                                                            <path fill="#c8e6c9" d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"></path><path fill="#4caf50" d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"></path>
                                                                        </svg>

                                                                        : <>
                                                                            <button className="btn btn-outline btn-success" onClick={(event) => { document.getElementById('my_modal_1').showModal(); event.stopPropagation() }}>Mark as Completed</button>
                                                                            <dialog id="my_modal_1" className="modal" onClick={(event) => { event.stopPropagation() }}>
                                                                                <div className="modal-box">
                                                                                    <h3 className="font-bold text-lg">Upload a photo proof of repair</h3>
                                                                                    <div className="modal-action flex flex-col items-center">
                                                                                        <form method="dialog" className='w-full'>
                                                                                            <button onClick={() => { handleCloseModal() }} type={isLoading ? 'button' : ''} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                                                            <input
                                                                                                type="file"
                                                                                                id="input_image"
                                                                                                className="file-input file-input-bordered w-full max-w-xs"
                                                                                                onChange={(event) => { handleFileChange(event); setCompletedImage(event.target.files[0]) }}
                                                                                            />
                                                                                            <button type='button' className={`btn w-full mt-6 ${fileSelected ? 'btn-success text-neutral-50' : 'btn-disabled'}`} onClick={(event) => { handleCompleted(event, report) }}>
                                                                                                {
                                                                                                    isLoading
                                                                                                        ? <span class="loading loading-spinner loading-md"></span>
                                                                                                        : 'Completed'
                                                                                                }
                                                                                            </button>
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
                                Object.keys(allReport).length === 0
                                    ? <div className='h-fit flex items-center justify-center pt-10'>
                                        <h2 className='text-gray-600 font-bold text-2xl text-center'>There is no report available</h2>
                                    </div>
                                    : null
                            }
                            <div className={`toast toast-end z-50 translate-x-full ${open ? 'toast-animation-slideIn' : null}`}>
                                <div className="alert alert-success">
                                    <span className='text-neutral-50'>Report Updated Successfully</span>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>

                {/* Drawer Content */}
                <div className="drawer-side z-50 overflow-y-auto">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay" onClick={() => { setDrawerOpen(false); }}></label>
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
                                        <p>{userData.user_phone ? userData.user_phone : '-'}</p>
                                    </div>

                                    {
                                        selectedReport.report_status == 'Completed'
                                            ? <div className='mt-4'>
                                                <li>
                                                    {
                                                        selectedReport.report_has_reviewed && selectedReview
                                                            ? <details>
                                                                <summary className='pl-2 text-xl font-bold'>User Review</summary>
                                                                <ul className='flex flex-col w-80'>
                                                                    <div className='flex items-center w-full'>
                                                                        <p className='text-base w-24'>Quality<span className='float-right mr-2'>:</span></p>
                                                                        <div className="rating rating-md">
                                                                            {
                                                                                [...Array(selectedReview.review_rating_1)].map((x, i) =>
                                                                                    <input key={i} type="radio" name="rating" className="mask mask-star-2 bg-orange-400" />
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className='flex items-center w-full'>
                                                                        <p className='text-base w-24'>Efficiency<span className='float-right mr-2'>:</span></p>
                                                                        <div className="rating rating-md">
                                                                            {
                                                                                [...Array(selectedReview.review_rating_2)].map((x, i) =>
                                                                                    <input key={i} type="radio" name="rating" className="mask mask-star-2 bg-orange-400" />
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className='flex flex-col w-full overflow-hidden'>
                                                                        <p className='text-base w-20'>Comment<span className='float-right'>:</span></p>
                                                                        <p className="w-full whitespace-pre-wrap break-words">
                                                                            {selectedReview.review_comment}
                                                                        </p>
                                                                    </div>
                                                                </ul>
                                                            </details>
                                                            : <details>
                                                                <summary className='pl-2 text-xl font-bold'>View User Review</summary>
                                                                <ul>
                                                                    <p className='text-base'>No Review Available</p>
                                                                </ul>
                                                            </details>
                                                    }
                                                </li>
                                            </div>
                                            : null
                                    }

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
                                    <div className='mt-2 bg-neutral-50 p-4 shadow rounded'>
                                        <p className='font-bold'>Complete Image:</p>
                                        {
                                            selectedReport.report_completed_image
                                                ? <img className='w-full mt-4' src={selectedReport.report_completed_image} alt="category-image" />
                                                : <p>Upload an image to complete</p>
                                        }
                                    </div>
                                </>
                                : null
                        }
                    </ul>
                </div>
            </div >
        </>
    )
}

export default AllReport
