import React, { useState, useEffect } from 'react'

import { useAuthContext } from '../../../MyContext'

import Nav from '../../../components/Nav'

const Review = () => {

    const [reportData, setReportData] = useState([])
    const [step, setStep] = useState('select')
    const [selectedReport, setSelectedReport] = useState(null)
    const [rating1, setRating1] = useState(null)
    const [rating2, setRating2] = useState(null)
    const [comment, setComment] = useState(null)
    const [refresh, setRefresh] = useState(false)

    const { userProfile } = useAuthContext()

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://localhost:8000/user/report/${userProfile.user_id}`, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.ok) {
                    const responseJson = await response.json()
                    setReportData(responseJson.result)
                }
            } catch (error) {
                console.log(error)
            }
        })()

        if (refresh) {
            setRefresh(false);
        }
    }, [refresh])

    const goBack = () => {
        if (step == 'rate') {
            setStep('select')
            setRating1(null)
            setRating2(null)
        }
        else {
            setStep('rate')
            setComment(null)
        }
    }

    const handleSelect = (report) => {
        setSelectedReport(report)

        setStep('rate')
    }

    const handleSubmit = async () => {
        const reviewObject = {
            report_id: selectedReport.report_id,
            rating1: rating1,
            rating2: rating2,
            comment: comment
        }
        try {
            const response = await fetch('http://localhost:8000/user/review', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewObject)
            })

            if (response.ok) {
                setRefresh(true)
                setStep('select')
                setRating1(null)
                setRating2(null)
                setComment(null)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Nav />
            <div className='h-full pt-20 overflow-y-auto'>
                <div className='flex flex-col justify-center w-7/12 mx-auto'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-4xl font-bold text-center'>Comment & Rating</h1>
                        <h5 className='mt-2'>Here, you can leave a comment and rate our services for each report that you have made.</h5>
                    </div>
                    <div className='flex justify-center mt-8'>
                        <ul className="steps w-9/12">
                            <li className={`step after:bg-orange-500 ${step === 'select' || step === 'rate' || step === 'comment' ? 'step-warning' : null}`}>Select a report</li>
                            <li className={`step ${step === 'rate' || step === 'comment' ? 'step-warning' : null}`}>Rate</li>
                            <li className={`step ${step === 'comment' ? 'step-warning' : null}`}>Comment & Submit</li>
                        </ul>
                    </div>
                    {
                        step === 'select'
                            ? null
                            : <div>
                                <button onClick={() => goBack()} className="btn text-base bg-transparent text-orange-500 border-none hover:bg-neutral-200 hover:text-orange-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                        <path fillrule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                    </svg>
                                    Back
                                </button>
                            </div>
                    }
                    <div className='mt-6'>
                        {
                            (() => {
                                if (step === 'select') {
                                    return (
                                        <div>
                                            <h5 className='mt-2 text-red-500 text-center'>*Report that has been rated and reviewed will not be shown here*</h5>
                                            <div className="overflow-x-auto h-80 mt-4">
                                                <table className="table table-pin-rows">
                                                    <thead>
                                                        <tr className='text-neutral-800 text-sm'>
                                                            <th>Report ID</th>
                                                            <th>Report Category</th>
                                                            <th>Description</th>
                                                            <th>Date Reported</th>
                                                            <th>Status</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        reportData.filter(report => report.report_status === 'Completed' && report.report_has_reviewed == 0).length == 0
                                                            ? <tbody>
                                                                <tr>
                                                                    <td colSpan={5}>
                                                                        <p className='text-xl text-center'>Nothing to be reviewed yet...</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                            : <tbody>
                                                                {
                                                                    reportData
                                                                        .filter(report => report.report_status === 'Completed' && report.report_has_reviewed == 0)
                                                                        .map((report, i) => (
                                                                            <tr key={report.reportId}>
                                                                                <th>{report.report_id}</th>
                                                                                <td>{report.report_category}</td>
                                                                                <td className='truncate max-w-xs'>{report.report_description}</td>
                                                                                <td>{report.report_created_date.toString().split('T')[0]}</td>
                                                                                <td>{report.report_status}</td>
                                                                                <td>
                                                                                    <button className="btn btn-outline btn-success min-h-[2.5rem] h-10 px-6" onClick={() => handleSelect(report)}>Select</button>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                }
                                                            </tbody>
                                                    }
                                                </table>
                                            </div>
                                        </div>
                                    )
                                }
                                else if (step === 'rate') {
                                    return (
                                        <div className='flex flex-col items-center mt-4'>
                                            <div className='flex items-center'>
                                                <p className='mr-4 font-semibold'>What do you think about the quality of the fix?</p>
                                                <div className="rating rating-lg">
                                                    <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" onChange={() => setRating1(1)} checked={rating1 === 1} />
                                                    <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" onChange={() => setRating1(2)} checked={rating1 === 2} />
                                                    <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" onChange={() => setRating1(3)} checked={rating1 === 3} />
                                                    <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" onChange={() => setRating1(4)} checked={rating1 === 4} />
                                                    <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" onChange={() => setRating1(5)} checked={rating1 === 5} />
                                                </div>
                                            </div>
                                            <div className='flex items-center mt-4'>
                                                <p className='mr-4 font-semibold'>What do you think about the efficiency of the management?</p>
                                                <div className="rating rating-lg">
                                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onChange={() => setRating2(1)} checked={rating2 === 1} />
                                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onChange={() => setRating2(2)} checked={rating2 === 2} />
                                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onChange={() => setRating2(3)} checked={rating2 === 3} />
                                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onChange={() => setRating2(4)} checked={rating2 === 4} />
                                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onChange={() => setRating2(5)} checked={rating2 === 5} />
                                                </div>
                                            </div>
                                            <div className='mt-10'>
                                                <button className={`btn btn-lg btn-outline ${rating1 == null || rating2 == null ? 'btn-disabled' : null} text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-neutral-50 hover:border-orange-500 min-h-[2.5rem] h-10 px-6`} onClick={() => setStep('comment')}>Next</button>
                                            </div>
                                        </div>
                                    )
                                }
                                else if (step === 'comment') {
                                    return (
                                        <div className='flex flex-col items-center mt-4 mx-auto w-9/12'>
                                            <div className='w-full'>
                                                <textarea className="textarea textarea-bordered w-full text-base" placeholder="Leave a comment..." onChange={(e) => setComment(e.target.value)}></textarea>
                                            </div>
                                            <div className='mt-10'>
                                                <button className={`btn btn-lg btn-outline ${comment == null ? 'btn-disabled' : null} text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-neutral-50 hover:border-orange-500 min-h-[2.5rem] h-10 px-6`} onClick={() => handleSubmit()}>Submit</button>
                                            </div>
                                        </div>
                                    )
                                }
                            })()
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Review
