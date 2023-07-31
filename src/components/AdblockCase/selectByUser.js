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
              
              datta.sort(function(a,b){
                return a.name.common > b.name.common ? 1 : -1; 
              });
              
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


    const locate = () => {
        document.querySelector('.stt').innerHTML = "..."

        // setState(false);

        Axios.get('https://api.ipify.org?format=json').then(res => {

            Axios.post(`https://iptwist.com`, { ip: `${res.data.ip}` }, {
              headers: {
                'Content-Type': 'application/json',
                'X-IPTWIST-TOKEN': 'Xpy1YphN5bu10XqVYDASedcCt2AJJnDTTIRQcaTLgOstdTIcg5HEAwPYU9fzjKjN'
              },
            }).then(res => {
                console.log(`https://muslimsalat.com/${encodeURI(res.data.country)}/${encodeURI(res.data.city)}.json?key=9233c34903ef6aa6fd59a97cedac8226&jsoncallback=?`)
              document.querySelector('.stt').innerHTML = `We get it! Now we check if we support your location: ${res.data.country +'-'+res.data.city}`
              $(
                $.getJSON(`https://muslimsalat.com/${encodeURI(res.data.country)}/${encodeURI(res.data.city)}.json?key=9233c34903ef6aa6fd59a97cedac8226&jsoncallback=?`, function (data) {
                    if (data.status_code === 0) {
                        setStatus(false);
                        setState(true);
                        document.querySelector('.stt').innerHTML = `We're really sorry, but we dont support your location yet. Try to chose a big city in your county manually.
                        your location : ${res.data.country} - ${res.data.city}`

                    } else {
                        localStorage.clear();
                        setStatus(true);
                        setState(true);
                        localStorage.setItem('country', res.data.country)
                        localStorage.setItem('city', res.data.city)
                        document.querySelector('.bttnn').innerHTML = "Redy!";
                        document.querySelector('.stt').innerHTML = "All done! Enjoy the app."
                        window.location.replace("/");
                    }
                })
            )
    
            }).catch(erro => {document.querySelector('.stt').innerHTML = "Please Sur! Your Adblocker block us to locate your location."})
    
          }).catch(error => {document.querySelector('.stt').innerHTML = "Please Sur! Your Adblocker block us to locate your location."})
    



    }
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
                        document.querySelector('.stt').innerHTML = "We're really sorry, but we dont support your location yet. Try to choose another city near you."

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
                    <div className="space-x-4 w-full flex items-center justify-center mt-4">
                        <button onClick={save} className='bttnn btn btn-info w-[14em]'>=&gt; check</button>
                        <button onClick={locate} className='h-[3.1em] w-[3.1em] bg-[#3ABFF8]'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" >
                                <path d="M30.56 8.47a8 8 0 00-7-7 64.29 64.29 0 00-15.06 0 8 8 0 00-7 7 64.29 64.29 0 000 15.06 8 8 0 007 7 64.29 64.29 0 0015.06 0 8 8 0 007-7 64.29 64.29 0 000-15.06zm-2 .23A63 63 0 0129 15h-4a9 9 0 00-8-7.94V3a63 63 0 016.3.39 6 6 0 015.28 5.31zM20 17h2.92A7 7 0 0117 22.92V20a1 1 0 00-2 0v2.92A7 7 0 019.08 17H12a1 1 0 000-2H9.08A7 7 0 0115 9.08V12a1 1 0 002 0V9.08A7 7 0 0122.92 15H20a1 1 0 000 2zM8.7 3.42A63 63 0 0115 3v4a9 9 0 00-7.94 8H3a63 63 0 01.39-6.3A6 6 0 018.7 3.42zM3.42 23.3A63 63 0 013 17h4a9 9 0 008 7.94v4a63 63 0 01-6.3-.39 6 6 0 01-5.28-5.25zm19.88 5.28A63 63 0 0117 29v-4a9 9 0 007.94-8h4a63 63 0 01-.39 6.3 6 6 0 01-5.25 5.28z"
                                    data-name="location android app aplication phone" />
                            </svg>
                        </button>                        
                    </div>
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
