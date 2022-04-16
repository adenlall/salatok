import { Routes, Route, NavLink } from 'react-router-dom'
import Clock from './Clock';
import SalatsDay from "./SalatsDay";
import Ttst from './Ttst';

function NextSalat() {
    // if (useLocation().pathname==="/") { // TODO: Error here
    //     document.getElementById("clos").style.display = "none"; // TODO: Error here
    // }else{
    //     document.getElementById("clos").style.display = "block"; // TODO: Error here

    // }

    return (

        <>


            <div className="lg:w-1/2 w-full shadow-xl flex md:flex-row flex-col  justify-between items-center p-4 rounded-lg bg-slate-100 dark:bg-gray-800 dark:text-slate-100 text-gray-800">
                <SalatsDay />

                <div className='w-full flex flex-col items-center'>
                    <Routes>
                        <Route index element={<Clock />} />
                        <Route path='/salat/fajr' element={<Ttst    ynt="fajr" />} />
                        <Route path='/salat/sunrise' element={<Ttst ynt="shurooq" />} />
                        <Route path='/salat/dhuhr' element={<Ttst   ynt="dhuhr" />} />
                        <Route path='/salat/asr' element={<Ttst     ynt="asr" />} />
                        <Route path='/salat/maghrib' element={<Ttst ynt="maghrib" />} />
                        <Route path='/salat/isha' element={<Ttst    ynt="isha" />} />
                    </Routes>
                    <div className="space-x-1 flex items-center justify-center mt-4">
                        <NavLink id='clos' to='/'><button className='btn btn-info w-[14em]'>Clock</button></NavLink>
                        <img className='h-[4em] w-[4em]' src='/favicon-194x194.png' alt='clock img' />
                    </div>
                </div>

            </div>

        </>

    );

}

export default NextSalat;