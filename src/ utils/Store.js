export class Store{

     data = {
          salats_names:["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"],
     }

     write(key){
          try{
               localStorage.setItem(key, this.data[key]);
               return true;
          } catch(err){
               console.log("ERROR : ",err);
               return false;
          }
     }

}
