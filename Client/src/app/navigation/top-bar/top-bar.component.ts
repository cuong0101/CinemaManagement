import { Component, HostListener, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { Router } from '@angular/router';
@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth = 0
  canShowSearch = false;
  invalidLogin?: boolean;
  constructor(
    private logoutService: AccountService,
    private route: Router
    ) 
    {
   
   }

   @Output() changeLogoutService = new EventEmitter<boolean>();
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearch(window.innerWidth);
  }
  ngOnInit() {
    this.checkCanShowSearch(window.innerWidth);
  }

  getHeaderClass(): string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth >768){
      styleClass = 'head-trimmed';
    }
    else{
      styleClass = 'head-md-screen'
    }
    return styleClass;
  }
  checkCanShowSearch(innerWidth: number){
    if(innerWidth < 845) this.canShowSearch = true;
    else this.canShowSearch = false;
  }
  
  logout() {
    this.logoutService.logout();
    this.route.navigate(["/login"]);
    this.invalidLogin = true;
    this.changeLogoutService.emit(this.invalidLogin);
  }
}
