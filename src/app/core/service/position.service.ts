import {Injectable} from '@angular/core';
import {Select} from "../interface/select";
import {WeatherService} from "./weather.service";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  selectList: Select[] = [];
  select: Select;

  constructor(
    public weatherService: WeatherService
  ) {
    this.weatherService.getIp().then(res => {
      this.selectList.push(
        {
          name: 'Текущее местоположение',
          value: String(res.latitude + ',' + res.longitude)
        }
      );
    });
    const local: Select = JSON.parse(String(localStorage.getItem('location'))) as Select;
    this.setSelect(local ? local : this.selectList[0]);
    const list: Select[] = JSON.parse(String(localStorage.getItem('locationList')));
    if (list) {
      for (let item of list) {
        if (item.name !== 'Текущее местоположение') {
          this.selectList.push(item);
        }
      }
    }
  }

  getSelectList() {
    return this.selectList;
  }

  setSelectList(select: Select) {
    this.selectList.push(select);
    localStorage.setItem('locationList', JSON.stringify(this.selectList));
  }

  deleteSelectList(select: Select) {
    for (let i = 0; i < this.selectList.length; i++) {
      if (this.selectList[i].name === select.name) {
        this.selectList.splice(i, 1);
      }
    }
    localStorage.setItem('locationList', JSON.stringify(this.selectList));
  }

  getSelect() {
    return this.select;
  }

  setSelect(select: Select) {
    localStorage.setItem('location', JSON.stringify(select));
    this.select = select;
  }
}
