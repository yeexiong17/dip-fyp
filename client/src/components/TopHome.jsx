import React from "react";
import badge from '../asset/badge.png';
import collaboration from '../asset/collaboration.png';
import efficiency from '../asset/efficiency.png';

export default function Top() {
    return (
        <div className="flex flex-wrap">
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                        <img
                                src={badge}
                                alt="Excellent services"
                            />
                        </div>
                        <h6 className="text-xl font-semibold">
                            Excelent Services
                        </h6>
                        <p className="mt-2 mb-4 text-gray-600">
                            We strive to redefine your experience by offering prompt and efficient,
                            fault reporting solutions.
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                        <img
                                src={collaboration}
                                alt="Foster Collaboration"
                            />
                        </div>
                        <h6 className="text-xl font-semibold">
                            Foster Collaboration
                        </h6>
                        <p className="mt-2 mb-4 text-gray-600">
                            We envision a collaborative ecosystem where users, building administrators,
                            and maintenance teams work together.
                        </p>
                    </div>
                </div>
            </div>

            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                        <img
                                src={efficiency}
                                alt="Simplify Reporting"
                            />
                        </div>
                        <h6 className="text-xl font-semibold">
                            Simplify Reporting
                        </h6>
                        <p className="mt-2 mb-4 text-gray-600">
                            We aim to simplify the process of reporting faults
                            and contributing to a swift and efficient resolution.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}