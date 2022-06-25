import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WeatherService} from "../../core/service/weather.service";
import {Forecast, hour} from "../../core/interface/forecast";

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent implements OnInit {
  id: number;
  weather: Forecast;
  date: Date = new Date();
  load = false;
  hourList: hour[];

  constructor(
    public activateRoute: ActivatedRoute,
    public weatherService: WeatherService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.loadData();
  }

  loadData() {
    this.load = true;
    this.weatherService.getForecastWeather().then(res => {
      console.log(res);
      this.load = false;
      this.weather = res;
      this.hourList = [];
      this.lastHours();
    });
  }

  getPressure() {
    const num: number = this.weather.forecast.forecastday[this.id].hour[this.date.getHours()].pressure_mb / 1.33322;
    return num.toFixed();
  }

  getWind() {
    const num: number = this.weather.forecast.forecastday[this.id].hour[this.date.getHours()].wind_kph / 3.6;
    return num.toFixed(2);
  }

  lastHours() {
    if(this.id == 0) {
      let hour = this.date.getHours() === 23 ? 23 : this.date.getHours() + 1;
      for (let i = hour; i <= 23; i++) {
        this.hourList.push(this.weather.forecast.forecastday[this.id].hour[i]);
      }
    } else {
      this.hourList = this.weather.forecast.forecastday[this.id].hour;
    }
  }

}
