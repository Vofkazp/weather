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

  getIp() {
    return firstValueFrom(this.http.get<any>(`http://ipwho.is/`));
  }

  getForecastWeather(coord: any) {
    return firstValueFrom(this.http.get<Forecast>(`${environment.apiForecast}&q=${coord.value}&days=10&aqi=yes&lang=ru&alerts=yes`));
  }
}
