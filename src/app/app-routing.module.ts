import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {ViewItemComponent} from "./components/view-item/view-item.component";
import {SearchComponent} from "./components/search/search.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'view/:id', component: ViewItemComponent},
  {path: 'search', component: SearchComponent},
  { path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
