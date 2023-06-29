import { MstSeatranksComponent } from './mst-seatranks/mst-seatranks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BodyComponent } from './navigation/body/body.component';
import { MstUsersComponent } from './business/mst-users/mst-users.component';
import { MstMovieComponent } from './business/mst-movie/mst-movie.component';
import { MstCustomersComponent } from './business/mst-customer/mst-customer.component';
import { MstRoomComponent } from './business/mst-room/mst-room.component';
import {PolicyGiftComponent } from './business/policy-gift/policy-gift.component';
import { MstRankPointsComponent } from './business/mst-rank-points/mst-rank-points.component';
import { MstPromotionComponent } from './business/mst-promotion/mst-promotion.component';
import { MstShowTimeComponent } from './business/mst-show-time/mst-show-time.component';
import { BookTicketsComponent } from './business/book-tickets/book-tickets.component';
import { ShowTimeCustomerComponent } from './business/show-time-customer/show-time-customer.component';
import { MstFoodComponent } from './business/mst-food/mst-food.component';
import { HistoryChangeGiftComponent } from './business/history-change-gift/history-change-gift.component';
import { MstCulmulativeComponent } from './business/mst-cumulative/mst-culmulative.component';
import { ReportFoodComponent } from './business/report-food/report-food.component';
import { ReportMovieComponent } from './business/report-movie/report-movie.component';
const routes: Routes = [
  {path: "", redirectTo:"login", pathMatch:"full"},
  {path: "login", component:LoginComponent},
  {path: "nav", component:BodyComponent},
  {path: "user", component: MstUsersComponent},
  {path: "mstmovie", component: MstMovieComponent},
  {path: "mstfood", component: MstFoodComponent},
  {path: "mstshowtime", component: MstShowTimeComponent},
  {path: "room", component: MstRoomComponent},
  {path: 'policyRankPoints',  component: MstRankPointsComponent },
  {path: 'promo', children: [
      { path: 'promotion', component: MstPromotionComponent },
      { path: 'history', component: HistoryChangeGiftComponent },
      {path: "policygift", component: PolicyGiftComponent}
    ]
  },
  {path: "bookTickets", component: BookTicketsComponent},
  {path: "customer", component: MstCustomersComponent},
  //{path: "rankpoints", component: MstRankPointsComponent},
  {path: "seatrank", component: MstSeatranksComponent},
  {path: "showtime-customer", component: ShowTimeCustomerComponent},
  {path: "report", children:[
    {path: "report-food", component: ReportFoodComponent},
    {path: "report-movie", component: ReportMovieComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
