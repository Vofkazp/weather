import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environment} from "../../../environments/environment";
import {Forecast} from "../interface/forecast";
import {Search} from "../interface/select";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getIp() {
    return firstValueFrom(this.http.get<any>(`https://ipwho.is/`));
  }

  searchCity(search: string) {
    return firstValueFrom(this.http.get<Search[]>(`${environment.apiSearch}&q=${search}`));
  }

  getForecastWeather(coord: any) {
    return firstValueFrom(this.http.get<Forecast>(`${environment.apiForecast}&q=${coord.value}&days=10&aqi=yes&lang=ru&alerts=yes`));
  }
}
