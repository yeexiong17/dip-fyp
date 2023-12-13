import React from 'react'

import Nav from '../../../components/Nav'

const Review = () => {
    return (
        <>
            <Nav />
            <div className='h-full pt-20 overflow-y-auto'>
                <div className='flex flex-col justify-center w-7/12 mx-auto'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-4xl font-bold text-center'>Review & Rating</h1>
                    </div>
                    <div className='mt-8'>
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <p className="ms-2 text-3xl font-bold text-gray-900 dark:text-white">4.95</p>
                        </div>
                    </div>
                    <div className='w-6/12'>
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
                    </div>
                    <div className='mt-12'>
                        <article className="p-6 mb-4 text-base bg-white border border-neutral-200 rounded-lg dark:bg-gray-900 shadow">
                            <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">Michael Gough</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate dateTime="2022-02-08"
                                        title="February 8th, 2022">Feb. 8, 2022</time></p>
                                </div>
                            </footer>
                            <p className="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                                instruments for the UX designers. The knowledge of the design tools are as important as the
                                creation of the design strategy.</p>
                        </article>
                        <article className="p-6 mb-4 text-base bg-white border border-neutral-200 rounded-lg dark:bg-gray-900 shadow">
                            <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">Michael Gough</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate dateTime="2022-02-08"
                                        title="February 8th, 2022">Feb. 8, 2022</time></p>
                                </div>
                            </footer>
                            <p className="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                                instruments for the UX designers. The knowledge of the design tools are as important as the
                                creation of the design strategy.</p>
                        </article>
                        <article className="p-6 mb-4 text-base bg-white border border-neutral-200 rounded-lg dark:bg-gray-900 shadow">
                            <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">Michael Gough</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate dateTime="2022-02-08"
                                        title="February 8th, 2022">Feb. 8, 2022</time></p>
                                </div>
                            </footer>
                            <p className="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                                instruments for the UX designers. The knowledge of the design tools are as important as the
                                creation of the design strategy.</p>
                        </article>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Review
