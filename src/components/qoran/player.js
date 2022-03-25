import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Player(props) {

    const [play, setPlay] = useState(false);
    const [seek, setSeek] = useState(0);
    const [load, setLoad] = useState(true);

    const player = document.getElementById('music_player');

    function qakl() {
        setLoad(true)

        axios.get(`http://api.quran.com/api/v4/recitations/3/by_ayah/${props.num}`)
            .then((response) => {

                // setSuraha(response.data.data.surah)
                document.querySelector('#srslp').src = `http://verses.quran.com/${response.data.audio_files[0].url}`;
                // console.log(`https://verses.quran.com/${response.data.audio_files[0].url}`)
                document.querySelector('#music_player').load();
                setLoad(false)


            })
            .catch((error) => {
                setLoad('err')

                console.log(error);
            })

    }
    useEffect(() => {
        qakl()
    }, [])

    const recico = {
        '8': ['Mohamed Siddiq al-Minshawi', 'محمد صديق المنشاوي', 'Mujawwad'],
        '2': ['AbdulBaset AbdulSamad', 'عبد الباسط عبد الصمد', 'Murattal'],
        '10': ['Sa`ud ash-Shuraym', 'سعود الشريم', 'undifined'],
        '12': ['Mahmoud Khalil Al-Husary', 'محمود خليل الحصري', 'Muallim'],
        '5': ['Hani ar-Rifai', 'هاني الرفاعي', 'undifined'],
        '7': ['Mishari Rashid al-`Afasy', 'مشاري راشد العفاسي', 'undifined']
    }
    function ggd(rec) {
        setLoad(true)
        for (let i = 0; i < document.querySelectorAll(`.avatar`).length; i++) {

            const element = document.querySelectorAll(`.avatar`)[i];
            element.classList.remove('online');
        }
        document.querySelector(`#rec${rec}`).classList.add('online');

        document.querySelector('#bbs').innerHTML = recico[`${rec}`][0];
        player.pause();

        axios.get(`http://api.quran.com/api/v4/recitations/${rec}/by_ayah/${props.num}`)
            .then((response) => {

                // setSuraha(response.data.data.surah)
                document.querySelector('#srslp').src = `http://verses.quran.com/${response.data.audio_files[0].url}`;
                document.querySelector('#music_player').load();
                setLoad(false)

            })
            .catch((error) => {
                setLoad('err')
                console.log(error);
            })


    }



    const handlePlay = () => {


        if (play === false) {
            player.play();
            document.querySelector('#play_button').src = "http://www.talkerscode.com/webtricks/demo/images/pause.png";
            setPlay(true);
        } else {
            player.pause();
            document.querySelector('#play_button').src = "http://www.talkerscode.com/webtricks/demo/images/play.png";
            setPlay(false);
        }
    };

    const stop = () => {

        player.pause();
        player.currentTime = 0;
        setPlay(false);
        setSeek(0);
        document.querySelector('#play_button').src = "https://www.talkerscode.com/webtricks/demo/images/play.png";

    }

    function volChange() {

        player.volume = document.getElementById("change_vol").value;
    }


    const logseek = () => {

        const audio = document.querySelector('#music_player');
        let duration = audio.duration;
        let current = audio.currentTime * (100 / duration);
        setSeek(current);
        document.querySelector('#ct').innerHTML = setct(audio.currentTime);
        document.querySelector('#tt').innerHTML = setct(duration);

        // console.log('from useEffect : ' + current)

    }
    const handelSeek = () => {
        const audio = document.querySelector('#music_player');
        const seek = document.querySelector('#seekSlider');
        let duration = audio.duration;
        audio.currentTime = seek.value * duration / 100;
        let current = audio.currentTime * (100 / duration);
        setSeek(current);
        document.querySelector('#ct').innerHTML = setct(audio.currentTime);
        document.querySelector('#tt').innerHTML = setct(duration);

    }
    const setct = (time) => {

        var mins = Math.floor(time / 60);
        if (mins < 10) {
            mins = '0' + String(mins);
        }
        var secs = Math.floor(time % 60);
        if (secs < 10) {
            secs = '0' + String(secs);
        }

        return mins + ':' + secs;
    }
    useEffect(() => {
        if (load === true) {
            setPlay(false)
            // console.log('loading...');
            document.querySelector('#play_button').src = 'http://cdn2.iconfinder.com/data/icons/guest-house-and-lodge-2/64/47-512.png';

            // handlePlay();
        }
        if (load === false) {
            setPlay(false)
            // console.log('Done!');
            document.querySelector('#play_button').src = 'http://www.talkerscode.com/webtricks/demo/images/play.png';

            // handlePlay();
        }
        if (load === 'err') {
            console.log('Error please report a bug on github link!');
            document.querySelector('#play_button').src = 'https://www.talkerscode.com/webtricks/demo/images/play.png';

        }
    }, [load])
    useEffect(() => {

        let timerID = setInterval(() => {
            logseek();
        }, 1000)

        return () => {
            clearInterval(timerID)
        }


    })
    // https://wp-technique.com/loading/loading.gif
    // document.querySelector('#music_player').load()

    return (
        <>
            <div className="lg:w-1/2 w-full shadow-xl flex flex-col justify-center space-y-4 items-center p-4 rounded-lg bg-slate-100 dark:bg-gray-800 dark:text-slate-100 text-gray-800">


                <div className="flex w-full items-center justify-between content-center space-y-4  p-3 dark:text-slate-100 text-gray-00">
                    {/* <h1 className='font-bold text-4xl'>{suraha.name}</h1> */}
                    <div>
                        {/* <p>Number of Ayahs : {suraha.numberOfAyahs}</p> */}
                        {/* <p>Revelation type : {suraha.revelationType}</p> */}

                    </div>
                </div>

                <div className="flex items-center w-full justify-center content-center space-x-4  p-3 rounded-lg bg-gray-700 text-slate-100">
                    <audio id="music_player">
                        <source id="srslp" src="" />
                    </audio>


                    <input alt='' className='w-6 h-6' type="image" src="https://cdn2.iconfinder.com/data/icons/guest-house-and-lodge-2/64/47-512.png" onClick={handlePlay} id="play_button" />
                    <input alt='' className='w-6 h-6' type="image" src="https://www.talkerscode.com/webtricks/demo/images/stop.png" onClick={stop} />


                    <div className="flex space-x-2 w-1/2">
                        <div id="ct">00:00</div>
                        <input type="range" min="1" max="100" id="seekSlider" value={seek} className="range range-sm" onChange={handelSeek} />
                        <div id="tt">00:00</div>
                    </div>

                    <div className='flex items-center justify-center space-x-4 p-4'>
                        <img alt='' className='w-6 h-6' src="https://www.talkerscode.com/webtricks/demo/images/volume.png" id="vol_img" />
                        <input type="range" id="change_vol" onChange={volChange} step="0.1" min="0" max="1" class="range range-sm" />
                    </div>
                </div>
                <div className=''>
                    <h1 className='text-lg pl-2'>The reciter :  <span className='font-bold badge text-base badge-primary ' id='bbs'>Mohamed Siddiq al-Minshawi</span></h1>
                    <div className='flex mt-2 space-x-2 p-2'>

                        <div className="avatar  w-full online" id="rec8">
                            <div onClick={() => { ggd(8) }} className="shadow-lg w-full mask hover:opacity-80 cursor-pointer mask-squircle ">
                                <img alt="" className=' object-cover object-center' src="http://quran.com.kw/en/wp-content/uploads/al-minshawy-1.jpg" />
                            </div>
                        </div>
                        <div className="avatar  w-full" id="rec2">
                            <div onClick={() => { ggd(2) }} className="shadow-lg w-full mask hover:opacity-80 cursor-pointer mask-squircle ">
                                <img alt="" className=' object-cover object-center' src="http://darulquran.co.uk/wp-content/uploads/2021/02/Abdul-Basit-Abdus-Samad.jpg" />
                            </div>
                        </div>
                        <div className="avatar  w-full" id="rec10">
                            <div onClick={() => { ggd(10) }} className="shadow-lg w-full mask hover:opacity-80 cursor-pointer mask-squircle ">
                                <img alt="" className=' object-cover object-center' src="http://4.bp.blogspot.com/_0S0sNxarG_M/TMnWY_fGxuI/AAAAAAAAFUk/10C_Fqm7K9E/s1600/saoud-shuraim-123.jpg" />
                            </div>
                        </div>
                        <div className="avatar  w-full" id="rec5">
                            <div onClick={() => { ggd(5) }} className="shadow-lg w-full mask hover:opacity-80 cursor-pointer mask-squircle ">
                                <img alt="" className=' object-cover object-center' src="http://masjidassunnah-fl.com/wp-content/uploads/2012/12/Hani-Ar-Rifai.jpg" />
                            </div>
                        </div>
                        <div className="avatar  w-full" id="rec7">
                            <div onClick={() => { ggd(7) }} className="shadow-lg w-full mask hover:opacity-80 cursor-pointer mask-squircle ">
                                <img alt="" className=' object-cover object-center' src="http://yt3.ggpht.com/a/AGF-l7895FcDq0jG9uG_7uDQZ2T-v1kcSAaGrzP20w=s900-mo-c-c0xffffffff-rj-k-no" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Player;