import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environment} from "../../../environments/environment";
import {Forecast} from "../interface/forecast";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getCurrentWeather() {
    return firstValueFrom(this.http.get(`${environment.apiCurrent}&q=47.696177,35.350919&aqi=yes&lang=ru`));
  }

  getForecastWeather() {
    return firstValueFrom(this.http.get<Forecast>(`${environment.apiForecast}&q=47.696177,35.350919&days=10&aqi=yes&lang=ru&alerts=yes`));
  }
}
