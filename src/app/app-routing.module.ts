import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {ViewItemComponent} from "./components/view-item/view-item.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'view/:id', component: ViewItemComponent},
  { path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
