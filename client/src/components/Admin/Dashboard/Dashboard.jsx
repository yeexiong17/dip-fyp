import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Number of Report',
        }
    }
}

const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Number of New User',
        },
    },
};

const lineLabels = ['Pest Control', 'Pipe Leakage', 'AirCon Service', 'Electrical', 'Building', 'Outdoor', 'Facilities'];
const barLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const lineData = {
    labels: lineLabels,
    datasets: [
        {
            label: 'Dataset 1',
            data: lineLabels.map(() => Math.floor(Math.random() * 1001)),
            borderColor: 'rgb(249, 115, 22)',
            backgroundColor: 'rgba(249, 115, 22, 0.5)',
        }
    ]
}

const barData = {
    labels: barLabels,
    datasets: [
        {
            label: 'Dataset 1',
            data: barLabels.map(() => Math.floor(Math.random() * 1001)),
            backgroundColor: 'rgba(249, 115, 22, 0.5)',
        },
    ],
};

const Dashboard = () => {
    return (
        <div className='pl-64 h-full bg-sky-50'>
            <div className='flex flex-col h-full px-12 pt-8 overflow-auto'>
                <div>
                    <h1 className='text-2xl font-bold text-neutral-800'>Dashboard</h1>
                </div>
                <div className='mt-6 grid grid-cols-3 gap-x-24'>
                    <div className='flex items-center justify-center bg-neutral-50 shadow py-8'>
                        <div className='mr-6'>
                            <img width="64" height="64" src="https://img.icons8.com/flat-round/64/statistic-document.png" alt="statistic-document" />
                        </div>
                        <div className='flex flex-col justify-center w-fit'>
                            <h1>Total Reports</h1>
                            <h1 className='text-3xl font-extrabold'>234</h1>
                        </div>
                    </div>
                    <div className='flex items-center justify-center bg-neutral-50 shadow py-8'>
                        <div className='mr-6'>
                            <img width="64" height="64" src="https://img.icons8.com/flat-round/64/checkmark.png" alt="checkmark" />
                        </div>
                        <div className='flex flex-col justify-center w-fit'>
                            <h1>Accepted Reports</h1>
                            <h1 className='text-3xl font-extrabold'>230</h1>
                        </div>
                    </div>
                    <div className='flex items-center justify-center bg-neutral-50 shadow py-8'>
                        <div className='mr-6'>
                            <img width="64" height="64" src="https://img.icons8.com/color/64/user.png" alt="user" />
                        </div>
                        <div className='flex flex-col justify-center w-fit'>
                            <h1>Total Reports</h1>
                            <h1 className='text-3xl font-extrabold'>1200</h1>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between w-full h-3/5 mt-8 gap-10'>
                    <div className='bg-neutral-50 p-4 h-full shadow grow'>
                        <Line options={lineOptions} data={lineData} />
                    </div>
                    <div className='bg-neutral-50 p-4 h-full shadow grow aspect-square'>
                        <Bar options={barOptions} data={barData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
