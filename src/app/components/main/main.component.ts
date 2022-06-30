import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../core/service/weather.service";
import {Forecast, hour} from "../../core/interface/forecast";
import {Router} from "@angular/router";
import {PositionService} from "../../core/service/position.service";
import {Select} from "../../core/interface/select";

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
  isNight = false;
  select: Select;
  selectItems: Select[] = [];

  constructor(
    public weatherService: WeatherService,
    public router: Router,
    public position: PositionService
  ) {
    setInterval(() => {
      this.date = new Date();
    }, 10000);
  }

  ngOnInit(): void {
    this.loadSelect();
  }

  loadSelect() {
    this.weatherService.getIp().then(res => {
      this.selectItems.push(
        {
          name: 'Текущее местоположение',
          value: String(res.latitude + ',' + res.longitude)
        }
      );
      const local: Select = JSON.parse(String(localStorage.getItem('location'))) as Select;
      const list: Select[] = JSON.parse(String(localStorage.getItem('locationList')));
      this.position.setSelect(local ? local : this.selectItems[0]);
      if (list) {
        for (let item of list) {
          if (item.name !== 'Текущее местоположение') {
            this.selectItems.push(item);
          }
        }
      }
      this.position.addSelectList(this.selectItems);
      this.select = this.position.getSelect();
      this.loadData();
    });
  }

  loadData() {
    this.load = true;
    this.weatherService.getForecastWeather(this.select).then(res => {
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
    let hourOut = this.weather.forecast.forecastday[0].astro.sunrise.split(':')[0];
    const minOut = this.weather.forecast.forecastday[0].astro.sunrise.split(':')[1].split(' ')[0];
    const stateOut = this.weather.forecast.forecastday[0].astro.sunrise.split(':')[1].split(' ')[1];
    let hourIn = this.weather.forecast.forecastday[0].astro.sunset.split(':')[0];
    const minIn = this.weather.forecast.forecastday[0].astro.sunset.split(':')[1].split(' ')[0];
    const stateIn = this.weather.forecast.forecastday[0].astro.sunset.split(':')[1].split(' ')[1];
    hourOut = stateOut === 'AM' ? hourOut : hourOut + 12;
    hourIn = stateIn === 'AM' ? hourIn : String(+hourIn + 12);
    const rise = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), +hourOut, +minOut, 0);
    const sunrise = rise.getTime();
    const set = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), +hourIn, +minIn, 0);
    const sunset = set.getTime();
    const toTime = this.date.getTime();
    this.isNight = toTime < sunrise || toTime > sunset;
  }

  lastHours() {
    let hour = this.date.getHours() === 23 ? 0 : this.date.getHours() + 1;
    let day = hour === 0 ? 1 : 0;
    for (let i = 0; i < 4; i++) {
      this.hourList.push(this.weather.forecast.forecastday[day].hour[hour]);
      if (hour === 23) {
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

  selectValue(item: Select) {
    this.select = item;
    this.position.setSelect(item);
    this.loadData();
  }
}
