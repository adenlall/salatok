import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import moment from 'moment'

import { Helper    }  from './../../utils/Helper.js';
import SelectByUser from './../AdblockCase/selectByUser';

function SalatsDay() {

     const dDay = JSON.parse(localStorage.getItem("dDay"));
     const Metainfo = Helper.ReadOrWrite("metainfo");
     
     
    if (stateAPI === true && locate === true) {

        return (
            <>
                <div className="w-full sm:w-2/3 rounded-lg text-slate-100 shadow-lg" style={{ background: "url('https://i.ibb.co/RQmwf5f/photo-2023-05-26-22-49-26.jpg') center center / cover" }}>
                    <nav className="flex flex-col rounded-lg items-center space-y-4 justify-center content-center w-full h-full p-4 overflow-y-scroll bg-[linear-gradient(71deg,#ffffffd9,#00f2ff47)] dark:bg-[linear-gradient(71deg,#000000d9,transparent)] " >
                    
                        <NavLink to='/salat/fajr' className="p-2 px-4 w-full rounded-lg space-x-2 bg-[linear-gradient(21deg,#ffffff61,#ffffff29)] dark:bg-[linear-gradient(21deg,#00000061,#ffffff29)] " itemScope>
                            <header className="font-bold text-lg text-black dark:text-white" itemProp="salat">Fajr</header>
                            <p className="text-gray-800 dark:text-white">{moment(salatAPI.items[0].fajr, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>
                        <NavLink to='/salat/sunrise' className="p-2 px-4 w-full rounded-lg space-x-2 bg-[linear-gradient(21deg,#ffffff61,#ffffff29)] dark:bg-[linear-gradient(21deg,#00000061,#ffffff29)] " itemScope>
                            <header className="font-bold text-lg text-black dark:text-white" itemProp="salat">Sunrise</header>
                            <p className="text-gray-800 dark:text-white">{moment(salatAPI.items[0].shurooq, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>
                        <NavLink to='/salat/dhuhr' className="p-2 px-4 w-full rounded-lg space-x-2 bg-[linear-gradient(21deg,#ffffff61,#ffffff29)] dark:bg-[linear-gradient(21deg,#00000061,#ffffff29)] " itemScope>
                            <header className="font-bold text-lg text-black dark:text-white" itemProp="salat">Dhuhr</header>
                            <p className="text-gray-800 dark:text-white">{moment(salatAPI.items[0].dhuhr, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>
                        <NavLink to='/salat/asr' className="p-2 px-4 w-full rounded-lg space-x-2 bg-[linear-gradient(21deg,#ffffff61,#ffffff29)] dark:bg-[linear-gradient(21deg,#00000061,#ffffff29)] " itemScope>
                            <header className="font-bold text-lg text-black dark:text-white" itemProp="salat">Asr</header>
                            <p className="text-gray-800 dark:text-white">{moment(salatAPI.items[0].asr, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>
                        <NavLink to='/salat/maghrib' className="p-2 px-4 w-full rounded-lg space-x-2 bg-[linear-gradient(21deg,#ffffff61,#ffffff29)] dark:bg-[linear-gradient(21deg,#00000061,#ffffff29)] " itemScope>
                            <header className="font-bold text-lg text-black dark:text-white" itemProp="salat">Maghrib</header>
                            <p className="text-gray-800 dark:text-white">{moment(salatAPI.items[0].maghrib, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>
                        <NavLink to='/salat/isha' className="p-2 px-4 w-full rounded-lg space-x-2 bg-[linear-gradient(21deg,#ffffff61,#ffffff29)] dark:bg-[linear-gradient(21deg,#00000061,#ffffff29)] " itemScope>
                            <header className="font-bold text-lg text-black dark:text-white" itemProp="salat">Isha</header>
                            <p className="text-gray-800 dark:text-white">{moment(salatAPI.items[0].isha, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>

                        <p className="dark:text-slate-100 text-gray-800 text-sm">
                            {ss + ' - ' + cc + ' '}
                        </p>

                    </nav>
                </div>


            </>
        );

    } else {
        return(
        <div className="w-full sm:w-2/3 rounded-lg text-slate-100 shadow-lg">
            <div className="flex flex-col rounded-lg items-center space-y-4 justify-center content-center w-full h-[34.8em] p-4 overflow-y-scroll " >
                <div>We're really sorry, but we dont support your location yet</div>
                <SelectByUser />
            </div>
        </div>
        )
    }
}
export default SalatsDay
