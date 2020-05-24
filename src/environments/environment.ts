// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {CountryData} from "../app/interfaces/interfaces";

export const environment = {
  production: false,
  apiUrl: '/assets/data/world-data.json',
  africaCountryCodes: [
    'BF','DJ','BI','BJ','ZA','BW','DZ','ET','RW','TZ','GQ','NA','NE','NG',
    'TN','LR','LS','ZW','TG','TD','ER','LY','GW','ZM','CI','EH','CM','EG',
    'SL','CG','CF','AO','CD','GA','GN','GM','XS','CV','GH','SZ','MG','MA',
    'KE','SS','ML','KM','ST','MW','SO','SN','MR','UG','SD','MZ','SC','MU'
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
