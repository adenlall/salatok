import moment from "moment";

function MPro() {


    const convert = () => {
        fetch(`https://api.aladhan.com/v1/gToH?date=${moment().format('DD-MM-YYYY')}`)
            .then(response => response.json())
            .then(json => {

                let por = Math.floor(json.data.hijri.day * 100 / 29);
                document.querySelector('.exos').innerHTML = por + ' %';
                document.querySelector('.exosa').value = por;
            })
    }

    return (
        <>
            <div className="flex flex-col w-full my-12 lg:space-y-4 space-y-8 p-6">
                <div className="flex lg:flex-row flex-col lg:items-center items-start w-full lg:space-x-4 space-x-0 space-y-2 lg:space-y-0">
                    <h1 className="text-xl font-bold lg:w-2/3 w-full text-cyan-400">Gregorian mounth progress : <span className="">{Math.floor((30 - moment().endOf('month').fromNow('dd').match(/(\d+)/)[0]) * 100 / 31)} %</span></h1 >
                    <progress class="progress progress-info w-full bg-slate-700" value={Math.floor((30 - moment().endOf('month').fromNow('dd').match(/(\d+)/)[0]) * 100 / 31)} max="100"></progress>
                </div>
                <div className="flex lg:flex-row flex-col  lg:items-center items-start w-full lg:space-x-4 space-x-0 space-y-2 lg:space-y-0">
                    <h1 className="text-xl font-bold lg:w-2/3 w-full text-cyan-400">Arabic mounth progress : <span className="exos">{convert(moment(moment().add(4, 'days').calendar('MM-DD-YYYY'), 'MM-DD-YYYY').format('DD-MM-YYYY'), 4)} %</span></h1 >
                    <progress class="progress progress-info w-full bg-slate-700 exosa" value="72" max="100"></progress>
                </div>
            </div>
        </>
    );
}

export default MPro;