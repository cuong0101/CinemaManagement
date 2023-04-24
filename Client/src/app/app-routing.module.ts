import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {SeatRankViewComponent } from './seat-rank/seat-rank-view/seat-rank-view.component';
import { MstUsersComponent } from './business/mst-users/mst-users.component';
const routes: Routes = [
  {path: "", redirectTo:"login", pathMatch:"full"},
  {path: "login", component:LoginComponent},
  {path: "seat-rank", component:SeatRankViewComponent},
  {path: "user", component: MstUsersComponent, }
];

@NgModule({
imports: [
  RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
