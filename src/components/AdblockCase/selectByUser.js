import Axios from 'axios';
import { useEffect, useState } from 'react';

function SelectByUser() {

    const [selectState, setSelectState] = useState(false)

    useEffect(() => {
        Axios.get(`https://restcountries.com/v3.1/all`)
            .then(data => {
                const datta = data.data
                console.log(datta)
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
                    console.log(cities)
                    for (let i = 0; i < cities.length; i++) {
                        ele.add(
                            new Option(cities[i].name, cities[i].name)
                        );
                    }
                    setSelectState(false);
                }).catch(erro => { console.log(erro) })

            document.querySelector('.bttnn').innerHTML = "=>"
        };

    }, [selectState])


    const save = () => {
        var num = document.querySelector('.elsex').selectedIndex - 1
        localStorage.setItem('country', document.querySelectorAll('.elsex option')[num].name)
        localStorage.setItem('city', document.querySelector('.ifsa').value)
        document.querySelector('.bttnn').innerHTML = "Redy!";
    }


    return (
        <>
            <div className="lg:w-1/2 w-full h-[26em] md:h-auto shadow-xl flex md:flex-row flex-col justify-between items-center p-4 rounded-lg bg-slate-100 dark:bg-gray-800 dark:text-slate-100 text-gray-800">
                <div className="flex flex-col h-full justify-evenly items-center">
                    <div className="flex flex-row items-end py-6 space-x-2">
                        <header className="text-2xl font-bold">Fill your Location.</header>
                        <i>its quickly.</i>
                    </div>
                    <div className="flex flex-col space-y-4 p-2">
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
                <button onClick={save} className="bttnn btn btn-info md:mt-0 mt-6 sm:h-[100%] md:w-[8em] h-[4em] w-[4em] text-lg font-bold">{"->"}</button>
            </div>
        </>
    );
}

export default SelectByUser;