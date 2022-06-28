import { Injectable } from '@angular/core';
import {Select} from "../interface/select";
import {SELECT} from '../collection/selectItem'

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  selectItems: Select[] = SELECT;

  select: Select;
  constructor() {
    const local: Select = JSON.parse(String(localStorage.getItem('location'))) as Select;
    this.setSelect(local ? local : this.selectItems[0]);
  }

  getSelect() {
    return this.select;
  }

  setSelect(select: Select) {
    localStorage.setItem('location', JSON.stringify(select));
    this.select = select;
  }
}
