import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {MainComponent} from './components/main/main.component';
import {ViewItemComponent} from './components/view-item/view-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import localeRu from '@angular/common/locales/ru'
import {registerLocaleData} from "@angular/common";
import {NgbDropdown, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ViewItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbDropdownModule
  ],
  providers: [
    NgbDropdown,
    {provide: LOCALE_ID, useValue: 'ru'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
