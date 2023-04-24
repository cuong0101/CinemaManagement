import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SideBarMenuComponent } from './navigation/side-bar-menu/side-bar-menu.component';
import { BodyComponent } from './navigation/body/body.component';
import { MstUsersComponent } from './business/mst-users/mst-users.component';
import { SublevelMenuComponent } from './navigation/side-bar-menu/submenu';
import { TopBarComponent } from './navigation/top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { OverlayModule } from '@angular/cdk/overlay';
 import { CdkMenuModule } from '@angular/cdk/menu';
import { SeatRankViewComponent } from './seat-rank/seat-rank-view/seat-rank-view.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideBarMenuComponent,
    BodyComponent,
    MstUsersComponent,
    SublevelMenuComponent,
    TopBarComponent,
    SeatRankViewComponent
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
    OverlayModule,
    CdkMenuModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function tokenGetter() {
  return localStorage.getItem("jwt");
}


