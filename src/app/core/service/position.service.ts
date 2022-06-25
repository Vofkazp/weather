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
    this.setSelect(this.selectItems[0]);
  }

  getSelect() {
    return this.select;
  }

  setSelect(select: Select) {
    this.select = select;
  }
}
