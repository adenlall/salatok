import { Routes, Route, NavLink } from 'react-router-dom'
import SalatsDay from "./SalatsDay";
import ChSal from './ChSal';
import Ttst from './Ttst';

function NextSalat(props) {
    // if (useLocation().pathname==="/") { // TODO: Error here
    //     document.getElementById("clos").style.display = "none"; // TODO: Error here
    // }else{
    //     document.getElementById("clos").style.display = "block"; // TODO: Error here

    // }

    return (

        <>


            <div className="lg:w-1/2 w-full shadow-xl flex md:flex-row flex-col  justify-between items-center p-4 rounded-lg bg-slate-100 dark:bg-gray-800 dark:text-slate-100 text-gray-800">
                <SalatsDay cc={props.cc} ss={props.ss} />

                <div className='w-full flex flex-col items-center'>
                    <Routes>
                        <Route index element={<ChSal ss={props.ss} cc={props.cc} />} />
                        <Route path='/salat/fajr' element={<Ttst ss={props.ss} cc={props.cc} ynt="fajr" />} />
                        <Route path='/salat/sunrise' element={<Ttst ss={props.ss} cc={props.cc} ynt="shurooq" />} />
                        <Route path='/salat/dhuhr' element={<Ttst ss={props.ss} cc={props.cc} ynt="dhuhr" />} />
                        <Route path='/salat/asr' element={<Ttst ss={props.ss} cc={props.cc} ynt="asr" />} />
                        <Route path='/salat/maghrib' element={<Ttst ss={props.ss} cc={props.cc} ynt="maghrib" />} />
                        <Route path='/salat/isha' element={<Ttst ss={props.ss} cc={props.cc} ynt="isha" />} />
                    </Routes>
                    <div className="space-x-1 flex items-center justify-center md:absolute bottom-0">
                        <NavLink id='clos' to='/'><button className='btn btn-info w-[14em]'>Clock</button></NavLink>
                        <img className='h-[4em] w-[4em]' src='/favicon-194x194.png' alt='clock img' />
                    </div>
                </div>

            </div>

        </>

    );

}

export default NextSalat;