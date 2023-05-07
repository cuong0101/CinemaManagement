import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  } from '@angular/platform-browser/animations';
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
import { ToastrModule } from 'ngx-toastr';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateOrEditUserComponent } from './business/mst-users/create-or-edit-user/create-or-edit-user.component';
import { MstSeatranksComponent } from './mst-seatranks/mst-seatranks.component';
import { CreateOrEditSeatrankComponent } from './mst-seatranks/create-or-edit-seatrank/create-or-edit-seatrank.component';
import { MstMovieComponent } from './business/mst-users/mst-movie/mst-movie.component';
import { MatPaginator } from '@angular/material/paginator';

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
    //GridTableComponent,
    //GridPaginationComponent,
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
    ToastrModule.forRoot(),
    AgGridModule,
    ModalModule.forRoot(),
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
