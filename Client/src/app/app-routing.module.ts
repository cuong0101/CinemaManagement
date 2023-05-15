import { MstSeatranksComponent } from './mst-seatranks/mst-seatranks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BodyComponent } from './navigation/body/body.component';
import { MstUsersComponent } from './business/mst-users/mst-users.component';
import { MstMovieComponent } from './business/mst-movie/mst-movie.component';
import { MstCustomersComponent } from './business/mst-customer/mst-customer.component';
import { MstRoomComponent } from './business/mst-room/mst-room.component';
import { MstRankPointsComponent } from './business/mst-rank-points/mst-rank-points.component';
import { MstPromotionComponent } from './business/mst-promotion/mst-promotion.component';
import { MstShowTimeComponent } from './business/mst-show-time/mst-show-time.component';
import { BookTicketsComponent } from './business/book-tickets/book-tickets.component';
const routes: Routes = [
  {path: "", redirectTo:"login", pathMatch:"full"},
  {path: "login", component:LoginComponent},
  {path: "nav", component:BodyComponent},
  {path: "user", component: MstUsersComponent},
  {path: "mstmovie", component: MstMovieComponent},
  {path: "mstshowtime", component: MstShowTimeComponent},
  {path: "room", component: MstRoomComponent},
  {path: 'promo', children: [
      { path: 'promotion', component: MstPromotionComponent },
    ]
  },
  {path: "bookTickets", component: BookTicketsComponent},
  {path: "customer", component: MstCustomersComponent},
  {path: "rankpoints", component: MstRankPointsComponent},
  {path: "seatrank", component: MstSeatranksComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
