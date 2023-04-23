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
    this.httpClient.get("https://localhost:44389/api/users").subscribe(re => this.users = re);
    
    console.log(this.cInvalidLogin);
    
  }
  onToggleSideNav(sidenav: SideNavToggle){
    this.isSideNavCollapsed = sidenav.collapsed;
    this.screenWidth = sidenav.screenWidth
  }}
