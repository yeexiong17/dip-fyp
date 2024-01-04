import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Nav from '../../../components/Nav'
import { useAuthContext } from '../../../MyContext'

const Menu = () => {

    const [categoryData, setCategoryData] = useState([])

    const { setReportCategory } = useAuthContext()

    useEffect(() => {
        getAllCategory()
    }, [])

    const getAllCategory = async () => {
        const response = await fetch('http://localhost:8000/user/get-all-category', {
            method: 'GET'
        })

        if (response.ok) {
            const responseJson = await response.json()

            setCategoryData(responseJson.categoryData)
        }
    }


    return (
        <div>
            <Nav />
            <div className="flex flex-col pt-20 items-center">
                <h1 className="text-3xl font-bold text-center">Types of Problems</h1>

                <h3 className="max-w-xl mx-auto text-xl text-center mt-10">
                    We provide maintenance and repair, addressing a spectrum of issues, from minor to major faults, ensuring everything functions seamlessly.
                </h3>

                <div className="max-w-3xl mx-auto m-16">
                    <div className={`grid grid-cols-1 ${categoryData.length != 0 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-1 lg:grid-cols-1'}  gap-7`}>
                        {
                            categoryData.length != 0
                                ? categoryData.map((category, key) => (
                                    <Link to='/report' key={key} onClick={() => setReportCategory(category.menu_name)}>
                                        <div className="bg-white p-4 rounded shadow-md text-center active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform">

                                            <img src={category.menu_image} alt={category.menu_name} className="mx-auto w-20 aspect-square object-center mb-4" />
                                            <h2 className="text-base font-semibold align-bottom ">{category.menu_name}</h2>
                                        </div>
                                    </Link>
                                ))
                                : <p className='font-bold text-xl'>Oppsss... No Report Category Available</p>
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Menu;
