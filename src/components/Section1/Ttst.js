import React, { useState, useEffect } from 'react';
import moment from 'moment';
import $ from 'jquery';


function Ttst(props) {



    const [state, setState] = useState(true);
    const [week, setWeek] = useState(0);

    var status;
    if (props.cc === "Morocco") {
        status = '/true/';
    } else {
        status = '/';
    }

    const fetchDatta = () => {

        // await axios.get(`https://muslimsalat.com/${props.cc}/${props.ss}${status}weekly.json?key=9233c34903ef6aa6fd59a97cedac8226&jsoncallback=?`).then(res => {
        //     setWeek(res.data.items); setState(false);
        // }).catch(err => console.log('Ttst' +err))


        $(
            $.getJSON(`https://muslimsalat.com/${props.cc}/${props.ss}${status}weekly.json?key=9233c34903ef6aa6fd59a97cedac8226&jsoncallback=?`, function (data) {
                setWeek(data.items); setState(false);
                // console.log(data)
            })
        )

    }

    useEffect(() => {
        document.title = `${props.ynt} Time - Salatok.App - Muslim Day Manager`;
    }, [])


    useEffect(() => {
        fetchDatta()
    }, [state])


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
            <div className='flex space-x-2 justify-between'>
                <p className='italic'>{moment(week[i]['date_for']).format('dddd')} {moment(week[i]['date_for']).format("MM-D")} :</p>
                <div className='flex justify-between w-1/3 space-x-2'>
                    <p className='px-2 pt-1 rounded-lg bg-slate-200 dark:bg-gray-700 dark:text-slate-100 text-gray-800' key={i}>{moment(week[i][props.ynt], 'h:mm A').format('HH:mm')}</p>
                    <p className={((diff > 0) ? 'text-green-500' : (diff < 0) ? 'text-red-500' : 'text-gray-400') + ' font-bold w-full'}>{((diff > 0) ? '+' : '')}{diff}<span className='text-xs'>min</span></p>
                </div>
            </div>
        )
    }






    if (state === true) {
        return 'Loadng ...'
    } if (state === false) {
        return (
            <>
                <div className='flex flex-col space-y-2 p-8 w-full'>
                    <h2 className='text-xl font-bold'>week times of {props.ynt} :</h2>
                    <div className='flex flex-col space-y-3 py-8 px-2'>{newArr}</div>
                    <h1>done!</h1>
                </div>
            </>
        );
    }
}

export default Ttst;