import React from "react";
import sastifaction from '../asset/sastifaction.png';
import hour from '../asset/hour.png';
import goodwork from '../asset/goodwork.png';

export default function Middle() {
    return (
        <section className="pb-20 relative block bg-gray-900">
            <div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                style={{ height: "80px" }}>
                <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
                    version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                    <polygon className="text-gray-900 fill-current" points="2560 0 2560 100 0 100"></polygon>
                </svg>
            </div>

            <div className="container mx-auto px-4 lg:pt-24 lg:pb-10">
                <div className="flex flex-wrap text-center justify-center">
                    <div className="w-full lg:w-6/12 px-4">
                        <h2 className="text-4xl font-semibold text-white">
                            Fix something
                        </h2>
                        <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                            Our team brings together a wealth of experience and proficiency from diverse industries,
                            ensuring maintenance and safety of your building.
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap mt-24 justify-center">
                    <div className="w-full lg:w-3/12 px-4 text-center">
                        <div
                            className="text-gray-900 p-3 w-24 h-12 inline-flex items-center justify-center">
                            <img
                                src={sastifaction}
                                alt="Sastifaction Guaranteed"
                            />
                        </div>
                        <h6 className="text-xl mt-5 font-semibold text-white">
                            Sastifaction Guaranteed
                        </h6>
                    </div>
                    <div className="w-full lg:w-3/12 px-4 text-center">
                        <div
                            className="text-gray-900 p-3 w-24 h-12 inline-flex items-center justify-center">
                            <img
                                src={hour}
                                alt="24/7 Services"
                            />
                        </div>
                        <h5 className="text-xl mt-5 font-semibold text-white">
                            24/7 Services
                        </h5>
                    </div>
                    <div className="w-full lg:w-3/12 px-4 text-center">
                        <div
                            className="text-gray-900 p-3 w-24 h-12 inline-flex items-center justify-center">
                            <img
                                src={goodwork}
                                alt="High Quality Work"
                            />
                        </div>
                        <h5 className="text-xl mt-5 font-semibold text-white">
                            High Quality Work
                        </h5>
                    </div>
                </div>
            </div>
        </section>
    )
}