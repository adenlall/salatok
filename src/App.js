import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import NextSalat from './components/Section1/NextSalat';
import SlideDiv from './components/Section1/SideDiv';
import Sec2 from './components/qoran/sec2';
import Calendar from './components/calendar/Calendar';
import MPro from './components/tips/month';
import Support from './components/secLast/support';



function App() {



  const [ss, setSS] = useState(0);
  const [cc, setCC] = useState(0);
  const [tat, setTat] = useState(false);
  const [err, setErr] = useState(false);

 

  useEffect(() => {
    document.title = "Home - Salatok.App - Muslim Day Manager";
  }, []);
  //creating function to load ip address from the API
  const getData = async () => {
    await Axios.get('https://api.ipify.org?format=json').then(res => {
      // console.log(res.data);
      Axios.post(`https://iptwist.com`, { ip: `${res.data.ip}`}, {
        headers: {
          'Content-Type': 'application/json',
          'X-IPTWIST-TOKEN': 'FTXdxEfcL0Bq1XS1MVVAw8G0h2CSRBqARS43CDDeBjhMS1FWPoHWzoy6g6Qrkbd6'
        },
      }).then(res => {
        setSS(res.data.city)
        setCC(res.data.country)
        // config
        setErr(false);
        setTat(true);
        // console.log(res.data, err, tat);
      }).catch(erro => {
        console.log(erro)
        // config
        setErr(true);
        setTat(true);
      })
      
    }).catch(error => { console.log('App.js : ' + error); setErr(true); setTat(true); })

  }

  useEffect(() => {
    //passing getData method to the lifecycle method

    getData()

  }, [tat])

  if (err === false && tat === true) {


    return (
      <>
        <div className='w-full flex lg:flex-row flex-col items-stretch justify-center content-center space-y-4 space-x-0 lg:space-y-0 lg:space-x-4 p-4'>
          <NextSalat cc={cc} ss={ss} />
          <SlideDiv />
        </div>
        <div className='w-full flex lg:flex-row flex-col items-stretch justify-center content-center space-y-4 space-x-0 lg:space-y-0 lg:space-x-4 p-4'>
          <Sec2 />
        </div>
        <div className='w-full flex lg:flex-row flex-col items-stretch justify-center content-center space-y-4 space-x-0 lg:space-y-0 lg:space-x-4 p-4'>
          {/* <Holiday/> */}
        </div>
        <div className='w-full flex lg:flex-row flex-col items-stretch justify-center content-center space-y-4 space-x-0 lg:space-y-0 lg:space-x-4 p-4'>
          <MPro />
        </div>
        <div className='w-full flex lg:flex-row flex-col items-stretch justify-center content-center space-y-4 space-x-0 lg:space-y-0 lg:space-x-4 p-4'>
          <Calendar />
        </div>
        <div className='w-full flex lg:flex-row mt-20 flex-col items-stretch justify-center content-center space-y-4 space-x-0 lg:space-y-0 lg:space-x-4 p-4'>
          <Support />
        </div>

      </>
    );
  }if (err === false && tat === false) {
    return (
      <>
        <div className='bg-gradient-to-tr from-teal-500  to-cyan-500 w-screen h-screen m-0 p-2 flex flex-col items-center content-center justify-center'>
          <p className='text-4xl text-white font-extrabold'>loading ...</p>
        </div>
      </>
    )

  }else {
    return (
      <>
        <div className='bg-gradient-to-tr from-red-400  to-red-500 w-screen h-screen m-0 p-2 flex flex-col space-y-4 items-center content-center justify-center'>
          <p className='text-4xl text-black font-extrabold'>A Fatal Error, Your Adblock or Browser block website to locate your position</p>
          <p className='text-xl text-black font-bold'>Please Disable ypur Adblocker or change the browser. report a bug on <button className='btn btn-sm'>GitHub</button></p>
        </div>
      </>
    )

  }

};

export default App