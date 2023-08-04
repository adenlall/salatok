import moment from 'moment';
import { PrayTimes } from './PrayTimes';


export function Helper() {

	return {
			checkStorage: function () {
			 			try{
				 			let dDay   = localStorage.getItem("dDay-"+moment().format('DD-MM-YYYY'));
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
								core: this.ReadOrWrite("core", {coords: [this.getValid(localStorage.getItem("lat"), "32.6507792"), this.getValid(localStorage.getItem("long"), "-8.4242087")], timezone:"auto", dst:"auto", format:"24h"})
							};
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
			getDiff: function(hh, mm) {
				console.log("GETDIFF", hh,":",mm);
				let m = moment();
				let H = m.hours();
				let M = m.minutes();
				let Hdiff = hh - H;
				let Mdiff = mm - M;
				console.log("Hfiff : ", Hdiff, " is :"+hh+"-"+H);
				console.log("Mdiff : ", Mdiff, " is :"+mm+"-"+M);
				if(Mdiff<0){
					console.log("IFF");
					Hdiff = Hdiff - 1;
					Mdiff = 60+Mdiff;
				}
				console.log("FINAL : ",Hdiff +" h and "+Mdiff+" min");
				return {
					hh:Hdiff,
					mm:Mdiff
				}
			},
			dWeek: function(ssa){
					let config = {
						method: this.ReadOrWrite('method', "MWL"),
						core: this.ReadOrWrite("core", {coords: [this.getValid(localStorage.getItem("lat"), "32.6507792"), this.getValid(localStorage.getItem("long"), "-8.4242087")], timezone:"auto", dst:"auto", format:"24h"})
					};
					const salat = new PrayTimes();
					const arr = [];
					const ddc = this.dDay();
					
					let diff = (dd) => {
							let baseH = moment(ddc[ssa], "HH.mm").hours();
							let baseM = moment(ddc[ssa], "HH.mm").minutes();
							let Gh = moment(dd[ssa], "HH.mm").hours();
							let Gm = moment(dd[ssa], "HH.mm").minutes();
							let MDiff = baseM - Gm;
							if(baseH-Gh === 0){
								return -1*MDiff;
							} else {
								return Math.sign(MDiff)*(60+(-1*Math.abs(MDiff)));
							}
					}
					
					for (let i=0; i<7; i++ ) {
						let cdate = new Date();
						let newdate = new Date(cdate.setDate(cdate.getDate() + i));
						salat.setMethod(config.method);
						let dd = salat.getTimes(newdate, config.core.coords, config.core.timezone, config.core.dst, config.core.format);
						arr.push([dd[ssa], {
							diff: diff(dd),
							day : moment(newdate).format('dddd'),
							date: moment(newdate).format("DD-MM-YYYY"),
						}]);
					}
					console.log("FULL WEEK : ", arr);
					return arr;
			},
			getValid: function  (a,b) {
						if (a || a===0) {
							return a;
						} else {
							return b;
						}
			}
		}
}
