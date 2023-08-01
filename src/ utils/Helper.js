import { Store } from "./Store.js";
export class Helper {
     
     static getValid(a,b){
          if( a || a === 0 ){
               return a;
          }
          return b;
     }
     static ReadOrWrite(key){
          if(!localStorage.getItem(key)){
               let s = new Store();
               s.write(key);
          }
          return JSON.parse(localStorage.getItem(key));
     }

}
