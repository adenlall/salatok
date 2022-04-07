import React, { useState, useEffect } from 'react';
import axios from 'axios';
function SlideDiv() {
    // https://api.aladhan.com/asmaAlHusna/77


    const [asmaAlHusna, setAsmaAlHusna] = useState(0);

<<<<<<< HEAD
    useEffect(() => {
        
        axios.get(`https://api.aladhan.com/asmaAlHusna/${Math.floor(Math.random() * 100)}`)
=======
    function qakl() {
        var ran = Math.floor(Math.random() * 100);

        axios.get(`https://api.aladhan.com/asmaAlHusna/${ran}`)
>>>>>>> c907b13f8fd58907e0fac386caa1b4f09920e757
            .then((response) => {

                setAsmaAlHusna(response.data.data[0]);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    
    return (
        <>
            <div className="lg:w-1/2 w-full shadow-xl rounded-lg" style={{ background: 'url("https://tlgur.com/d/GZ3Xn16g") center center / cover ', backgroundRepeat: 'no-repeat' }} >
                <div className="flex flex-col h-full items-center lg:py-4 py-12 justify-between rounded-lg text-slate-100" style={{ background: 'linear-gradient(181deg, black, transparent)' }} >
<<<<<<< HEAD
                    <>
                        <div className="flex flex-col items-center justify-center pt-8">
                            <h1 className=" font-extrabold text-4xl mb-2"> {asmaAlHusna.name}</h1>
                            <p className=" font-light text-2xl">  {asmaAlHusna.transliteration} </p>
                        </div>
                        <div className="">
                            <div className=" font-bold text-xl mb-2 bg-gray-800 p-2 rounded-lg "> {asmaAlHusna.en.meaning}</div>
                        </div>
                    </>
=======
                    {
                        load === true
                            ?
                            <>
                                <div className="h-[100%] flex items-center justify-center">
                                <div className="loader">
                                    <div className="outer"></div>
                                    <div className="middle"></div>
                                    <div className="inner"></div>
                                </div>
                                </div>
                            </>

                            : <>
                                <div className="flex flex-col items-center justify-center pt-8">
                                    <h1 className=" font-extrabold text-4xl mb-2"> {asmaAlHusna.name}</h1>
                                    <p className=" font-light text-2xl">  {asmaAlHusna.transliteration} </p>
                                </div>
                                <div className="">
                                    <div className=" font-bold text-xl mb-2 bg-gray-800 p-2 rounded-lg "> {asmaAlHusna.en.meaning}</div>
                                </div>
                            </>
                    }

>>>>>>> c907b13f8fd58907e0fac386caa1b4f09920e757
                </div>
            </div>
        </>
    );
}

export default SlideDiv;