import React, { useState, useEffect } from 'react';
import moment from 'moment'
// 34b3bb78ea5ec819943e436035fdd591ff458422

function Clock() { // TODO:         line 73....

    const [hAngle, sethAngle] = useState((new Date().getHours() % 12 / 12) * 360);
    const [mAngle, setmAngle] = useState((new Date().getMinutes() / 60) * 360);
    const [sAngle, setsAngle] = useState((new Date().getSeconds() / 60) * 360);

    const slt = JSON.parse(localStorage.getItem("salatsday"));

    const [Hdiff, setHDiff] = useState(0);
    const [Mdiff, setMDiff] = useState(0);
    const [nextis, setNextis] = useState('...');

    const logTime = () => {


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
        setsAngle(angS)

    }


    const calC = () => {
        // console.log('hello')
        
        const sltAr = ['fajr', 'shurooq', 'dhuhr', 'asr', 'maghrib', 'isha']

        for (let i = 0; i < sltAr.length; i++) {
            const ss = slt.items[0]; 
            const nSl = ss[sltAr[i]];
            // console.log("slt", nSl)

            let Hdiff = moment(nSl, 'h:mm A').format('HH') - moment().format('HH');
            let Mdiff = moment(nSl, 'h:mm A').format('mm') - moment().format('mm');

            // console.log("Hdiff, Mdiff")
            // console.log(Hdiff, Mdiff)

            if (moment(nSl, 'h:mm A').format('HHmm') > moment().format('HHmm')) {
                // console.log('if')
                if (Mdiff < 0) {
                    Hdiff = Hdiff - 1;
                    Mdiff = 60 - Math.abs(Mdiff);
                }
                setHDiff(Hdiff);
                setMDiff(Mdiff);
                setNextis(sltAr[i]);
                // console.log(Hdiff, Mdiff, sltAr[i])

                break;
            } else {
                // console.log('else')
                Hdiff = moment(slt[sltAr[0]], 'h:mm A').format('HH') - moment().format('HH');
                Mdiff = moment(slt[sltAr[0]], 'h:mm A').format('mm') - moment().format('mm');

                if (Mdiff < 0) {
                    Hdiff = Hdiff - 1;
                    Mdiff = 60 - Math.abs(Mdiff);
                }
                Hdiff = 24 - parseInt(moment().format('HH')) + (parseInt(moment(slt[sltAr[0]], 'h:mm A').add(1, 'hours').format('HH'))); // TODO: fix this
                setHDiff(Hdiff);
                setMDiff(Mdiff);
                setNextis(sltAr[0]);
                // console.log(Hdiff, Mdiff, sltAr[i])
// 
            }

        }
    }


    useEffect(() => {
        calC()
    }, []);


    useEffect(() => {


        let timerID = setInterval(() => {
            logTime();

        }, 1000)

        return () => {
            clearInterval(timerID)
        }


    })


    const MINUTE_MS = 60000;

    useEffect(() => {

        const interval = setInterval(() => {
            
            calC()
            // console.log('here I am')

        }, MINUTE_MS);

        return () => clearInterval(interval);
    }, [])

    return (
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
                <h2 className="font-bold text-[1.4em]">Next Salat is : <span className="font-extrabold text-[2em]"> {nextis}</span></h2>
                <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ '--value': Hdiff }}></span>
                        </span> hours
                    </div>
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ '--value': Mdiff }}></span>
                        </span> min
                    </div>
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ '--value': 60 - new Date().getSeconds() }}></span>
                        </span> sec
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Clock;
