import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {


    return (
        <div classNameName="">
      <header>
        <nav className="container flex items-center py-4 mt-4 sm:mt-12">
            <div className="py-1"><img src="/images/MedScout.png" alt="Med Scout Logo" className="logo-img"></img></div>
            <ul className="hidden sm:flex flex-1 justify-end items-center gap-12 text-bookmark-blue uppercase text-s">
                <li className="cursor-pointer">Features</li>
                <li className="cursor-pointer">Services</li>
                <li className="cursor-pointer">Contact</li>
                    <Link to="/login" ><button   type="button" className="bg-bookmark-red text-white rounded-md px-7 py-3 uppercase">Login</button></Link>
            </ul>
            <div className="flex sm:hidden flex-1 justify-end"><span className="fas fa-bars text-3xl"></span></div>
        </nav>
    </header>

    {/* <!-- Hero Section --> */}
    <section className="relative">
        <div className="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28">
            {/* <!-- Content --> */}
            <div className="flex flex-1 flex-col items-center lg:items-start">
                <h2
                    className="text-bookmark-blue text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-violet-500">
                    All your records in one place </h2>
                <p className="text-bookmark-grey text-lg text-center lg:text-left mb-6"> Keep your medical records at one
                    place, easily accessible to whomever needs them.</p>

                <div className="flex justify-center flex-wrap gap-6">
                    <button className="btn btn-primary hover:bg-bookmark-white hover:text-black" type="button">Get it on
                        Chrome</button>
                    <button className="btn btn-secondary hover:bg-bookmark-purple hover:text-white" type="button">Get it on
                        Firefox</button>
                </div>
            </div>

            {/* <!-- Image --> */}
            <div className="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10 border-solid">
                <img src="../images/hospital-medical-staff-team-01-.jpg" alt=""
                    className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full rounded-md ring-8 ring-bookmark-purple/[.70]"></img>
            </div>

        </div>

        {/* <!-- Rounded Rectangle --> */}
        <div
            className="hidden md:block overflow-hidden bg-bookmark-purple rounded-l-full absolute h-72 w-2/4 top-32 right-0 lg:-bottom-28 lg:-right-36">
        </div>
    </section>

    {/* <!-- Features Section --> */}
    <section className="bg-bookmark-white py-20 mt-20 lg:mt-60">
        {/* <!-- Heading Markup --> */}
        <div className="sm:w-3/4 lg:w-5/12 mx-auto px-2">
            <h1 className="text-3xl text-center text-bookmark-blue">Features</h1>
            <p className="text-center text-bookmark-grey mt-4">Our aim is to make it quick and easy for you to access your
                medical records of any point of time. Your records are well maintained over your devices and on the
                blockchain network so you can access them on the go.</p>
        </div>

        {/* <!-- Feature #1 --> */}
        <div className="relative mt-20 lg:mt-24">
            <div className="container flex flex-col lg:flex-row items-center justify-center gap-x-24">
                {/* <!-- Image --> */}
                <div className="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
                    <img className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full ring-8 ring-black/[0.7] rounded-md"
                        src="../images/image_processing20220124-1649-1cgc6eo.png" alt=""></img>
                </div>
                {/* <!-- Content --> */}
                <div className="flex flex-1 flex-col items-center lg:items-start">
                    <h1 className="text-3xl text-bookmark-blue">Everything At One Place</h1>
                    <p className="text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full">
                        Organize your medical records, medicine history and doctors prescription all at one place, and
                        never have to look anywhere else. </p>
                    <button type="button" className="btn btn-primary hover:bg-bookmark-white hover:text-black">More
                        Info</button>
                </div>
            </div>
            {/* <!-- Rounded Rectangle --> */}
            <div
                className="hidden lg:block overflow-hidden bg-bookmark-purple rounded-r-full absolute h-80 w-2/4 -bottom-24 -left-36">
            </div>
        </div>

        {/* <!-- Feature #2 --> */}
        <div className="relative mt-20 lg:mt-52">
            <div className="container flex flex-col lg:flex-row-reverse items-center justify-center gap-x-24">
                {/* <!-- Image --> */}
                <div className="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
                    <img className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full ring-8 ring-black/[0.7] rounded-md"
                        src="../images/bigstock-Wellness-Concept-Flat-Tiny-Pe-354797942_1024X684.png" alt="" />
                </div>
                {/* <!-- Content --> */}
                <div className="flex flex-1 flex-col items-center lg:items-start">
                    <h1 className="text-3xl text-bookmark-blue">Intelligent search</h1>
                    <p className="text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full">
                        Our powerful search feature will help you find saved records in no time at all. No need to crawl
                        through all of your documents.
                    </p>
                    <button type="button" className="btn btn-primary hover:bg-bookmark-white hover:text-black">More
                        Info</button>
                </div>
            </div>
            {/* <!-- Rounded Rectangle --> */}
            <div
                className="hidden lg:block overflow-hidden bg-bookmark-purple rounded-l-full absolute h-80 w-2/4 -bottom-24 -right-36">
            </div>
        </div>

        {/* <!-- Feature #3 --> */}
        <div className="relative mt-20 lg:mt-52">
            <div className="container flex flex-col lg:flex-row items-center justify-center gap-x-24">
                {/* <!-- Image --> */}
                <div className="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
                    <img className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full ring-8 ring-black/[0.7] rounded-md"
                        src="../images/hero_image.png" alt="" />
                </div>
                {/* <!-- Content --> */}
                <div className="flex flex-1 flex-col items-center lg:items-start">
                    <h1 className="text-3xl text-bookmark-blue">Share your Record</h1>
                    <p className="text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full">
                        Easily share your records and prescription with world className doctors. Create a shareable link
                        that you can send at the click of a button.
                    </p>
                    <button type="button" className="btn btn-primary hover:bg-bookmark-white hover:text-black">More
                        Info</button>
                </div>
            </div>
            {/* <!-- Rounded Rectangle --> */}
            <div
                className="hidden lg:block overflow-hidden bg-bookmark-purple rounded-r-full absolute h-80 w-2/4 -bottom-24 -left-36">
            </div>
        </div>
    </section>

     {/* <!-- Services --> */} 
    <section className="py-20 mt-20">
        {/* <!-- Heading --> */} 
        <div className="sm:w-3/4 lg:w-5/12 mx-auto px-2">
            <h1 className="text-3xl text-center text-bookmark-blue">Avail Services</h1>
            <p className="text-center text-bookmark-grey mt-4">
                We have got more services in the pipeline. Please do let us know if you have got a favourite you would
                like us to prioritize.
            </p>
        </div>

         {/* <!-- Cards --> */} 
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-screen-lg mt-16 gap-16">

             {/* <!-- Card 1 --> */} 
            <div className="flex flex-col rounded-md shadow-md">
                <div className="p-6 flex flex-col items-center">
                    <img src="../images/1200px-Male_Doctor_Flat_Icon_Vector.svg.png" alt="" />
                    <h3 className="mt-5 mb-2 text-bookmark-blue text-lg">Visit Doctor</h3>
                    <p className="mb-2 text-bookmark-grey font-light">Chat or call with doctor</p>
                </div>
                <hr className="border-b border-bookmark-white" />
                <div className="flex p-6">
                    <button type="button" className="flex-1 btn btn-primary hover:bg-bookmark-white hover:text-black"> BOOK
                        AN APOINTMENT </button>
                </div>
            </div>

            {/* <!-- Card 2 --> */}
            <div className="flex flex-col rounded-md shadow-md">
                <div className="p-6 flex flex-col items-center">
                    <img src="../images/2810182.png" alt="" className="rounded-lg " />
                    <h3 className="mt-5 mb-2 text-bookmark-blue text-lg">Keep Medical History</h3>
                    <p className="mb-2 text-bookmark-grey font-light">Upload your documents</p>
                </div>
                <hr className="border-b border-bookmark-white" />
                <div className="flex p-6">
                    <button type="button" className="flex-1 btn btn-primary hover:bg-bookmark-white hover:text-black">
                        UPLOAD DOCUMENTS </button>
                </div>
            </div>

            {/* <!-- Card 3 --> */}
            <div className="flex flex-col rounded-md shadow-md">
                <div className="p-6 flex flex-col items-center">
                    <img src="../images/lab-tests-concept-icon.jpg" alt="" />
                    <h3 className="mt-5 mb-2 text-bookmark-blue text-lg">Pathology</h3>
                    <p className="mb-2 text-bookmark-grey font-light">All kinds of test available here</p>
                </div>
                <hr className="border-b border-bookmark-white" />
                <div className="flex p-6">
                    <button type="button" className="flex-1 btn btn-primary hover:bg-bookmark-white hover:text-black"> BOOK
                        A TEST </button>
                </div>
            </div>

        </div>
    </section>

    {/* <!-- FAQ --> */} 
    <section className="bg-bookmark-white py-20">
        <div className="container">
            {/* <!-- Heading --> */}
            <div className="sm:w-3/4 lg:w-5/12 mx-auto px-2">
                <h1 className="text-3xl text-center text-bookmark-blue">Frequently Asked Questions</h1>
                <p className="text-center text-bookmark-grey mt-4">
                    Here are some of our FAQs. If you have any other queries you'd like answered please feel free to
                    contact us.
                </p>
            </div>

            {/* <!-- FAQ Items --> */}
            <div className="flex flex-col sm:w-3/4 lg:w-5/12 mt-12 mx-auto">

                <div className="border-b py-4 shadow-md">
                   {/* <!-- Question --> */}
                    <div className="cursor-pointer flex items-center px-2" >
                        <span className="flex-1">How to upload the medical records?</span>
                        <span className="text-bookmark-purple fas fa-chevron-down transition-all duration-300
                             transform rotate-180"></span>
                    </div>

                     {/* <!-- Answer --> */}
                    <div className="bg-white mx-2 px-4 py-1 mt-1 rounded-md">
                        <p>You can drag and drop or choose file from your system in order to upload the documents.</p>
                    </div>

                </div>

                <div className="border-b py-4 my-4 shadow-md" >
                    {/* <!-- Question --> */}
                    <div className="cursor-pointer flex items-center px-2" >
                        <span className="flex-1">In what format should we upload the document?</span>
                        <span className="text-bookmark-purple fas fa-chevron-down transition-all duration-300"
                           ></span>
                    </div>

                    {/* <!-- Answer --> */}
                    <div 
                        className="bg-white mx-2 px-4 py-1 mt-1 rounded-md">
                        <p>All kind of documents are accepted be it pdf, jpg, png or doc.</p>
                    </div>


                </div>

                <div className="border-b py-4 shadow-md">
                    {/* <!-- Question --> */} 
                    <div className="cursor-pointer flex items-center px-2">
                        <span className="flex-1">Can we get the medicines from here?</span>
                        <span className="text-bookmark-purple fas fa-chevron-down transition-all duration-300"
                            ></span>
                    </div>

                    {/* <!-- Answer --> */}
                    <div 
                        className="bg-white mx-2 px-4 py-1 mt-1 rounded-md">
                        <p>We will be starting our delivery service very soon. Stay in touch.</p>
                    </div>

                </div>


                <div className="border-b py-4 my-4 shadow-md">
                    {/* <!-- Question --> */}
                    <div className="cursor-pointer flex items-center px-2">
                        <span className="flex-1">Are my data secure?</span>
                        <span className="text-bookmark-purple fas fa-chevron-down transition-all duration-300"
                            ></span>
                    </div>

                    {/* <!-- Answer --> */}
                    <div 
                        className="bg-white mx-2 px-4 py-1 mt-1 rounded-md">
                        <p>Yes, Our entire infrastructure is based on blockchain network. You have full control over
                            your data. The entire process is transparent.</p>
                    </div>
                </div>


                <button type="button"
                    className="mt-12 flex self-center btn btn-primary hover:bg-bookmark-white hover:text-black"> Ask
                    Questions </button>

            </div>
        </div>
    </section>

    {/* <!-- Contact Us --> */}
    <section className="bg-bookmark-purple text-white py-20">
        <div className="container">
            <div className="sm:w-3/4 lg:w-2/4 mx-auto">
                <p className="font-light uppercase text-center mb-8"> 35000+ already joined </p>
                <h1 className="text-3xl text-center">Stay up to date with what we're doing</h1>
                <div className="flex flex-col sm:flex-row gap-6 mt-8">
                    <input type="email" name="email_input" placeholder="Enter your email address"
                        className="focus:outline-none flex-1 px-2 py-3 rounded-md text-black"></input>
                    <button className="btn bg-bookmark-red hover:bg-bookmark-white hover:text-black" type="button">Contact
                        Us</button>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Footer --> */}
    <footer className="bg-bookmark-blue py-8">
        <div className="container flex flex-col md:flex-row items-center">
            <div className="flex flex-1 flex-wrap items-center justify-center md:justify-start gap-12">
                <img src="../images/MedScout1.png" alt="" width="15%" height="15%" />
                <ul className="flex text-white uppercase gap-12 text-xs">
                    <li className="cursor-pointer">Features</li>
                    <li className="cursor-pointer">Services</li>
                    <li className="cursor-pointer">Contact</li>
                </ul>
            </div>
            <div className="flex gap-10 mt-12 md:mt-0">
                <li><i className="text-white text-2xl fab fa-twitter"></i></li>
                <li><i className="text-white text-2xl fab fa-facebook-square"></i></li>
            </div>
        </div>
    </footer>
    </div>
    );
}

export default HomeScreen