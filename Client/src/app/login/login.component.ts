import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username: string | undefined;
password: string | undefined;
  constructor(private loginService: AccountService) { }

  ngOnInit() {
  }
  login(){
    //this.loginService.login()
  }

}
