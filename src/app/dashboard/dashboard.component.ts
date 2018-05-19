import { Component, OnInit,DoCheck } from '@angular/core';
import { HttpCallingService } from '../http-calling.service';

import {Http} from '@angular/http';
declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  startingPoint: string = 'Bhubaneswar';
  endPoint: string;
  shippingDate = new Date();
  estimatedDeliveryDate: any;
  coordOne: any;
  coordTwo: any;
  serviceTypeArray = [
    {
      key: 'normal',
      value: 'Standard'
    },
    {
      key: 'express',
      value: 'Express'
    },
    {
      key: 'premium',
      value: 'Premium'
    }
  ];
  productTypeArray = [
    {
      key: 'normal',
      value: 'Normal Delivery Goods'
    },
    {
      key: 'fragile',
      value: 'Fragile Goods'
    },
    {
      key: 'heavy',
      value: 'Heavy Metals'
    }
  ];
  serviceType = this.serviceTypeArray[0].key;
  productType = this.productTypeArray[0].key;
  lat: Number = 20.2960587;
  lng: Number = 85.8245398;
  zoom: Number = 14;
  dir = undefined;
  weather: any;

  constructor(private _httpService: HttpCallingService, private _http: Http) {
    // this.directionsService = new google.maps.DirectionsService;
    // this.directionsDisplay = new google.maps.DirectionsRenderer;
  }

  ngOnInit() {
    // var directionsService = new google.maps.DirectionsService;
    //     var directionsDisplay = new google.maps.DirectionsRenderer;
        // const map = new google.maps.Map(document.getElementById('map'), {
        //   zoom: 7,
        //   center: {lat: 41.85, lng: -87.65}
        // });
        // this.directionsDisplay.setMap(map);
       // this.getDirection();
  }

  getGeoLocation(address) {
    let result: any;
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +  address +  '&key=AIzaSyDJr9p8UQMnyZm4O3vEGkmVDhv0Wfqezds';
    this._http.get(url).subscribe((data) => {
      console.log(data.json());
      result = data.json().results[0];
      console.log(result.geometry.location);
      return result.geometry.location;
    });
  }

  getCoordinates() {
    console.log("clicked");
    this._httpService.getGeoLocation('bhubaneswar').subscribe(data=>{
      console.log(data);
      this.coordOne=data.results[0].geometry.location;
    });
    this._httpService.getGeoLocation('delhi').subscribe(data=>{
      console.log(data);
      this.coordTwo=data.results[0].geometry.location;
    });

  }
  showDistance() {
    console.log("Distance: ", this.getDistance(this.coordOne, this.coordTwo));
    this.getDirection(this.coordOne, this.coordTwo);
    this._httpService.getWeatherForCast(this.coordTwo, this.shippingDate.toISOString()).subscribe(data => {
      console.log(data.daily);
      this.weather = data.daily;
    });
  }

  public getDirection(a, b) {
    this.dir = {
      origin: { lat : a.lat,
               lng : a.lng },
      destination: { lat : b.lat,
      lng : b.lng }
    };
  }
//   origin: { lat, lng };
// destination: { lat, lng };
// waypoints: Object = [];
// travelMode: String = 'DRIVING';
// optimizeWaypoints: Boolean = true;

  submit() {
    console.log(this.startingPoint, this.endPoint, this.shippingDate, this.estimatedDeliveryDate, this.serviceType, this.productType);
  }

  calcRad(x) {
    return x * Math.PI / 180;
  }
  getDistance(p1, p2) {
    console.log(p1, p2);
    const R = 6378137; // Earth’s mean radius in meter
    let dLat = this.calcRad(p2.lat - p1.lat);
    let dLong = this.calcRad(p2.lng - p1.lng);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.calcRad(p1.lat) * Math.cos(this.calcRad(p2.lat) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d; // returns the distance in meter
  }

  weatherIcon(icon) {
    switch (icon) {
      case 'partly-cloudy-day':
        return 'wi wi-day-cloudy';
      case 'clear-day':
        return 'wi wi-day-sunny';
      case 'partly-cloudy-night':
        return 'wi wi-night-partly-cloudy';
      default:
        return `wi wi-day-sunny`;
    }

  }

}
// origin: document.getElementById('start').value,
//       destination: document.getElementById('end').value
