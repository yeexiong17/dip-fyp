import React from 'react';
import { Link } from 'react-router-dom';
import NavAfter from '../components/NavAfter';
import pipe from '../asset/pipe.png';
import power_failure from '../asset/power_failure.png';
import aircond_service from '../asset/aircond_service.png';
import cleaning from '../asset/cleaning.png';
import building from '../asset/building.png';
import outdoor from '../asset/outdoor.png';
import facilities from '../asset/facilities.png';
import pest_control from '../asset/pest_control.png';


const categories = [
    { id: 1, name: 'Water failure', image: pipe, link: '/form' },
    { id: 2, name: 'Power failure', image: power_failure, link: '/form' },
    { id: 3, name: 'Aircond service', image: aircond_service, link: '/form' },
    { id: 4, name: 'Cleaning', image: cleaning, link: '/form' },
    { id: 5, name: 'Building', image: building, link: '/form' },
    { id: 6, name: 'Outdoor', image: outdoor, link: '/form' },
    { id: 7, name: 'Facilities', image: facilities, link: '/form' },
    { id: 8, name: 'Pest control', image: pest_control, link: '/form' },
];

const Menu = () => {
    return (
        <div>
            <NavAfter />
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold text-center mt-12">Types of Problems</h1>

                <h3 className="max-w-xl mx-auto text-xl text-center mt-10">
                    We provide maintenance and repair, addressing a spectrum of issues, from minor to major faults, ensuring everything functions seamlessly.
                </h3>

                <div className="max-w-3xl mx-auto m-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 ">
                        {categories.map(category => (
                            <div key={category.id} className="bg-white p-4 rounded shadow-md text-center active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform">
                                <Link to={category.link} className='flex-grow-0'>
                                    <img src={category.image} alt={category.name} className="mx-auto w-20 object-center mb-4" />
                                </Link>
                                <h2 className="text-base font-semibold align-bottom ">{category.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
