import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import moment from 'moment'


function SalatsDay(props) {

    const [stateAPI, setStateAPI] = useState(false);
    const [salatAPI, setSalatAPI] = useState(0);

    var status;
    if (props.cc === true) {
        status = '/true';
    } else {
        status = '/';
    }

    const response = {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    };


    const fetchData = () => {
        // await Axios.get(`https://muslimsalat.com/${props.cc}/${props.ss}${status}.json?key=9233c34903ef6aa6fd59a97cedac8226&jsoncallback=?`).then(res => {
        //     setSalatAPI(res.data); setStateAPI(true);
        //     // console.log(res.data);
        // }).catch(err => { console.log('SalatDay' + err) })


        if (localStorage.getItem("salatsday") === null) {
            $(
                $.getJSON(`https://muslimsalat.com/${props.cc}/${props.ss}${status}.json?key=9233c34903ef6aa6fd59a97cedac8226&jsoncallback=?`, function (data) {
                    setSalatAPI(data); setStateAPI(true);
                    // console.log(data)
                    localStorage.setItem("salatsday", JSON.stringify(data));

                })
            )
        } else {

            setSalatAPI(JSON.parse(localStorage.getItem("salatsday"))); setStateAPI(true);
            // console.log(JSON.parse(localStorage.getItem("salatsday")))
            var hours = 24; // to clear the localStorage after 1 hour(if someone want to clear after 8hrs simply change hours=8)
            var now = new Date().getTime();
            // console.log('here locale storage')
            if (localStorage.getItem('setupTime') === null) {
                localStorage.setItem('setupTime', now)
            } else {

                if (now - localStorage.getItem('setupTime') > hours * 60 * 60 * 1000) {
                    localStorage.setItem('setupTime', now);

                    $(
                        $.getJSON(`https://muslimsalat.com/${props.cc}/${props.ss}${status}.json?key=9233c34903ef6aa6fd59a97cedac8226&jsoncallback=?`, function (data) {
                            setSalatAPI(data); setStateAPI(true);
                            // console.log(data)
                            localStorage.setItem("salatsday",JSON.stringify(data));
                            // console.log('fetch but locale storage')

                        })
                    )

                }
            }
        }



    }

    useEffect(() => {
        fetchData()
    }, [stateAPI])



    if (stateAPI === false) {
        return (
            <>
                <div className="w-full sm:w-2/3 shadow-xl h-[35em] flex space-y-6 items-center justify-center p-4 rounded-lg ebg-slate-100 dark:bg-gray-700 dark:text-slate-100 text-gray-800">
                    <div className="loader">
                        <div className="outer"></div>
                        <div className="middle"></div>
                        <div className="inner"></div>
                    </div>
                </div>
            </>
        )
    }
    if (stateAPI === true) {

        return (
            <>
                <div className="w-full sm:w-2/3 rounded-lg text-slate-100 shadow-lg" style={{ background: "url('https://tlgur.com/d/GZ3XKdNg') center center / cover" }}>
                    <nav className="flex flex-col rounded-lg items-center space-y-4 justify-center content-center w-full h-full p-4 overflow-y-scroll dark:bg-[linear-gradient(71deg,#000000d9,transparent)] bg-[linear-gradient(71deg,#a6e1ff52,transparent)] " >

                        <NavLink to='/salat/fajr' className="p-2 px-4 w-full rounded-lg space-x-2 dark:bg-[linear-gradient(21deg,#00000061,#ffffff29)] bg-[linear-gradient(21deg,#ffffffa6,#ffffff29)] text-gray-900 dark:text-slate-100" itemScope>
                            <header className="font-bold text-lg" itemProp="salat">Fajr</header>
                            <p className="">{moment(salatAPI.items[0].fajr, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>
                        <NavLink to='/salat/sunrise' className="p-2 px-4 w-full rounded-lg space-x-2 dark:bg-[linear-gradient(21deg,#00000061,#ffffff29)] bg-[linear-gradient(21deg,#ffffffa6,#ffffff29)] text-gray-900 dark:text-slate-100" itemScope>
                            <header className="font-bold text-lg" itemProp="salat">Sunrise</header>
                            <p className="">{moment(salatAPI.items[0].shurooq, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>
                        <NavLink to='/salat/dhuhr' className="p-2 px-4 w-full rounded-lg space-x-2 dark:bg-[linear-gradient(21deg,#00000061,#ffffff29)] bg-[linear-gradient(21deg,#ffffffa6,#ffffff29)] text-gray-900 dark:text-slate-100" itemScope>
                            <header className="font-bold text-lg" itemProp="salat">Dhuhr</header>
                            <p className="">{moment(salatAPI.items[0].dhuhr, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>
                        <NavLink to='/salat/asr' className="p-2 px-4 w-full rounded-lg space-x-2 dark:bg-[linear-gradient(21deg,#00000061,#ffffff29)] bg-[linear-gradient(21deg,#ffffffa6,#ffffff29)] text-gray-900 dark:text-slate-100" itemScope>
                            <header className="font-bold text-lg" itemProp="salat">Asr</header>
                            <p className="">{moment(salatAPI.items[0].asr, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>
                        <NavLink to='/salat/maghrib' className="p-2 px-4 w-full rounded-lg space-x-2 dark:bg-[linear-gradient(21deg,#00000061,#ffffff29)] bg-[linear-gradient(21deg,#ffffffa6,#ffffff29)] text-gray-900 dark:text-slate-100" itemScope>
                            <header className="font-bold text-lg" itemProp="salat">Maghrib</header>
                            <p className="">{moment(salatAPI.items[0].maghrib, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>
                        <NavLink to='/salat/isha' className="p-2 px-4 w-full rounded-lg space-x-2 dark:bg-[linear-gradient(21deg,#00000061,#ffffff29)] bg-[linear-gradient(21deg,#ffffffa6,#ffffff29)] text-gray-900 dark:text-slate-100" itemScope>
                            <header className="font-bold text-lg" itemProp="salat">Isha</header>
                            <p className="">{moment(salatAPI.items[0].isha, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>

                        <p className="text-slate-100">
                            {props.ss + ' - ' + props.cc + ' '}
                            |
                            <span>
                                {'  daylight : ' + salatAPI.daylight}
                            </span>
                        </p>

                    </nav>
                </div>


            </>
        );


    }
}

export default SalatsDay;