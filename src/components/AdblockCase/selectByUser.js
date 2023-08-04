import { useEffect, useState } from 'react';
import Axios from 'axios';
import $ from 'jquery';

function SelectByUser() {

    const [dataUI, setDataUI] = useState("Loading...");
    

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
            }).catch(erro => {
                console.error(erro)
            })
    }, []);
    
    
     const parse = (res) => {
          let arr=[];
		      if (res) {
		      for (let i = 0; i<res.length; i++ ) {
		           let region = getOr(res[i].address, ["region","state","province","place"]);
		           let city = getOr(res[i].address, ["city","town","village"]);
		           let country = res[i].address.country;
		           if (!res[i].lat || !res[i].lon || !city || !region || !country) {
		                if (res[i].importance >= 0.5) {
		                let city = getValid(res[i].address,"city");
		                let region = getValid(res[i].address,"region");
		                arr.push({"name": res[i].display_name,"city":city,"region":region,"country":getValid(res[i].address, "country"), "lat":res[i].lat, "long":res[i].lon});
		               }
		              //console.error(res[i]);
		              continue;
		           }
		           arr.push({"name": res[i].display_name,"city":city,"region":region,"country":country, "lat":res[i].lat, "long":res[i].lon});
		      }
          }
          return arr;
     }
    
    const createUIsearch = (data) => {
    		data = parse(data);
    		let UIarr = [];
    		for (let i=0; i<data.length; i++ ) {
				let UI = (
					  <div className="collapse collapse-arrow join-item border border-base-300">
						<input type="radio" name="location-search-accordion" /> 
						<div className="collapse-title text-xl font-medium">
						  {data[i].name}
						  {data[i].city} - {data[i].country}
						</div>
						<div className="collapse-content"> 
						  <p>lat : {data[i].lat}</p> 
						  <p>long : {data[i].long}</p>
						</div>
					  </div>
				)
				UIarr.push(UI);
    		}
    		setDataUI(UIarr);
    }
    
     const getValid = (data, key) => {
        if(key=="city"){
          if (!getOr(data, ["city","town","village"])) {
            let cc = getOr(data, ["region","state","province", "place"]);
            if (cc) {
              return cc;
            }
            console.error('undifined Not city Not region at Nomination@#getValid');
            console.error({data_related: data});
            return "[undefined]";
          }
          return getOr(data, ["city","town","village"]);
        }
        if(key=="region"){
          if (!getOr(data, ["region","state","province", "place"])) {
            let rr = getOr(data, ["city","town","village"]);
            if (rr) {
              return rr
            }
            console.error('undifined Not city Not region at Nomination@#getValid');
            console.error({data_related: data});
            return "[undefined]";
          }
          return getOr(data, ["region","state","province", "place"]);
        }
        if(key==="country"){
          if (!getOr(data, ["country","country_code"])) {
            console.error('error no country found in : ', data);
            return "[undefined]";
          }
          return getOr(data, ["country","country_code"]);
        }
     }

     const getOr = (res, arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (res[arr[i]]) {
          return res[arr[i]];
        }
      }
     }


	const hundelSearch = (e) => {
	  e.preventDefault();
	  if (e.target.value && e.target.value.length !== 0) {
	  	 Axios.get(`https://nominatim.openstreetmap.org/search?q=${e.target.value}&addressdetails=1&limit=3&format=json`)
            .then(data => {
                console.log("NOMINATION API : ",data);
                createUIsearch(data.data);
            }).catch(erro => {
                console.log(erro);
            })
	  }
	};


    const locate = () => {
        document.querySelector('.stt').innerHTML = "...";
        Axios.get('https://api.ipify.org?format=json').then(res => {
            Axios.post(`https://iptwist.com`, { ip: `${res.data.ip}` }, {
              headers: {
                'Content-Type': 'application/json',
                'X-IPTWIST-TOKEN': 'Xpy1YphN5bu10XqVYDASedcCt2AJJnDTTIRQcaTLgOstdTIcg5HEAwPYU9fzjKjN'
              },
            }).then(res => {
					document.querySelector('.stt').innerHTML = `We get it! Now we check if we support your location: ${res.data.country +'-'+res.data.city}`
					document.querySelector('.stt').innerHTML = `We're really sorry, but we dont support your location yet. Try to chose a big city in your county manually.
					your location : ${res.data.country} - ${res.data.city}`;
					localStorage.clear();
					
					localStorage.setItem('country' , res.data.country  );
					localStorage.setItem('city'    , res.data.city     );
					localStorage.setItem("timezone", res.data.timezone );
					localStorage.setItem("lat"     , res.data.latitude );
					localStorage.setItem("long"    , res.data.longitude);
					
					document.querySelector('.bttnn').innerHTML = "Redy!";
					document.querySelector('.stt').innerHTML = "All done! Enjoy the app.";
					window.location.replace("/");
            }).catch(erro => {document.querySelector('.stt').innerHTML = "Please Sur! Your Adblocker/Browser block us to locate your location."});
          }).catch(error => {document.querySelector('.stt').innerHTML = "Please Sur! Your Adblocker/Browser block us to locate your location."});

    }
    const save = () => {
        document.querySelector('.stt').innerHTML = "";
        if (document.querySelector('.elsex').value === 'Select Country' || document.querySelector('.ifsa').value === 'Select Country' || document.querySelector('.ifsa').value === '') {
            document.querySelector('.stt').innerHTML = "Please fill all feild, then submit."
        } else {
            var num = document.querySelector('.elsex').selectedIndex - 1;
            var cc = document.querySelectorAll('.elsex option')[num].name;
            var ss = document.querySelector('.ifsa').value;
            $(
                $.getJSON(`https://muslimsalat.com/${cc}/${ss}.json?key=9233c34903ef6aa6fd59a97cedac8226&jsoncallback=?`, function (data) {
                    if (data.status_code === 0) {
                        document.querySelector('.stt').innerHTML = "We're really sorry, but we dont support your location yet. Try to choose another city near you.";
                    } else {
                        localStorage.clear();
                        localStorage.setItem('country', cc);
                        localStorage.setItem('city', ss);
                        document.querySelector('.bttnn').innerHTML = "Redy!";
                        document.querySelector('.stt').innerHTML = "All done! Enjoy the app.";
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
                        <header className="text-2xl lg:text-4xl font-bold">Find your Kocation.</header>
                    </div>
                    <input onChange={hundelSearch} type="text" placeholder="Search with Nomination API" className="input input-bordered input-primary w-full max-w-xs" />
                    <div className="flex flex-col w-[90%] space-y-4 p-2">
						<div className="join join-vertical w-full">
							{dataUI}
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default SelectByUser;
