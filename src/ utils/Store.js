export class Store{

     data = {
          metainfo:["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"],
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
