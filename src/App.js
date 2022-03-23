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

  //creating function to load ip address from the API
  const getData = async () => {
     Axios.get('https://api.ipify.org?format=json').then(res => {
      await Axios.get(`http://api.ipstack.com/${res.data.ip}?access_key=983f89561a8b502b939929964d77c403&format=1`).then(res => {
      setSS(res.data.city)
      setCC(res.data.country_name)
      setTat(true)
      setErr(false)
      })
    }).catch(error => { console.log('App.js : ' + error); setErr(true) })

  }

  useEffect(() => {
    //passing getData method to the lifecycle method

    getData()

  }, [tat])


  
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
  
};

export default App
