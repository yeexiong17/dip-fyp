import React, { useEffect, useState } from 'react'
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

import Sidebar from '../../../components/Sidebar';

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
            text: 'Total Number of Report',
        }
    },
    scales: {
        y: {
            ticks: {
                beginAtZero: true,
                callback: function (value) { if (value % 1 === 0) { return value; } }
            }
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
            text: 'Number of New User (Past 5 Months)',
        },
    },
    scales: {
        y: {
            ticks: {
                beginAtZero: true,
                callback: function (value) { if (value % 1 === 0) { return value; } }
            }
        }
    }
};

const lineLabels = ['Pest Control', 'Water Failure', 'Aircond Service', 'Power Failure', 'Building', 'Outdoor', 'Cleaning', 'Facilities'];
const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Dashboard = () => {

    const [allReport, setAllReport] = useState([])
    const [allUser, setAllUser] = useState([])
    const [pastMonth, setPastMonth] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:8000/admin/dashboard-data', {
                    method: 'GET'
                })

                if (response.ok) {
                    const responseJson = await response.json()
                    setAllReport(responseJson.allReport)
                    setAllUser(responseJson.allUser)
                    pastFourMonth()
                }
                else {
                    const responseJson = await response.json()

                    alert(responseJson.message)
                }
            }
            catch (error) {
                console.log(error)
            }

        })()
    }, [])

    const pastFourMonth = () => {
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth()
        const currentYear = currentDate.getFullYear()
        const monthsToShow = 4

        const result = []

        for (let i = 1; i <= monthsToShow; i++) {
            const pastMonthIndex = currentMonth - i
            const pastYear = pastMonthIndex < 0 ? currentYear - 1 : currentYear
            const pastMonth = (pastMonthIndex + 12) % 12

            result.push(`${allMonths[pastMonth]} ${pastYear}`)
        }

        setPastMonth(result.reverse())
    }

    const lineData = {
        labels: lineLabels,
        datasets: [
            {
                label: 'Report',
                data: lineLabels.map((category) => allReport.filter((report) => report.report_category == category).length),
                borderColor: 'rgb(249, 115, 22)',
                backgroundColor: 'rgba(249, 115, 22, 0.5)',
            }
        ]
    }

    const barData = {
        labels: pastMonth,
        datasets: [
            {
                label: 'User',
                data: pastMonth.map((month) => {
                    const [monthName, year] = month.split(' ')
                    const monthIndex = allMonths.indexOf(monthName)
                    const count = allUser.filter((user) => {
                        const userMonth = new Date(user.user_created_date).getMonth()
                        const userYear = new Date(user.user_created_date).getFullYear()
                        return userMonth === monthIndex && userYear.toString() === year
                    }).length

                    return count
                }),
                backgroundColor: 'rgba(249, 115, 22, 0.5)',
            },
        ],
    };

    return (
        <>
            <Sidebar />
            <div className='pl-64 h-full bg-sky-50'>
                <div className='flex flex-col h-full px-12 pt-8 overflow-auto'>
                    <div>
                        <h1 className='text-2xl font-bold text-neutral-800'>Dashboard</h1>
                    </div>
                    <div className='mt-6 grid md:grid-cols-3 gap-x-24'>
                        <div className='flex items-center justify-center bg-neutral-50 shadow py-8'>
                            <div className='mr-6'>
                                <img width="64" height="64" src="https://img.icons8.com/flat-round/64/checkmark.png" alt="checkmark" />
                            </div>
                            <div className='flex flex-col justify-center w-fit'>
                                <h1>Accepted Reports</h1>
                                <h1 className='text-3xl font-extrabold'>
                                    {
                                        allReport.filter(report => report.report_status !== 'Rejected' && report.report_status !== 'Incoming').length
                                    }
                                </h1>
                            </div>
                        </div>
                        <div className='flex items-center justify-center bg-neutral-50 shadow py-8'>
                            <div className='mr-6'>
                                <img width="64" height="64" src="https://img.icons8.com/flat-round/64/statistic-document.png" alt="statistic-document" />
                            </div>
                            <div className='flex flex-col justify-center w-fit'>
                                <h1>Total Reports</h1>
                                <h1 className='text-3xl font-extrabold'>{allReport.length}</h1>
                            </div>
                        </div>
                        <div className='flex items-center justify-center bg-neutral-50 shadow py-8'>
                            <div className='mr-6'>
                                <img width="64" height="64" src="https://img.icons8.com/color/64/user.png" alt="user" />
                            </div>
                            <div className='flex flex-col justify-center w-fit'>
                                <h1>Total Users</h1>
                                <h1 className='text-3xl font-extrabold'>{allUser.length}</h1>
                            </div>
                        </div>
                    </div>
                    <div className='grid sm:grid-rows-1 md:grid-cols-3 items-center justify-between w-full mt-8 gap-8'>
                        <div className='col-span-2	bg-neutral-50 p-4 h-full shadow grow'>
                            <Line options={lineOptions} data={lineData} />
                        </div>
                        <div className='bg-neutral-50 p-4 h-full shadow grow aspect-square'>
                            <Bar options={barOptions} data={barData} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
