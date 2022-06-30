import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WeatherService} from "../../core/service/weather.service";
import {Forecast, hour} from "../../core/interface/forecast";
import {Select} from "../../core/interface/select";
import {PositionService} from "../../core/service/position.service";

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
  isNight = false;
  select: Select;

  constructor(
    public activateRoute: ActivatedRoute,
    public weatherService: WeatherService,
    public router: Router,
    public position: PositionService
  ) { }

  ngOnInit(): void {
    this.select = this.position.getSelect();
    this.id = this.activateRoute.snapshot.params['id'];
    this.loadData();
  }

  loadData() {
    this.load = true;
    this.weatherService.getForecastWeather(this.select).then(res => {
      // console.log(res);
      setTimeout(() => {
        this.load = false;
      }, 800);
      this.weather = res;
      this.getIsNight();
      this.hourList = [];
      this.lastHours();
    });
  }

  getIsNight() {
    let hourOut = this.weather.forecast.forecastday[this.id].astro.sunrise.split(':')[0];
    const minOut = this.weather.forecast.forecastday[this.id].astro.sunrise.split(':')[1].split(' ')[0];
    const stateOut = this.weather.forecast.forecastday[this.id].astro.sunrise.split(':')[1].split(' ')[1];
    let hourIn = this.weather.forecast.forecastday[this.id].astro.sunset.split(':')[0];
    const minIn = this.weather.forecast.forecastday[this.id].astro.sunset.split(':')[1].split(' ')[0];
    const stateIn = this.weather.forecast.forecastday[this.id].astro.sunset.split(':')[1].split(' ')[1];
    hourOut = stateOut === 'AM' ? hourOut : hourOut + 12;
    hourIn = stateIn === 'AM' ? hourIn : String(+hourIn + 12);
    const rise = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), +hourOut, +minOut, 0);
    const sunrise = rise.getTime();
    const set = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), +hourIn, +minIn, 0);
    const sunset = set.getTime();
    const toTime = this.date.getTime();
    this.isNight = toTime<sunrise || toTime > sunset;
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
