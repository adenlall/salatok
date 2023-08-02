import React, { useState, useEffect } from 'react';
import $ from 'jquery'
import moment from 'moment'

import { Helper } from './Helper';


function Clock(props) {


    document.title = `Home - Salatok.App - Muslim Day Manager`;


    const [hAngle, sethAngle] = useState((new Date().getHours() % 12 / 12) * 360);
    const [mAngle, setmAngle] = useState((new Date().getMinutes() / 60) * 360);
    const [sAngle, setsAngle] = useState((new Date().getSeconds() / 60) * 360);

    const [locate, setLocate] = useState(true);

    const [Hdiff, setHDiff] = useState(0);
    const [Mdiff, setMDiff] = useState(0);
    const [nextis, setNextis] = useState(0);
    const [data, setData] = useState(null);
    

    const cc = localStorage.getItem("country")
    const ss = localStorage.getItem("city")


    const calC = () => {
          const sltAr = Helper.sNames();
          const slt = Helper.dDay();
          
          console.log("calC");
          console.log("sltAr", sltAr);
          console.log("slt", slt);
          
        for (let i = 0; i < sltAr.length; i++) {
        console.log("//////////////////////////");
          console.log("i", i);
            const nSl = slt[sltAr[i]];
            let ttime = moment(slt[sltAr[i]], 'HH:mm').format('HH:mm');
			const duration = moment.duration(ttime.diff(moment().format('HH:mm')));
            
          console.log("nSl", i);
          console.log("ttime", ttime);
          console.log("duration", duration);
          console.log("duration - h", duration.hours(),duration.minuts());
            if (duration.hours()>=0 && duration.minuts()>=0) {
            	console.log("iffff: BREAK")
                setHDiff(duration.hours());
                setMDiff(duration.minuts());
                setNextis(sltAr[i]);
        		console.log("//////////////////////////");
                break;
            }
        }
    }



    useEffect(() => {
        setData(Helper.dDay());
    }, []);


    useEffect(() => {
        let timerID = setInterval(() => {
		    const date = new Date();
		    const hourm = date.getHours();
		    const min = date.getMinutes();
		    const sec = date.getSeconds();

		    var hour = hourm % 12; // 12 format

		    var angH = (hour / 12) * 360;
		    var angM = (min / 60) * 360;
		    var angS = (sec / 60) * 360;

		    sethAngle(angH);
		    setmAngle(angM);
		    setsAngle(angS);
		    
        }, 1000)
        return () => {
            clearInterval(timerID)
        }
    }, [])


    useEffect(() => {
        let timerID = setInterval(() => {
            calC()
        }, 60000)
        return () => {
            clearInterval(timerID)
        }
    }, []);


    if (locate === false) {
        return (
            <div className="w-full sm:w-2/3 rounded-lg text-slate-100 ">
                <div className="flex flex-col rounded-lg items-center space-y-4 justify-center content-center w-full h-[24.8em] p-4 overflow-y-scroll " >
                    <div>Plese try to select one of bigest cities in your country and try again.</div>
                </div>
            </div>
        )
    } else {

        return (
            <div className="flex w-full items-center content-center justify-center">

                <div className="flex flex-col items-center content-center justify-center">
                    <div className="flex justify-center py-10 group">
                        <div className="relative z-10 flex flex-col items-center justify-start w-48 h-48 overflow-hidden bg-gray-900 rounded-full ">
                            <div className={"absolute w-1 origin-bottom bg-gradient-to-t from-white to-red-400 rounded-full h-2/5"} style={{ marginTop: '10%', transform: 'rotate(' + mAngle + 'deg)' }} />
                            <div className={"absolute w-1 origin-bottom bg-gradient-to-t from-white to-gray-300 rounded-full h-1/2"} style={{ transform: 'rotate(' + sAngle + 'deg)' }} />

                            <div className={'absolute h-1/2 w-1 origin-bottom rotate-[10deg] flex flex-col justify-end'} style={{ transform: 'rotate(' + hAngle + 'deg)' }} >
                                <div className="w-full rounded-full bg-gradient-to-t from-white to-blue-400 h-2/5" style={{ marginTop: '10%' }} />
                            </div>

                            <div className="absolute flex items-center justify-center flex-1 w-full h-full">
                                <div className="w-1 h-1 bg-white rounded-full" />
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col space-y-2 items-center p-2'>
                        <h2 className="font-bold text-[1.4em]">Next Salat is : <strong className="font-extrabold text-[2em]"> {nextis}</strong></h2>
                        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                <p className="countdown font-mono text-5xl">
                                    <strong style={{ '--value': Hdiff }}></strong>
                                </p> hours
                            </div>
                            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                <p className="countdown font-mono text-5xl">
                                    <strong style={{ '--value': Mdiff }}></strong>
                                </p> min
                            </div>
                            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                <p className="countdown font-mono text-5xl">
                                    <strong style={{ '--value': 60 - new Date().getSeconds() }}></strong>
                                </p> sec
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default Clock;
