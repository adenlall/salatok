import React, { useState, useEffect } from 'react';
import moment from 'moment';

import $ from 'jquery';


function Ttst(props) {

    const [state, setState] = useState(true);
    const [week, setWeek] = useState(0);

    const dDay = JSON.parse(localStorage.getItem("dDay"));

    const ss = localStorage.getItem("city");
    const cc = localStorage.getItem("country");

    document.title = `${props.ynt} Time - Salatok.App - Muslim Day Manager`;

    const newArr = [];
    for (let i = 0; i < week.length; i++) {
        var diff = moment(week[i][props.ynt], 'HHmm').format('mm') - moment(week[0][props.ynt], 'HHmm').format('mm');
        if (moment(week[i][props.ynt], 'HHmm').format('HH') - moment(week[0][props.ynt], 'HHmm').format('HH') !== 0) {
            if (moment(week[i][props.ynt], 'HHmm').format('HH') - moment(week[0][props.ynt], 'HHmm').format('HH') > 0) {
                diff = 60 + diff
            }
            if (moment(week[i][props.ynt], 'HHmm').format('HH') - moment(week[0][props.ynt], 'HHmm').format('HH') < 0) {
                diff = diff - 60
            }
        }
        newArr.push(
            <div className='flex space-x-2 justify-between' key={i} >
                <p className='italic'>{moment(week[i]['date_for']).format('dddd')} {moment(week[i]['date_for']).format("MM-D")} :</p>
                <div className='flex justify-between w-1/3 space-x-2'>
                    <p className='px-2 pt-1 rounded-lg bg-slate-200 dark:bg-gray-700 dark:text-slate-100 text-gray-800' key={i}>{moment(week[i][props.ynt], 'h:mm A').format('HH:mm')}</p>
                    <p className={((diff > 0) ? 'text-green-500' : (diff < 0) ? 'text-red-500' : 'text-gray-400') + ' font-bold w-full'}>{((diff > 0) ? '+' : '')}{diff}<strong className='text-xs'>min</strong></p>
                </div>
            </div>
        )
    }






    if (state === true ) {return 'Loadng ...'}
    if (state === false) {
        return (
            <>
                <div className='flex flex-col space-y-2 p-8 w-full'>
                    <h2 className='text-xl font-bold'>week times of {props.ynt} :</h2>
                    <div className='flex flex-col space-y-3 lg:py-8 py-2 px-2'>{newArr}</div>
                    <h1>done!</h1>
                </div> 
            </>
        );
    }
}

export default Ttst;
