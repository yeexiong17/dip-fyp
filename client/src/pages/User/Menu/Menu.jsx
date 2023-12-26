import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../../../components/Nav';
import { useAuthContext } from '../../../MyContext';

import pipe from '../../../asset/pipe.png';
import power_failure from '../../../asset/power_failure.png';
import aircond_service from '../../../asset/aircond_service.png';
import cleaning from '../../../asset/cleaning.png';
import building from '../../../asset/building.png';
import outdoor from '../../../asset/outdoor.png';
import facilities from '../../../asset/facilities.png';
import pest_control from '../../../asset/pest_control.png';

const categories = [
    {
        id: 0,
        name: 'Water failure',
        image: pipe
    },
    {
        id: 1,
        name: 'Power failure',
        image: power_failure
    },
    {
        id: 2,
        name: 'Aircond service',
        image: aircond_service

    },
    {
        id: 3,
        name: 'Cleaning',
        image: cleaning
    },
    {
        id: 4,
        name: 'Building',
        image: building
    },
    {
        id: 5,
        name: 'Outdoor',
        image: outdoor
    },
    {
        id: 6,
        name: 'Facilities',
        image: facilities
    },
    {
        id: 7,
        name: 'Pest control',
        image: pest_control
    },
];

const Menu = () => {

    const { setReportCategory } = useAuthContext()

    return (
        <div>
            <Nav />
            <div className="flex flex-col pt-20 items-center">
                <h1 className="text-3xl font-bold text-center">Types of Problems</h1>

                <h3 className="max-w-xl mx-auto text-xl text-center mt-10">
                    We provide maintenance and repair, addressing a spectrum of issues, from minor to major faults, ensuring everything functions seamlessly.
                </h3>

                <div className="max-w-3xl mx-auto m-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 ">
                        {categories.map(category => (
                            <Link to='/report' key={category.id} className='flex-grow-0' onClick={() => setReportCategory(category.name)}>
                                <div className="bg-white p-4 rounded shadow-md text-center active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform">

                                    <img src={category.image} alt={category.name} className="mx-auto w-20 object-center mb-4" />
                                    <h2 className="text-base font-semibold align-bottom ">{category.name}</h2>
                                </div>
                            </Link>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
