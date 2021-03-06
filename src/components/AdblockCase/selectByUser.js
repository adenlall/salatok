import { useEffect, useState } from 'react';
import Axios from 'axios';
import $ from 'jquery';

function SelectByUser() {

    const [selectState, setSelectState] = useState(false)
    const [state, setState] = useState(null)
    const [status, setStatus] = useState(null)

    useEffect(() => {
        Axios.get(`https://restcountries.com/v3.1/all`)
            .then(data => {
                const datta = data.data
                // console.log(datta)
                const ele = document.querySelector('.elsex').options
                for (let i = 0; i < datta.length; i++) {
                    ele.add(new Option(datta[i].name.common, datta[i].altSpellings[0]));
                }
                const hel = document.querySelectorAll('.elsex option')
                for (let i = 0; i < datta.length; i++) {
                    hel[i].name = datta[i].name.common
                }
                setSelectState(true);
            }).catch(erro => {
                console.log(erro)
                // setSelectState(false)
            })
    }, [])

    useEffect(() => {
        document.querySelector('.elsex').onchange = function () {
            const cCode = document.querySelector('.elsex').value;
            const ele = document.querySelector('.ifsa').options;

            while (ele.length > 0) {
                ele.remove(0);
            }

            Axios.get(`https://api.countrystatecity.in/v1/countries/${cCode}/cities`, { headers: { 'X-CSCAPI-KEY': 'YTZMZlA4bEhIM29sWWNzU1NUaU9CS3pEMjE3dTVJeUtWeXJ5VW9DUA==' } })
                .then(data => {
                    const cities = data.data
                    // console.log(cities)
                    for (let i = 0; i < cities.length; i++) {
                        ele.add(
                            new Option(cities[i].name, cities[i].name)
                        );
                    }
                    setSelectState(false);
                }).catch(erro => { console.log(erro) })

            document.querySelector('.bttnn').innerHTML = "=> Check"
        };

    }, [selectState])


    const save = () => {
        setState(false);
        document.querySelector('.stt').innerHTML = "";
        if (document.querySelector('.elsex').value === 'Select Country' || document.querySelector('.ifsa').value === 'Select Country' || document.querySelector('.ifsa').value === '') {
            setStatus(false);
            setState(true);
            document.querySelector('.stt').innerHTML = "Please fill all feild, then submit."
        } else {
            var num = document.querySelector('.elsex').selectedIndex - 1;
            var cc = document.querySelectorAll('.elsex option')[num].name;
            var ss = document.querySelector('.ifsa').value;
            $(
                $.getJSON(`https://muslimsalat.com/${cc}/${ss}.json?key=9233c34903ef6aa6fd59a97cedac8226&jsoncallback=?`, function (data) {
                    if (data.status_code === 0) {
                        setStatus(false);
                        setState(true);
                        document.querySelector('.stt').innerHTML = "We're really sorry, but we dont support your location yet. Try to chose a big city in your county."

                    } else {
                        localStorage.clear();
                        setStatus(true);
                        setState(true);
                        localStorage.setItem('country', cc)
                        localStorage.setItem('city', ss)
                        document.querySelector('.bttnn').innerHTML = "Redy!";
                        document.querySelector('.stt').innerHTML = "All done! Enjoy the app."
                        window.location.replace("/");
                    }
                })
            )

        }
    }


    return (
        <>
            <div className="lg:w-1/2 w-full md:h-auto shadow-xl flex flex-col justify-between items-stretch p-4 rounded-lg bg-slate-100 dark:bg-gray-800 dark:text-slate-100 text-gray-800">
                <div className="flex flex-col h-full w-full justify-evenly items-center">
                    <div className="flex flex-row items-end w-[87%] py-6 space-x-2">
                        <header className="text-2xl lg:text-4xl font-bold">Fill your Location.</header>
                        <i>easy way!</i>
                    </div>
                    <div className="flex flex-col w-[90%] space-y-4 p-2">
                        <div>
                            <select class="select select-info w-full elsex">
                                <option disabled selected>Select Country</option>
                            </select>
                        </div>
                        <div>
                            <select class="select select-info w-full ifsa">
                                <option disabled selected>Select City</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-[1em] flex flex-col-reverse items-end justify-start'>
                    <a id='gohome' className='w-full flex justify-center' href='#__'><button onClick={save} className="bttnn btn btn-info sm:mt-0 mt-6 w-[90%] h-[4em] text-lg font-bold">{"=> Check"}</button></a>
                    <div className='w-[90%] mb-[1em]'>
                        {
                            state === false ?
                                <div className="loader py-[2em]">
                                    <div className="outer"></div>
                                    <div className="middle"></div>
                                    <div className="inner"></div>
                                </div>
                                :
                                <div className="stt text-xl font-extrabold " >
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default SelectByUser;