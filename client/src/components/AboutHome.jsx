import React from "react";

export default function Forgetpw() {
    return (
        <div className="flex flex-wrap items-center my-32">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">

                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                    About Us
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700 text-justify">
                    Welcome to RESOLVE, where innovation meets responsibility.
                    Founded 2023, we embarked on a journey to revolutionize the way faults are reported and addressed in buildings.
                    Our story begins with a shared passion for creating safer, more efficient spaces for everyone.
                </p>
                <div class="mt-8">
                    <a href="/about" class="text-blue-500 hover:text-blue-600 font-medium">Learn more about us
                        <span class="ml-2">&#8594;</span></a>
                </div>
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div class="mt-12 md:mt-0">
                    <img src="https://images.unsplash.com/photo-1531973576160-7125cd663d86" alt="About Us Image" class="object-cover rounded-lg shadow-md" />
                </div>
            </div>
        </div>
    )
}