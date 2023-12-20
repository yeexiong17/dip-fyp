import React, { useState } from 'react'

import Nav from '../../../components/Nav'

const reportData = [
    {
        reportId: 0,
        faultCategory: 'Electrical',
        venue: 'FCI',
        level: 3,
        area: 'Lab',
        description: 'Lab L234 plug unusable',
        dateReported: '12/3/2023',
        reportStatus: 'Completed',
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
        reportStatus: 'Completed',
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

const Review = () => {

    const [step, setStep] = useState('select')
    const [selectedReport, setSelectedReport] = useState(null)
    const [rating1, setRating1] = useState(null)
    const [rating2, setRating2] = useState(null)
    const [comment, setComment] = useState(null)

    const handleSubmit = () => {
        location.href = '/review'
    }

    const handleSelect = (report) => {
        setSelectedReport(report)
        setStep('rate')
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
                            <li className={`step hover:cursor-pointer after:bg-orange-500 ${step === 'select' || step === 'rate' || step === 'comment' ? 'step-warning' : null}`}>Select a report</li>
                            <li className={`step hover:cursor-pointer ${step === 'rate' || step === 'comment' ? 'step-warning' : null}`}>Rate</li>
                            <li className={`step hover:cursor-pointer ${step === 'comment' ? 'step-warning' : null}`}>Comment & Submit</li>
                        </ul>
                    </div>
                    <div className='mt-8'>
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
                                                            <th></th>
                                                            <th>Report Type</th>
                                                            <th>Description</th>
                                                            <th>Venue</th>
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

                                                                        <tr key={report.reportId}>
                                                                            <th>{i + 1}</th>
                                                                            <td>{report.faultCategory}</td>
                                                                            <td className='truncate max-w-xs'>{report.description}</td>
                                                                            <td>{report.dateReported}</td>
                                                                            <td>{report.reportStatus}</td>
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
                                                <button className={`btn btn-lg btn-outline ${comment == null ? 'btn-disabled' : null} text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-neutral-50 hover:border-orange-500 min-h-[2.5rem] h-10 px-6`} onClick={() => { setStep('select'); setRating1(null); setRating2(null); setComment(null) }}>Submit</button>
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
