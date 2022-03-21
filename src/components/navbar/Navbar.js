import { NavLink } from 'react-router-dom'
import React, { useEffect, useState } from "react";


function Navbar() {



    const [count, setCount] = useState(0);
    const [title, setTitle] = useState('displayed');


    function hundelNavbar() { setCount(count + 1) }

    useEffect(() => {

        if (title === 'displayed') {
            setTitle('hidden')
            document.querySelector('.xnav').style.display = 'none';
            document.querySelector('body').style.overflow = 'auto';
        } else {
            setTitle('displayed')
            document.querySelector('.xnav').style.display = 'flex';
            document.querySelector('body').style.overflow = 'hidden';
        }

    }, [count])



    return (
        <>
            <div className="xnav  hidden fixed top-0 pt-20 h-screen flex-col justify-between items-center sppace-y-4 w-full m-2 rounded-lg bg-slate-900" style={{ zIndex: '99999' }} >
                <ul className="flex w-full flex-col mx-2 items-stretch space-y-4 text-lg list-style-none z-50">
                    <NavLink onClick={hundelNavbar} to="/" className=" px-4 py-3 mr-8 ml-2 hover:bg-slate-700 bg-slate-800 rounded-lg text-2xl font-extrabold ">
                        Home
                    </NavLink>
                    <NavLink onClick={hundelNavbar} to="/ChangeLog" className=" px-4 py-3 mr-8 ml-2 hover:bg-slate-700 bg-slate-800 rounded-lg text-2xl font-extrabold ">
                        Change Log
                    </NavLink>
                    <NavLink onClick={hundelNavbar} to="/About" className=" px-4 py-3 mr-8 ml-2 hover:bg-slate-700 bg-slate-800 rounded-lg text-2xl font-extrabold">
                        About
                    </NavLink>
                    <a href="https://www.github.com/adenlall/salatok" className=" px-4 py-3 mr-8 ml-2 hover:bg-slate-700 bg-slate-800 rounded-lg text-2xl font-extrabold">
                        Github
                    </a>
                </ul>
                <div className='mx-4 mb-6 flex items-center sppace-x-4'>
                    <svg className='w-16 h-16 rounded-sm' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 792 792" style={{ enableBackground: 'new 0 0 792 792' }} >
                        <circle id="XMLID_1_" style={{ fill: '#1b2536' }} cx="396" cy="396" r="346.5" />
                        <g id="XMLID_4_">
                            <g id="XMLID_29_">
                                <path id="XMLID_33_" style={{ fill: '#1FC5ED' }} d="M202.5,244.9c19.5,19.5,38.9,38.9,58.4,58.4c30.9,30.9,61.7,61.7,92.6,92.6 c7.1,7.1,14.2,14.2,21.3,21.3c11.1,11.1,31.5,11.9,42.4,0c11-12,11.9-30.6,0-42.4c-19.5-19.5-38.9-38.9-58.4-58.4 c-30.9-30.9-61.7-61.7-92.6-92.6c-7.1-7.1-14.2-14.2-21.3-21.3c-11.1-11.1-31.5-11.9-42.4,0C191.5,214.4,190.6,233,202.5,244.9 L202.5,244.9z" />
                            </g>
                        </g>
                        <g id="XMLID_5_">
                            <g id="XMLID_23_">
                                <path id="XMLID_27_" style={{ fill: '#1FC5ED' }} d="M704,384c-32.7,0-65.4,0-98.2,0c-51.9,0-103.9,0-155.8,0c-11.9,0-23.8,0-35.8,0 c-15.4,0-15.5,24,0,24c32.7,0,65.4,0,98.2,0c51.9,0,103.9,0,155.8,0c11.9,0,23.8,0,35.8,0C719.5,408,719.5,384,704,384L704,384z" />
                            </g>
                        </g>
                        <g id="XMLID_3_">
                            <g id="XMLID_17_">
                                <path id="XMLID_21_" style={{ fill: '#1FC5ED' }} d="M244.9,589.5c19.5-19.5,38.9-38.9,58.4-58.4c30.9-30.9,61.7-61.7,92.6-92.6 c7.1-7.1,14.2-14.2,21.3-21.3c11.1-11.1,11.9-31.5,0-42.4c-12-11-30.6-11.9-42.4,0c-19.5,19.5-38.9,38.9-58.4,58.4 c-30.9,30.9-61.7,61.7-92.6,92.6c-7.1,7.1-14.2,14.2-21.3,21.3c-11.1,11.1-11.9,31.5,0,42.4C214.4,600.5,233,601.4,244.9,589.5 L244.9,589.5z" />
                            </g>
                        </g>
                    </svg>

                    <h1 className='text-lg font-bold'>Salatok App - Your daily guide</h1>
                </div>
            </div>
            <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
                <div className="container-fluid w-full flex flex-nowrap items-center justify-between px-6">
                    <button
                        className="navbar-toggler lg:hidden block text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline pr-4"
                        type="button"
                        style={{ zIndex: '99999' }}
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent1"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={hundelNavbar}
                    >
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="bars"
                            className="w-6"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill="currentColor"
                                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                            />
                        </svg>
                    </button>
                    <div
                        className="flex flex-row items-center justify-between w-full flex-grow"
                        id="navbarSupportedContent1"
                    >
                        <div className='flex items-center space-x-2'>

                            <svg className='w-10 h-10 rounded-sm' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 792 792" style={{ enableBackground: 'new 0 0 792 792' }} >
                                <circle id="XMLID_1_" style={{ fill: '#1b2536' }} cx="396" cy="396" r="346.5" />
                                <g id="XMLID_4_">
                                    <g id="XMLID_29_">
                                        <path id="XMLID_33_" style={{ fill: '#1FC5ED' }} d="M202.5,244.9c19.5,19.5,38.9,38.9,58.4,58.4c30.9,30.9,61.7,61.7,92.6,92.6 c7.1,7.1,14.2,14.2,21.3,21.3c11.1,11.1,31.5,11.9,42.4,0c11-12,11.9-30.6,0-42.4c-19.5-19.5-38.9-38.9-58.4-58.4 c-30.9-30.9-61.7-61.7-92.6-92.6c-7.1-7.1-14.2-14.2-21.3-21.3c-11.1-11.1-31.5-11.9-42.4,0C191.5,214.4,190.6,233,202.5,244.9 L202.5,244.9z" />
                                    </g>
                                </g>
                                <g id="XMLID_5_">
                                    <g id="XMLID_23_">
                                        <path id="XMLID_27_" style={{ fill: '#1FC5ED' }} d="M704,384c-32.7,0-65.4,0-98.2,0c-51.9,0-103.9,0-155.8,0c-11.9,0-23.8,0-35.8,0 c-15.4,0-15.5,24,0,24c32.7,0,65.4,0,98.2,0c51.9,0,103.9,0,155.8,0c11.9,0,23.8,0,35.8,0C719.5,408,719.5,384,704,384L704,384z" />
                                    </g>
                                </g>
                                <g id="XMLID_3_">
                                    <g id="XMLID_17_">
                                        <path id="XMLID_21_" style={{ fill: '#1FC5ED' }} d="M244.9,589.5c19.5-19.5,38.9-38.9,58.4-58.4c30.9-30.9,61.7-61.7,92.6-92.6 c7.1-7.1,14.2-14.2,21.3-21.3c11.1-11.1,11.9-31.5,0-42.4c-12-11-30.6-11.9-42.4,0c-19.5,19.5-38.9,38.9-58.4,58.4 c-30.9,30.9-61.7,61.7-92.6,92.6c-7.1,7.1-14.2,14.2-21.3,21.3c-11.1,11.1-11.9,31.5,0,42.4C214.4,600.5,233,601.4,244.9,589.5 L244.9,589.5z" />
                                    </g>
                                </g>
                            </svg>

                            <NavLink to="/" className="text-xl text-white pr-2 font-semibold" >
                                SALATOK
                            </NavLink>
                        </div>
                        {/* Left links */}
                        <ul className="space-x-2 hidden lg:flex flex-row pl-4 list-style-none">
                            <NavLink to="/" className="hover:bg-gray-800 rounded-lg py-1 px-2">
                                Home
                            </NavLink>
                            <NavLink to="/ChangeLog" className="hover:bg-gray-800 rounded-lg py-1 px-2">
                                ChangLog
                            </NavLink>
                            <NavLink to="/About" className="hover:bg-gray-800 rounded-lg py-1 px-2">
                                About
                            </NavLink>
                            <a className="hover:bg-gray-800 rounded-lg py-1 px-2" href="https://www.github.com/adenlall/salatok">
                                Github
                            </a>
                        </ul>

                    </div>

                </div>
            </nav>
        </>
    );

}

export default Navbar;