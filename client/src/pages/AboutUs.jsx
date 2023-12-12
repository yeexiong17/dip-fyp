import NavAfter from "../components/Nav";
import aboutus from "../asset/aboutus.jpg";
import aboutus2 from "../asset/aboutus2.png";
import Nav from "../components/Nav";

export default function AboutUs() {
    return (
        <div>
            <Nav />
            <div className="2xl:container 2xl:mx-auto lg:py-24 lg:px-20 md:py-12 md:px-6 py-9 px-4">
                <div className="w-full">
                    <p className="font-bold text-4xl text-center leading-3 mb-12">About Us</p>
                    <h2 className="xl:w-8/12 lg:w-10/12 w-full font-bold text-gray-700 dark:text-white lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2">We are here to create a safer and more efficient environment</h2>
                    <p className="w-10/12 font-normal text-base leading-6 text-gray-600 dark:text-white mt-6">At RESOLVE, our mission is to create a safer and more efficient environment by providing a user-friendly platform for individuals and organizations to report issues promptly and contribute to the well-being of their communities. We believe that a safe and secure environment is a fundamental right, and our platform is designed to be the catalyst for positive change.</p>
                </div>

                <div className="lg:mt-14 sm:mt-10 mt-12">
                    <img className="mx-auto" src={aboutus} alt="Service Team" />
                </div>

                <div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
                    <div className="w-full xl:w-5/12 lg:w-6/12">
                        <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-white">Our Story</h2>
                        <p className="font-normal text-base leading-6 text-gray-600 dark:text-white mt-4">Welcome to RESOLVE, where innovation meets responsibility. Founded 2023, we embarked on a journey to revolutionize the way faults are reported and addressed in buildings. Our story begins with a shared passion for creating safer, more efficient spaces for everyone.</p>
                        <p className="font-normal text-base leading-6 text-gray-600 dark:text-white mt-6">Driven by a commitment to excellence, our team of dedicated professionals pooled their expertise in safety and compliance, recognizing the need for a streamlined and user-friendly platform to report and rectify building faults. We envisioned a world where reporting issues is not just a task but a seamless experience, fostering a culture of safety and proactive maintenance.</p>
                    </div>
                    <div className="lg:flex items-center w-full lg:w-1/3">
                        <img className="lg:block w-full h-full" src={aboutus2} alt="people discussing on board" />
                    </div>
                </div>
            </div>

        </div>
    )
}