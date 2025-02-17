import React from "react";
import Nav from '../../../components/Nav';
import Top from '../../../components/TopHome';
import About from '../../../components/AboutHome';
import Middle from '../../../components/MiddleHome';

export default function Home() {
   return (

      <div>
         <Nav />
         <div className="relative pt-16 pb-32 flex content-center items-center justify-center"
            style={{
               minHeight: "75vh"
            }}>
            <div className="absolute top-0 w-full h-full bg-center bg-cover"
               style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')"
               }}>
               <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>
            </div>
            <div className="container relative mx-auto">
               <div className="items-center flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                     <div className="pr-12">
                        <h1 className="text-orange-500 font-semibold text-5xl">
                           Resolve
                        </h1>
                        <p className="mt-4 text-lg text-gray-300">
                           Create a safer and more efficient environment by providing a user-friendly platform for you to report issues.
                        </p>
                     </div>
                  </div>

               </div>
            </div>
            <div
               className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
               style={{ height: "70px" }}
            >
               <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
               >
                  <polygon
                     className="text-gray-300 fill-current"
                     points="2560 0 2560 100 0 100"
                  ></polygon>
               </svg>
            </div>
         </div>

         <section className="pb-20 bg-gray-300 -mt-24">
            <div className="container mx-auto px-4">
               <Top />
            </div>

            <About />
            <Middle />

         </section>
      </div>
   )
}