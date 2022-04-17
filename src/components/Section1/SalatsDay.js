import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import moment from 'moment'


function SalatsDay() {

    const [locate, setLocate] = useState(false);
    const [stateAPI, setStateAPI] = useState(false);
    const [salatAPI, setSalatAPI] = useState(JSON.parse(localStorage.getItem('salatsday')));
    const ss = localStorage.getItem("city");
    const cc = localStorage.getItem("country");

    const fetchData = () => {
        if (localStorage.getItem('salatsday') === null) {
            $(
                $.getJSON(`https://muslimsalat.com/${cc}/${ss}.json?key=9233c34903ef6aa6fd59a97cedac8226&jsoncallback=?`, function (data) {
                    setSalatAPI(data); setStateAPI(true);
                    localStorage.setItem('salatsday', JSON.stringify(data));
                    if (data.status_code === 0) {
                        setLocate(false)
                        window.alert("We're really sorry, but we dont support your location yet")
                    }else{
                        setLocate(true)
                    }
                }).catch(err => { window.alert("We're really sorry, but we dont support your location yet") })
            )
            if (salatAPI === 0) {
                setLocate(false)
                window.alert("We're really sorry, but we dont support your location yet")
            }
        } else {
            const dataa = JSON.parse(localStorage.getItem('salatsday'))
            setSalatAPI(dataa); setStateAPI(true);
            if (dataa.status_code === 0) {
                setLocate(false)
                window.alert("We're really sorry, but we dont support your location yet")
            }else{
                setLocate(true)
            }
        }


    }

    useEffect(() => {
        fetchData()
    }, [])



   
    if (stateAPI === false && locate === false) {
        return (
            <>
                <div className="w-full sm:w-2/3 rounded-lg text-slate-100 shadow-lg">
                    <div className="flex flex-col rounded-lg items-center space-y-4 justify-center content-center w-full h-[34.8em] p-4 overflow-y-scroll " >
                        <div className="loader">
                            <div className="outer"></div>
                            <div className="middle"></div>
                            <div className="inner"></div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    if (stateAPI === true && locate === true) {

        return (
            <>
                <div className="w-full sm:w-2/3 rounded-lg text-slate-100 shadow-lg" style={{ background: "url('https://tlgur.com/d/GZ3XKdNg') center center / cover" }}>
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
                <a href="/"><button className='btn btn-info'>Try again</button></a>
            </div>
        </div>
        )
    }
}
export default SalatsDay
