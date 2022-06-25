import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../core/service/weather.service";
import {Forecast, hour} from "../../core/interface/forecast";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  weather: Forecast;
  date: Date = new Date();
  load = false;
  hourList: hour[];

  constructor(
    public weatherService: WeatherService,
    public router: Router
  ) {
    setInterval(() =>{
      this.date = new Date();
    }, 10000);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.load = true;
    this.weatherService.getForecastWeather().then(res => {
      this.load = false;
      this.weather = res;
      this.hourList = [];
      this.lastHours();
    });
  }

  lastHours() {
    let hour = this.date.getHours() === 23 ? 0 : this.date.getHours() + 1;
    let day = hour === 0 ? 1 : 0;
    for (let i = 0; i < 4; i++) {
      this.hourList.push(this.weather.forecast.forecastday[day].hour[hour]);
      if(hour === 23) {
        hour = 0;
        day++;
      } else {
        hour++;
      }
    }
  }

  getView(index: number) {
    this.router.navigate([`/view/${index}`]);
  }
}
