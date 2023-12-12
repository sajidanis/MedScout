import { useState, useEffect } from 'react';
import axios from 'axios';
import Record from "../components/Record";
import { useSelector } from 'react-redux';
import Sidebar from "../components/Sidebar";

const UserDashboard = () => {

    const [files, setFiles] = useState([]);
    const { userInfo } = useSelector((state) => state.auth);
    const token = userInfo.token;

    useEffect(() => {
        const fetchRecords = async () => {
            try{
                const res = await axios.get("http://localhost:5000/api/v1/document/getAll", {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token' : token,
                      },
                })
                setFiles(res.data.data);

            } catch {
                setFiles([]);
                console.error("Error");
            }
        }
        fetchRecords();
    }, []);


    return (
        <div x-data class="flex">
        {/* <!-- Mobile Menu Toggle --> */}
        <button class="sm:hidden absolute top-5 right-5 focus:outline-none z-10">
            {/* <!-- Menu Icons --> */}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>

            {/* <!-- Close Menu --> */}
            <svg  class="h-6 w-6"
                fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <Sidebar />

        {/* <!-- Main UI Dashboard --> */}
        <div class="w-full bg-bookmark-white h-full">
            {/* <!-- Header Section having full width --> */}
            <header class="py-2 bg-white sticky top-0">
                <div class="mr-12 flex justify-end gap-8 items-center">
                    <span class="fas fa-search text-2xl"></span>
                    <span class="fas fa-file-circle-plus text-2xl"></span>
                    <span class="fas fa-bell text-2xl"></span>
                    <div class="flex items-center gap-2">
                        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=40"
                            class="rounded-full" />
                        <h1 class="font-medium hidden sm:block">Alex Hunter</h1>
                    </div>
                </div>
            </header>

            {/* <!-- Container Section limited width --> */}
            <section class="container">
                {/* <!-- Welcome Message --> */}
                <div class="bg-gradient-to-l from-regal-blue mt-2 md:mt-4 lg:mt-4 px-8 py-2 rounded-lg">
                    <h1 class="font-bold text-2xl">Good Evening, Alex Hunter <span class="fas fa-hands"></span></h1>
                    <p class="text-gray-600 text-sm">Here is whats happening with your appointments today</p>
                </div>

                {/* <!-- Content --> */}
                <section class="mt-2 md:mt-4 lg:mt-8">

                    {/* <!-- Cards --> */}
                    <div class="sm:grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-16 px-8 hidden">
                        {/* <!-- Card 1 --> */}
                        <div class="flex border-2 border-l-8 border-orange-400 items-center p-2 justify-center gap-6 rounded-lg bg-white">
                            <span
                                class="fas fa-vial-virus text-2xl border-2 rounded-full p-4 border-orange-300 text-gray-900"></span>
                            <div class="text-center text-gray-800 border-l-4 border-orange-300 pl-4">
                                <h3 class="text-xs">Lab Reports</h3>
                                <h2 class="text-2xl font-bold">440</h2>
                                <h3 class="text-xs"><span class="fas fa-arrow-trend-up text-green-900"> 0.4</span> Since
                                    last month</h3>
                            </div>
                        </div>
                        {/* <!-- Card 2 --> */}
                        <div
                            class="flex border-2 border-l-8 border-sky-900 items-center p-2 justify-center gap-6 rounded-lg bg-white">
                            <span
                                class="fas fa-prescription text-2xl border-2 rounded-full p-4 border-sky-800 text-gray-900"></span>
                            <div class="text-center text-gray-800 border-l-4 border-sky-800 pl-4">
                                <h3 class="text-xs">Doctors Prescription</h3>
                                <h2 class="text-2xl font-bold">50</h2>
                                <h3 class="text-xs"><span class="fas fa-arrow-trend-up text-green-900"> 8</span> Since
                                    last month</h3>
                            </div>
                        </div>

                        {/* <!-- Card 3 --> */}
                        <div
                            class="flex border-2 border-l-8 border-yellow-400 items-center p-2 justify-center gap-6 rounded-lg bg-white">
                            <span
                                class="fas fa-pills text-2xl border-2 rounded-full p-4 border-yellow-300 text-gray-900"></span>
                            <div class="text-center text-gray-800 border-l-4 border-yellow-300 pl-4">
                                <h3 class="text-xs">Medicine Listings</h3>
                                <h2 class="text-2xl font-bold">130</h2>
                                <h3 class="text-xs"><span class="fas fa-arrow-trend-down text-red-900"> 12</span> Since
                                    last month</h3>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Recent Files --> */}
                    <div class="mt-8 border-teal-900 hidden sm:block">
                        {/* <!-- Heading --> */}
                        <div class="border-b-2 border-teal-900 flex justify-between items-center px-2 py-1 mx-2">
                            <div class="mx-2 sm:mx-4">
                                <h2 class="text-xl font-bold">Recent Files</h2>
                            </div>
                        </div>

                        {/* <!-- Files  --> */}
                        <div class="hidden sm:flex gap-8 mx-8 mt-4 bg-white p-2 rounded-md">
                            {/* <!-- Card 1 --> */}
                            <div class="flex border-2 items-center px-2 justify-center rounded-lg">
                                <span
                                    class="fas fa-file-archive text-4xl border-orange-300 text-gray-900"></span>
                                <div class="text-gray-800 pl-4">
                                    <h2 class="text-xl font-bold">File Name #1</h2>
                                    <h3 class="text-xs">25.6Kb</h3>
                                </div>
                            </div>
                            {/* <!-- Card 2 --> */}
                            <div class="flex border-2 items-center px-2 justify-center rounded-lg">
                                <span
                                    class="fas fa-file-archive text-4xl border-orange-300 text-gray-900"></span>
                                <div class="text-gray-800 pl-4">
                                    <h2 class="text-xl font-bold">File Name #1</h2>
                                    <h3 class="text-xs">25.6Kb</h3>
                                </div>
                            </div>
                            {/* <!-- Card 3 --> */}
                            <div class="flex border-2 items-center px-2 justify-center rounded-lg">
                                <span
                                    class="fas fa-file-archive text-4xl border-orange-300 text-gray-900"></span>
                                <div class="text-gray-800 pl-4">
                                    <h2 class="text-xl font-bold">File Name #1</h2>
                                    <h3 class="text-xs">25.6Kb</h3>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <!-- Uploaded Documents --> */}
                    <div class="mt-8 border-teal-900">
                        {/* <!-- Heading --> */}
                        <div class="border-b-2 border-teal-900 flex justify-between items-center px-2 py-1 mx-2">
                            <div class="mx-2 sm:mx-4">
                                <h2 class="text-xl font-bold">Uploaded Files</h2>
                            </div>
                        </div>

                        {/* <!-- Records --> */}
                        <div class="flex items-center flex-column flex-wrap mt-8 gap-16 mb-4 bg-white rounded-md px-4 py-4 mx-8">
                            {/* <!-- Record #1 --> */}
                            {files.forEach((file) => {
                                console.log(file.name);
                                <Record filename={file.name} size={file.size} type={file.type} />
                            })}
                            {/* Records uploaded by user */}
                            <Record filename="index.js" size="25.kb" type="pdf" />
                            </div>
                        </div>

                </section>
            </section>
        </div>
        </div>
    )
}

export default UserDashboard;