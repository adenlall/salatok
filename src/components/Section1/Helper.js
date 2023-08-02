import moment from 'moment';
import { PrayTimes } from './PrayTimes';


export function Helper() {

	return {
			 
			checkStorage: function () {
			 			try{
				 			let dDay   = localStorage.getItem("dDay"+moment().format('DD-MM-YYYY'));
				 			let sNames = localStorage.getItem("salats_names");
				 			if(!dDay){
				 					this.clearStorage();
				 					this.setUPdDay();
				 			}
				 			if(!sNames){
		             this.ReadOrWrite("salats_names", ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"]);
				 			}
				 			return true
			 			} catch(err) {
			 				console.error("ERROR : ",err);
			 				return false
			 			}
			},
			clearStorage: function(){
			 		const keysToKeep = ['salats_names', 'country', 'city', 'timezone', 'latitude', 'longitude'];
					for (let i = 0; i < localStorage.length; i++) {
						const key = localStorage.key(i);
						if (!keysToKeep.includes(key)) {
							localStorage.removeItem(key);
						}
					}
			},
	    setUPdDay: function() {
									console.log("`LOG TRACE` : dDay for day "+ moment().format('DD-MM-YYYY') +" `NOT FOUND` in local storage");
									let config = {
										   method: this.ReadOrWrite('method', "MWL"),
										   core: this.ReadOrWrite("core", {coords: ["32.6507792","-8.4242087"], timezone:"auto", dst:"auto", format:"24h"})
									}
									const salat = new PrayTimes();
									salat.setMethod(config.method);
									let dd = salat.getTimes(new Date(), config.core.coords, config.core.timezone, config.core.dst, config.core.format);
									localStorage.setItem('dDay'+moment().format('DD-MM-YYYY'), JSON.stringify(dd));
					 				return dd;
			},
			dDay: function(){
								this.checkStorage();
								return JSON.parse(localStorage.getItem("dDay"+moment().format('DD-MM-YYYY')));
			},
			sNames: function(){
								this.checkStorage();
								return JSON.parse(localStorage.getItem("salats_names"));
			},
      ReadOrWrite: function(key, data){
               if(!localStorage.getItem(key)){
                    console.log("LOG TRACE : NextSalat@ReadOrWrite : not found in storage : key :", key)
                    let pD = JSON.stringify(data);
                    localStorage.setItem(key, pD);
                    return JSON.parse(pD);
               }
               return JSON.parse(localStorage.getItem(key));
          },

         adjust: function(params) {
             for (var id in params)
                 setting[id] = params[id];
         },
      },

}

var Helper = new Helper();

