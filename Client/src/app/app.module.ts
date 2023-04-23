import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SideBarMenuComponent } from './navigation/side-bar-menu/side-bar-menu.component';
import { BodyComponent } from './navigation/body/body.component';
import { MstUsersComponent } from './business/mst-users/mst-users.component';
import { SublevelMenuComponent } from './navigation/side-bar-menu/submenu';
import { TopBarComponent } from './navigation/top-bar/top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
// import { GridTableComponent } from './base/base_grid_table/grid-table/grid-table.component';
// import { GridPaginationComponent } from './base/base_grid_table/grid-pagination/grid-pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideBarMenuComponent,
    BodyComponent,
    MstUsersComponent,
    SublevelMenuComponent,
    TopBarComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function tokenGetter() {
  return localStorage.getItem("jwt");
}
