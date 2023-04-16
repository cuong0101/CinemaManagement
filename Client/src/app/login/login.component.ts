import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Login } from '../_interfaces/login';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
//import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginParam?: Login;
  username!: string;
  password!: string;
  invalidLogin?: boolean;
  constructor(
    private loginService: AccountService,
    //private toastr: ToastrService,
    private route: Router
    ) { }

  ngOnInit() {
  }
  login(){
    let params = {
      username: this.username,
      password: this.password
    }
    this.loginParam = params;
    this.loginService.login(this.loginParam).subscribe({
    next: (reponse) => {
      const token = reponse.token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.route.navigate(["/"]);
      //this.route.navigateByUrl("/nav")
    },
    error: (error) => {//this.toastr.warning("Tài khoản hoặc mật khẩu không chính xác")
    },
    complete: () => {

    }
    })
  }

}
