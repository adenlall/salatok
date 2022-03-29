import React, { useState, useEffect } from 'react';
import moment from 'moment'
import Axios from 'axios';

function Calendar() {


    const [Dy, setDy] = useState(0);
    const [Dyy, setDyy] = useState(0);
    const [Dm, setDm] = useState(0);
    const [Dd, setDd] = useState(0);
    const [D, setD] = useState(0);
    const [load, setLoad] = useState(true);

/* 
    const fftch = async () => {

        document.querySelectorAll('.zitems')[0].innerHTML = convert(moment(moment().add(0, 'days').calendar('MM-DD-YYYY'), 'MM-DD-YYYY').format('DD-MM-YYYY'), 0, 'en')
        document.querySelectorAll('.zitems')[1].innerHTML = convert(moment(moment().add(1, 'days').calendar('MM-DD-YYYY'), 'MM-DD-YYYY').format('DD-MM-YYYY'), 1, 'en')
        document.querySelectorAll('.zitems')[2].innerHTML = convert(moment(moment().add(2, 'days').calendar('MM-DD-YYYY'), 'MM-DD-YYYY').format('DD-MM-YYYY'), 2, 'en')
        document.querySelectorAll('.zitems')[3].innerHTML = convert(moment(moment().add(3, 'days').calendar('MM-DD-YYYY'), 'MM-DD-YYYY').format('DD-MM-YYYY'), 3, 'en')
        document.querySelectorAll('.zitems')[4].innerHTML = convert(moment(moment().add(4, 'days').calendar('MM-DD-YYYY'), 'MM-DD-YYYY').format('DD-MM-YYYY'), 4, 'en')
        document.querySelectorAll('.zitems')[5].innerHTML = convert(moment(moment().add(5, 'days').calendar('MM-DD-YYYY'), 'MM-DD-YYYY').format('DD-MM-YYYY'), 5, 'en')

    } */

    useEffect(() => {
        const date = moment().format('D-M-Y');

        fetch(`http://api.aladhan.com/v1/gToH?date${date}`)
            .then(response => response.json())
            .then(json => {
                // console.log(json)

                setD(json.data.hijri.date);
                setDy(json.data.hijri);
                setDd(json.data.hijri.weekday.en);
                setDm(json.data.hijri.month.en);

            }).finally(() => {
                setLoad(false);
            })

            for (let i = 0; i < document.querySelectorAll('.zitems').length; i++) {
                
                document.querySelectorAll('.zitems')[i].innerHTML = convert(moment(moment().add(i, 'days').calendar('MM-DD-YYYY'), 'MM-DD-YYYY').format('DD-MM-YYYY'), i, 'en')
            }


    }, [load]);
    function convert(lldate, nuum, lan) {
        fetch(`http://api.aladhan.com/v1/gToH?date=${lldate}`)
            .then(response => response.json())
            .then(json => {
                document.querySelectorAll('.weekc')[nuum].innerHTML = json.data.hijri.day + " " + json.data['hijri']['month'][`${lan}`];
                // console.log(lldate, json.data.hijri.day,`http://api.aladhan.com/v1/gToH?date=${lldate}`)
                // console.log(' dATE : '+moment(moment().add(3, 'days').calendar('MM-DD-YYYY'),'MM-DD-YYYY').format('DD-MM-YYYY'))
            }).finally(() => {
                setLoad(false);
            })
    }

    const togg = () => {
        if (document.querySelector('#togg').checked === false) {
            setDd(Dy.weekday.en);
            setDm(Dy.month.en);

            for (let i = 0; i < document.querySelectorAll('.weekc').length; i++) {
                convert(moment(moment().add(i, 'days').calendar('MM-DD-YYYY'), 'MM-DD-YYYY').format('DD-MM-YYYY'), i, 'en')
            }

            document.querySelector('.nmak1').innerHTML = "To day done";
            document.querySelector('.nmak2').innerHTML = "To week done";
            document.querySelector('.nmak3').innerHTML = "To month done";

        } else {
            setDd(Dy.weekday.ar);
            setDm(Dy.month.ar);

            for (let i = 0; i < document.querySelectorAll('.weekc').length; i++) {
                convert(moment(moment().add(i, 'days').calendar('MM-DD-YYYY'), 'MM-DD-YYYY').format('DD-MM-YYYY'), i, 'ar')

            }
            document.querySelector('.nmak1').innerHTML = "قبل انتهاء اليوم";
            document.querySelector('.nmak2').innerHTML = "قبل انتهاء الاسبوع";
            document.querySelector('.nmak3').innerHTML = "قبل انتهاء الشهر";

        }
    }





    if (load === true) {
        return (
            <div className="w-full shadow-xl flex flex-col space-y-6 items-center p-4 rounded-lg bg-slate-100 dark:bg-gray-800 dark:text-slate-100 text-gray-800">
                <div className='text-2xl font-bold'>Loading...</div>
            </div>
        )
    } else {


        return (
            <>
                <div className="w-full shadow-xl flex flex-col space-y-6 items-center p-4 rounded-lg bg-slate-100 dark:bg-gray-800 dark:text-slate-100 text-gray-800">
                    <div className="w-full flex flex-col lg:space-y-0 space-y-2 lg:flex-row items-start justify-between space-x-4">
                        <div className='w-full flex flex-col lg:space-y-0 space-y-2 lg:flex-row items-start space-x-4'>
                            <div className='min-w-fit p-0'>
                                <div className='flex flex-row w-full space-x-2'><h1 className="font-bold text-3xl">{Dd} - </h1><h1 className="font-bold text-3xl">{Dm}</h1></div>
                                <p>{D}</p>
                            </div>
                            <div className="flex w-full justify-self-stretch items-stretch flex-col space-y-2 ">
                                <h1 className="w-full space-x-2 flex justify-between"><span className="px-1 min-w-fit rounded-sm text-slate-100 bg-gray-700">{moment().endOf('day').fromNow('D')}</span><p className="   nmak1 w-full">To day done</p></h1>
                                <h1 className="w-full space-x-2 flex justify-between"><span className="px-1 min-w-fit rounded-sm text-slate-100 bg-gray-700">{moment().endOf('week').fromNow('D')}</span><p className="  nmak2 w-full">To week done </p></h1>
                                <h1 className="w-full space-x-2 flex justify-between"><span className="px-1 min-w-fit rounded-sm text-slate-100 bg-gray-700">{moment().endOf('month').fromNow('D')}</span><p className=" nmak3 w-full">To month done</p></h1>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text mr-2">To <strong>Arabic</strong></span>
                                <input type="checkbox" id='togg' onChange={() => { togg() }} className="toggle toggle-accent" />
                            </label>
                        </div>
                    </div>
                    <div className="flex lg:flex-row space-y-4 lg:space-x-4 space-x-0  lg:space-y-0 flex-col w-full items-center content-center">
                        <div className='flex space-x-4 w-full items-center content-center'>
                            <div className="weekc w-full h-28 flex items-center content-center justify-center rounded-lg bg-gradient-to-tr from-teal-500  to-cyan-500"><h1 className="zitems text-slate-100 font-extrabold text-xl">:</h1></div>
                            <div className="weekc w-full h-28 flex items-center content-center justify-center rounded-lg bg-gradient-to-tr from-gray-600  to-gray-700"><h1 className="zitems text-slate-100 font-extrabold text-xl">:</h1></div>
                            <div className="weekc w-full h-28 flex items-center content-center justify-center rounded-lg bg-gradient-to-tr from-gray-600  to-gray-700"><h1 className="zitems text-slate-100 font-extrabold text-xl">:</h1></div>
                        </div>
                        <div className='flex space-x-4 w-full items-center content-center'>
                            <div className="weekc w-full h-28 flex items-center content-center justify-center rounded-lg bg-gradient-to-tr from-gray-600  to-gray-700"><h1 className="zitems text-slate-100 font-extrabold text-xl">:</h1></div>
                            <div className="weekc w-full h-28 flex items-center content-center justify-center rounded-lg bg-gradient-to-tr from-gray-600  to-gray-700"><h1 className="zitems text-slate-100 font-extrabold text-xl">:</h1></div>
                            <div className="weekc w-full h-28 flex items-center content-center justify-center rounded-lg bg-gradient-to-tr from-gray-600  to-gray-700"><h1 className="zitems text-slate-100 font-extrabold text-xl">:</h1></div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Calendar;
