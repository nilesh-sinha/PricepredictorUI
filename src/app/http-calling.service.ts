import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class HttpCallingService {
  locationResult: any;
  URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  constructor(private _http: Http) { }

  getGeoLocation(address) {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +  address +  '&key=AIzaSyDJr9p8UQMnyZm4O3vEGkmVDhv0Wfqezds';
    return this._http.get(url)
    .map((res: Response) => res.json());
            // return data.json();

        }

    getWeatherForCast(coord, time) {
      console.log("AM HERE", coord, time);
      let  url= 'https://api.darksky.net/forecast/4c323fa5447949ac09c6ebd745bb9578/' + coord.lat + ',' + coord.lng;
      return this._http.get(url)
    .map((res: Response) => res.json());
    }

}
