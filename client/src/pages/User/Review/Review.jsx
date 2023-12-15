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

                    {/* Public Review Design */}
                    {/* <div className='mt-8'>
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <p className="ms-2 text-3xl font-bold text-gray-900 dark:text-white">4.95</p>
                        </div>
                    </div> */}
                    {/* <div className='w-6/12'>
                        <div className="flex items-center mt-4">
                            <p className="text-sm font-medium text-blue-600">5 star</p>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="h-5 bg-yellow-300 rounded" style={{ width: '70%' }}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">70%</span>
                        </div>
                        <div className="flex items-center mt-4">
                            <p className="text-sm font-medium text-blue-600">4 star</p>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="h-5 bg-yellow-300 rounded" style={{ width: '17%' }}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">17%</span>
                        </div>
                        <div className="flex items-center mt-4">
                            <p className="text-sm font-medium text-blue-600">3 star</p>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="h-5 bg-yellow-300 rounded" style={{ width: '8%' }}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">8%</span>
                        </div>
                        <div className="flex items-center mt-4">
                            <p className="text-sm font-medium text-blue-600">2 star</p>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="h-5 bg-yellow-300 rounded" style={{ width: '4%' }}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">4%</span>
                        </div>
                        <div className="flex items-center mt-4">
                            <p className="text-sm font-medium text-blue-600">1 star</p>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="h-5 bg-yellow-300 rounded" style={{ width: '1%' }}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">1%</span>
                        </div>
                    </div> */}
                    {/* <div className='mt-6'>
                        <button className="btn bg-orange-500 text-neutral-50 rounded-full hover:bg-orange-600" onClick={() => document.getElementById('my_modal_3').showModal()}>Leave a review</button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-2xl">Let us know what you think!</h3>
                                <form onSubmit={handleSubmit} action='/'>
                                    <div className="rating mt-4">
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    </div>
                                    <div className='mt-4'>
                                        <textarea className="textarea textarea-bordered w-full" placeholder="Write a review..." required></textarea>
                                    </div>
                                    <div className='mt-10'>
                                        <button type='submit' className="btn bg-orange-500 text-neutral-50 hover:bg-orange-600 rounded-full">Submit Review</button>
                                    </div>
                                </form>
                            </div>
                        </dialog>
                    </div> */}
                    {/* <div className='mt-6'>
                        <article className="p-6 mb-4 text-base bg-white border border-neutral-200 rounded-lg dark:bg-gray-900 shadow">
                            <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">Jake</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400"><time dateTime="2022-02-08"
                                        title="February 8th, 2022">March. 3, 2022</time></p>
                                </div>
                            </footer>
                            <p className="text-gray-500 dark:text-gray-400">The management is very efficient in doing maintainance. It usually take about 2 days for the problem to be solved.</p>
                        </article>
                        <article className="p-6 mb-4 text-base bg-white border border-neutral-200 rounded-lg dark:bg-gray-900 shadow">
                            <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">John</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400"><time dateTime="2022-02-08"
                                        title="February 8th, 2022">Jan. 1, 2022</time></p>
                                </div>
                            </footer>
                            <p className="text-gray-500 dark:text-gray-400">This is website is well designed. It allows user to navigate the website with ease.</p>
                        </article>
                        <article className="p-6 mb-4 text-base bg-white border border-neutral-200 rounded-lg dark:bg-gray-900 shadow">
                            <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">Mike</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400"><time dateTime="2022-02-08"
                                        title="February 8th, 2022">Aug. 22, 2022</time></p>
                                </div>
                            </footer>
                            <p className="text-gray-500 dark:text-gray-400">I am impressed with how I can make report with just a few clicks. I do not need to go all the way to the management physically to make reports.</p>
                        </article>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Review
