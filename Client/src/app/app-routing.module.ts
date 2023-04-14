import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MstUsersComponent } from './business/mst-users/mst-users.component';

const routes: Routes = [
  {path: "", redirectTo:"login", pathMatch:"full"},
  {path: "login", component:LoginComponent},
  {path: "user", component: MstUsersComponent}
];

@NgModule({
imports: [
  RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
