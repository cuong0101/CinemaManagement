import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './login/login.component';

import { SideBarMenuComponent } from './navigation/side-bar-menu/side-bar-menu.component';
import { BodyComponent } from './navigation/body/body.component';
import { MstUsersComponent } from './business/mst-users/mst-users.component';
import { SublevelMenuComponent } from './navigation/side-bar-menu/submenu';
import { TopBarComponent } from './navigation/top-bar/top-bar.component';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateOrEditUserComponent } from './business/mst-users/create-or-edit-user/create-or-edit-user.component';
// import { GridTableComponent } from './base/base_grid_table/grid-table/grid-table.component';
// import { GridPaginationComponent } from './base/base_grid_table/grid-pagination/grid-pagination.component';

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
    CreateOrEditUserComponent
    //GridTableComponent,
    //GridPaginationComponent
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
    ModalModule.forRoot()
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
