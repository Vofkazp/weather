import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WeatherService} from "../../core/service/weather.service";
import {Search, Select} from "../../core/interface/select";
import {PositionService} from "../../core/service/position.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search: FormGroup;
  searchList: Search[] = [];
  saveList: Select[] = [];

  constructor(
    public fb: FormBuilder,
    public weatherService: WeatherService,
    public positionService: PositionService
  ) { }

  ngOnInit(): void {
    this.saveList = this.positionService.getSelectList();
    this.initForm();
  }

  initForm() {
    this.search = this.fb.group({
      search: ''
    });
    this.search.get('search')?.valueChanges.subscribe(res=>{
      if(res !== '') {
        this.searchData(res);
      }
    });
  }

  searchData(search: string) {
    this.weatherService.searchCity(search).then(res=>{
      this.searchList = res;
    })
  }

  add(item: Search) {
    this.positionService.setSelectList({
      name: item.region + ', ' + item.name,
      value: item.lat + ',' + item.lon
    });
    this.saveList = this.positionService.getSelectList();
  }

  remove(item: Select) {
    this.positionService.deleteSelectList(item);
    this.saveList = this.positionService.getSelectList();
  }
}
