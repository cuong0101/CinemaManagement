import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Client';
  users: any;
  isSideNavCollapsed = false;
  screenWidth = 0
  cInvalidLogin:boolean = true;
  changeLoginServiceHandle(invalidLogin:boolean){
    this.cInvalidLogin = invalidLogin;
  }
  changeLogoutServiceHandle(invalidLogin:boolean){
    this.cInvalidLogin = invalidLogin;
  }
  

  constructor(private httpClient: HttpClient){

  }
  ngOnInit(): void {
    console.log(this.cInvalidLogin);
    console.log(localStorage.getItem("jwt"));

    if( localStorage.getItem("jwt") == null)
    {
      this.cInvalidLogin = true;
    }
    else{
      this.cInvalidLogin = false;
    }
  }
  onToggleSideNav(sidenav: SideNavToggle){
    this.isSideNavCollapsed = sidenav.collapsed;
    this.screenWidth = sidenav.screenWidth
  }}
