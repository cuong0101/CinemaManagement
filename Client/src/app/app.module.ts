import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
<<<<<<< Updated upstream
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
=======
//import { JwtModule } from '@auth0/a';
import { OverlayModule } from '@angular/cdk';
 import { CdkMenuModule } from '@angular/cdk/menu';

>>>>>>> Stashed changes

@NgModule({
  declarations: [	
    AppComponent,
    NavigationComponent,
    LoginComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
<<<<<<< Updated upstream
=======
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     allowedDomains: ["localhost:44389"],
    //     disallowedRoutes: []
    //   }
    // }),
    OverlayModule,
    //CdkMenuModule,
>>>>>>> Stashed changes
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
