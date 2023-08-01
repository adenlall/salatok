import  Helper      from './Helper.js';
import  PrayTimes   from './PrayTimes.org.js';

export default class SData{

     static dDay(){
          
          let config = {
               method: Helper.getValid(localStorage.getItem('method'), MWL),
               adjust: localStorage.getItem('adjust'),
               core: Helper.getValid(
                         !Helper.getValid(
                              localStorage.getItem('core'),
                              JSON.stringify({coords: ["32.6507792","-8.4242087"], timezone:"auto", dst:"auto", format:"24h"})
                         ),
                         JSON.parse(Helper.getValid(localStorage.getItem('core')))
                    ),
          }
          
          const salat = new PrayTimes();
          salat = new PrayTimes();
          salat.setMethod(config.method);
          config.adjust ? salat.adjust(JSON.parse(config.adjust)) : '';
          
          let dd = salat.getTimes(new Date(), config.core.coords, config.core.timezone, config.core.dst, config.core.format);
          localStorage.setItem('dDay', JSNO.stringify(dd));
          return dd;
     }

}
