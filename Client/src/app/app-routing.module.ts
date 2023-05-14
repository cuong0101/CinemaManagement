import { MstSeatranksComponent } from './mst-seatranks/mst-seatranks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BodyComponent } from './navigation/body/body.component';
import { MstUsersComponent } from './business/mst-users/mst-users.component';
import { MstMovieComponent } from './business/mst-movie/mst-movie.component';
import { MstCustomersComponent } from './business/mst-customer/mst-customer.component';
const routes: Routes = [
  {path: "", redirectTo:"test", pathMatch:"full"},
  {path: "login", component:LoginComponent},
  {path: "nav", component:BodyComponent},
  {path: "user", component: MstUsersComponent},
  {path: "mstmovie", component: MstMovieComponent},

  {path: "customer", component: MstCustomersComponent},
  {path: "seatrank", component: MstSeatranksComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
