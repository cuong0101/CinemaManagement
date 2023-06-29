import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import {  } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SideBarMenuComponent } from './navigation/side-bar-menu/side-bar-menu.component';
import { BodyComponent } from './navigation/body/body.component';
import { MstUsersComponent } from './business/mst-users/mst-users.component';
import { SublevelMenuComponent } from './navigation/side-bar-menu/submenu';
import { TopBarComponent } from './navigation/top-bar/top-bar.component';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import * as agGridAngular from 'ag-grid-angular';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateOrEditUserComponent } from './business/mst-users/create-or-edit-user/create-or-edit-user.component';
import { MstSeatranksComponent } from './mst-seatranks/mst-seatranks.component';
import { CreateOrEditSeatrankComponent } from './mst-seatranks/create-or-edit-seatrank/create-or-edit-seatrank.component';
import { MstMovieComponent } from './business/mst-movie/mst-movie.component';
import { MstCustomersComponent } from './business/mst-customer/mst-customer.component';
import { CreateOrEditMovieComponent } from './business/mst-movie/create-or-edit-movie/create-or-edit-movie.component';
import { CreateOrEditCustomerComponent } from './business/mst-customer/create-or-edit-customer/create-or-edit-customer.component';
import { MstRoomComponent } from './business/mst-room/mst-room.component';
import { PolicyGiftComponent } from './business/policy-gift/policy-gift.component';
import { CreateOrEditRoomComponent } from './business/mst-room/create-or-edit-room/create-or-edit-room.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// import { FileUploadModule } from 'ng2-file-upload';
import { MstRankPointsComponent } from './business/mst-rank-points/mst-rank-points.component';
import { CreateOrEditMstRankPointsComponent } from './business/mst-rank-points/create-or-edit-mst-rank-points/create-or-edit-mst-rank-points.component';

import { MstPromotionComponent } from './business/mst-promotion/mst-promotion.component';
import { CreateOrEditPromotionComponent } from './business/mst-promotion/create-or-edit-promotion/create-or-edit-promotion.component';
import { CreateOrEditPromotionDetailComponent } from './business/mst-promotion/create-or-edit-promotion-detail/create-or-edit-promotion-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { MstShowTimeComponent } from './business/mst-show-time/mst-show-time.component';
import { CreateOrEditMstShowTimeComponent } from './business/mst-show-time/create-or-edit-mst-show-time/create-or-edit-mst-show-time.component';
import { BookTicketsComponent } from './business/book-tickets/book-tickets.component';
import { CreateBookTicketsComponent } from './business/book-tickets/create-book-tickets/create-book-tickets.component';
import { ShowTimeCustomerComponent } from './business/show-time-customer/show-time-customer.component';
import { ReportRevenueComponent } from './business/report-revenue/report-revenue.component';
import { CreateOrEditBenefitsComponent } from './business/mst-rank-points/create-or-edit-benefits/create-or-edit-benefits.component';
// import { GridTableComponent } from './base/base_grid_table/grid-table/grid-table.component';
// import { GridPaginationComponent } from './base/base_grid_table/grid-pagination/grid-pagination.component';
import { UploadComponent } from './upload/upload.component';
import { CreateOrEditPolicyGiftComponent } from './business/policy-gift/create-or-edit-policy-gift/create-or-edit-policy-gift.component';
import { MstFoodComponent } from './business/mst-food/mst-food.component';
import { CreateOrEditFoodComponent } from './business/mst-food/create-or-edit-food/create-or-edit-food.component';
import { ImageFormatterComponent } from './business/mst-food/ImageFormater.component';
import { OrderFoodComponent } from './business/book-tickets/create-book-tickets/order-food/order-food.component';
import { HistoryChangeGiftComponent } from './business/history-change-gift/history-change-gift.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideBarMenuComponent,
    BodyComponent,
    SublevelMenuComponent,
    TopBarComponent,
    SpinnerComponent,
    MstUsersComponent,
    CreateOrEditUserComponent,
    MstSeatranksComponent,
    CreateOrEditSeatrankComponent,
    MstMovieComponent,
    CreateOrEditMovieComponent,
    MstCustomersComponent,
    CreateOrEditCustomerComponent,
    MstRoomComponent,
    CreateOrEditRoomComponent,
    MstRankPointsComponent,
    CreateOrEditMstRankPointsComponent,
    MstPromotionComponent,
    CreateOrEditPromotionComponent,
    CreateOrEditPromotionDetailComponent,
    MstShowTimeComponent,
    CreateOrEditMstShowTimeComponent,
    BookTicketsComponent,
    CreateBookTicketsComponent,
    ShowTimeCustomerComponent,
    ReportRevenueComponent,
    CreateOrEditBenefitsComponent,
    PolicyGiftComponent,
    MstFoodComponent,
    CreateOrEditFoodComponent,
    ImageFormatterComponent,
    //GridTableComponent,
    //GridPaginationComponent,
      UploadComponent,
    PolicyGiftComponent,
    CreateOrEditPolicyGiftComponent,
    OrderFoodComponent,
    HistoryChangeGiftComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44389"],
        disallowedRoutes: []
      }
    }),
    AgGridModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    // FileUploadModule,
    //SharedModule,
    ToastrModule.forRoot()
  ],
  providers:  [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function tokenGetter() {
  return localStorage.getItem("jwt");
}
