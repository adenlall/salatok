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
    // const ['Monday', '']


    useEffect(() => {
        if (localStorage.getItem('timeOut') < moment().format('YYYYMMDD')) {
            var day = moment().format('YYYYMMDD');
            let item = moment(day - 1, 'YYYYMMDD').format('DD-MM-YYYY')
            localStorage.removeItem(item);
            localStorage.setItem('timeOut', day);
        }



        const date = moment().format('D-M-Y');

        fetch(`https://api.aladhan.com/v1/gToH?date${date}`)
            .then(response => response.json())
            .then(json => {
                // console.log(json)

                setD(json.data.hijri.date);
                setDy(json.data.hijri);
                setDd(json.data.hijri.weekday.en);
                setDm(json.data.hijri.month.en);
                for (let i = 0; i < document.querySelectorAll('.zitems').length; i++) {
                    convert(moment(moment().add(i, 'days').calendar('MM-DD-YYYY'), 'MM-DD-YYYY').format('DD-MM-YYYY'), i, 'en')
                }

            }).finally(() => {
                setLoad(false);
            })
    }, [load]);


    function convert(lldate, nuum, lan) {
        if (localStorage.getItem(lldate) === null) {
            fetch(`https://api.aladhan.com/v1/gToH?date=${lldate}`)
                .then(response => response.json())
                .then(json => {
                    document.querySelectorAll('.zitems')[nuum].innerHTML = json.data.hijri.day + " " + json.data['hijri']['month'][`${lan}`];
                    (lan === 'ar') ? document.querySelectorAll('.days')[nuum].innerHTML = json.data['hijri']['weekday'][`${lan}`] : document.querySelectorAll('.days')[nuum].innerHTML = moment(lldate, 'DD-MM-YYYY').format('dddd')
                    // json.data.hijri 
                    localStorage.setItem(lldate, JSON.stringify(json.data.hijri));
                }).finally(() => {
                    setLoad(false);
                })
        } else {
            var time = moment().format('YYYYMMDD')
            if (localStorage.getItem('timeOut') === null) {
                localStorage.setItem('timeOut', time)
            } else {
                console.log('storage')
                var datta = JSON.parse(localStorage.getItem(lldate))
                document.querySelectorAll('.zitems')[nuum].innerHTML = datta.day + " " + datta['month'][`${lan}`];
                (lan === 'ar') ? document.querySelectorAll('.days')[nuum].innerHTML = datta['weekday'][`${lan}`] : document.querySelectorAll('.days')[nuum].innerHTML = moment(lldate, 'DD-MM-YYYY').format('dddd');
            }
        }
    }

    function dataMou(data) {
        fetch(`https://api.aladhan.com/v1/gToH?date=${data}`)
            .then(responses => responses.json())
            .then(data => {
                document.querySelector('.xleld').innerHTML = 29 - data.data.hijri.day + ' days';
            }).finally(() => {
                setLoad(false);
            })
    }
    const togg = () => {
        if (document.querySelector('#togg').checked === false) {
            setDd(moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY').format('dddd'))
            setDm(Dy.month.en);

            for (let i = 0; i < document.querySelectorAll('.weekc').length; i++) {
                convert(moment(moment().add(i, 'days').calendar('MM-DD-YYYY'), 'MM-DD-YYYY').format('DD-MM-YYYY'), i, 'en')
            }

            document.querySelector('.nmak1').innerHTML = "To day end";
            document.querySelector('.nmak2').innerHTML = "To week end";
            document.querySelector('.nmak3').innerHTML = "To month end";

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
            <div className="w-full shadow-xl flex flex-col h-[12em] space-y-6 items-center justify-center p-4 rounded-lg bg-slate-100 dark:bg-gray-800 dark:text-slate-100 text-gray-800">
                <div class="loader">
                    <div class="outer"></div>
                    <div class="middle"></div>
                    <div class="inner"></div>
                </div>
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
                                <h1 className="w-full space-x-2 flex justify-between"><span className="px-1 min-w-fit rounded-sm text-slate-100 bg-gray-700">{moment().endOf('day').fromNow('D')}</span><p className="   nmak1 w-full">To day end</p></h1>
                                <h1 className="w-full space-x-2 flex justify-between"><span className="px-1 min-w-fit rounded-sm text-slate-100 bg-gray-700">{moment().endOf('week').fromNow('D')}</span><p className="  nmak2 w-full">To week end </p></h1>
                                <h1 className="w-full space-x-2 flex justify-between"><span className="px-1 min-w-fit rounded-sm text-slate-100 bg-gray-700 xleld">{dataMou(moment().format('DD-MM-YYYY'))}</span><p className=" nmak3 w-full">To month end</p></h1>
                            </div>
                        </div>
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <span class="label-text mr-2">To <strong>Arabic</strong></span>
                                <input type="checkbox" id='togg' onChange={() => { togg() }} class="toggle toggle-accent" />
                            </label>
                        </div>
                    </div>
                    <div className="flex lg:flex-row space-y-4 lg:space-x-4 space-x-0  lg:space-y-0 flex-col w-full items-center content-center">
                        <div className='flex space-x-4 w-full items-center content-center'>
                            <div className="weekc w-full h-28 flex flex-col items-center content-center justify-center rounded-lg bg-gradient-to-tr from-teal-500  to-cyan-500"><h4 className="zitems text-slate-100 font-extrabold text-xl">:</h4><p className='days'></p></div>
                            <div className="weekc w-full h-28 flex flex-col items-center content-center justify-center rounded-lg bg-gradient-to-tr from-gray-600  to-gray-700"><h4 className="zitems text-slate-100 font-extrabold text-xl">:</h4><p className='days'></p></div>
                            <div className="weekc w-full h-28 flex flex-col items-center content-center justify-center rounded-lg bg-gradient-to-tr from-gray-600  to-gray-700"><h4 className="zitems text-slate-100 font-extrabold text-xl">:</h4><p className='days'></p></div>
                        </div>
                        <div className='flex space-x-4 w-full items-center content-center'>
                            <div className="weekc w-full h-28 flex flex-col items-center content-center justify-center rounded-lg bg-gradient-to-tr from-gray-600  to-gray-700"><h4 className="zitems text-slate-100 font-extrabold text-xl">:</h4><p className='days'></p></div>
                            <div className="weekc w-full h-28 flex flex-col items-center content-center justify-center rounded-lg bg-gradient-to-tr from-gray-600  to-gray-700"><h4 className="zitems text-slate-100 font-extrabold text-xl">:</h4><p className='days'></p></div>
                            <div className="weekc w-full h-28 flex flex-col items-center content-center justify-center rounded-lg bg-gradient-to-tr from-gray-600  to-gray-700"><h4 className="zitems text-slate-100 font-extrabold text-xl">:</h4><p className='days'></p></div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Calendar;
