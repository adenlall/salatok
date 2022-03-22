import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment'


function SalatsDay(props) {

    const [stateAPI, setStateAPI] = useState(false);
    const [salatAPI, setSalatAPI] = useState(0);

    var status;
    if (props.cc === 'Morocco') {
        status = '/true';
    } else {
        status = '/';
    }


    const fetchData = async () => {

        Axios.get(`http://muslimsalat.com/${props.cc}/${props.ss}${status}.json?key=9233c34903ef6aa6fd59a97cedac8226`).then(res => {
            setSalatAPI(res.data); setStateAPI(true);
            // console.log(res.data);
        }).catch(err => { console.log('SalatDay' + err) })
    }

    useEffect(() => {
        fetchData()
    }, [stateAPI])



    if (stateAPI === false) {
        return (
            <>Opss...</>
        )
    }
    if (stateAPI === true) {

        return (
            <>

                <div className="w-2/3 rounded-lg shadow-lg" style={{ background: "url('https://tlgur.com/d/GZ3XKdNg') center center / cover" }}>
                    <nav className="flex flex-col rounded-lg items-center space-y-4 justify-center content-center w-full h-full p-4 overflow-y-scroll" style={{ background: 'linear-gradient(71deg, #000000d9, transparent)' }} >

                        <NavLink to='/salat/fajr' className="p-2 px-4 w-full rounded-lg space-x-2 " style={{ background: "linear-gradient(21deg,  #00000061, #ffffff29)" }}>
                            <header className="font-bold text-lg">Fajr</header>
                            <p className="">{moment(salatAPI.items[0].fajr, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>
                        <NavLink to='/salat/sunrise' className="p-2 px-4 w-full rounded-lg space-x-2 " style={{ background: "linear-gradient(21deg,  #00000061, #ffffff29)" }}>
                            <header className="font-bold text-lg">Sunrise</header>
                            <p className="">{moment(salatAPI.items[0].shurooq, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>
                        <NavLink to='/salat/dhuhr' className="p-2 px-4 w-full rounded-lg space-x-2 " style={{ background: "linear-gradient(21deg,  #00000061, #ffffff29)" }}>
                            <header className="font-bold text-lg">Dhuhr</header>
                            <p className="">{moment(salatAPI.items[0].dhuhr, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>
                        <NavLink to='/salat/asr' className="p-2 px-4 w-full rounded-lg space-x-2 " style={{ background: "linear-gradient(21deg,  #00000061, #ffffff29)" }}>
                            <header className="font-bold text-lg">Asr</header>
                            <p className="">{moment(salatAPI.items[0].asr, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>
                        <NavLink to='/salat/maghrib' className="p-2 px-4 w-full rounded-lg space-x-2 " style={{ background: "linear-gradient(21deg,  #00000061, #ffffff29)" }}>
                            <header className="font-bold text-lg">Maghrib</header>
                            <p className="">{moment(salatAPI.items[0].maghrib, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>
                        <NavLink to='/salat/isha' className="p-2 px-4 w-full rounded-lg space-x-2 " style={{ background: "linear-gradient(21deg,  #00000061, #ffffff29)" }}>
                            <header className="font-bold text-lg">Isha</header>
                            <p className="">{moment(salatAPI.items[0].isha, 'h:mm A').format('HH:mm')}</p>
                        </NavLink>

                        <p>
                            {props.ss + ' - ' + props.cc+' '}
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