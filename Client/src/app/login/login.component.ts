import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Login } from '../_interfaces/login';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public output: any;
  loginParam?: Login;
  username!: string;
  password!: string;
  invalidLogin?: boolean;
  constructor(
    private loginService: AccountService,
    private toastr: ToastrService,
    private route: Router
    ) { }
    @Output() changeLoginService = new EventEmitter<boolean>();
  ngOnInit() {
  }
  login(){
    let params = {
      username: this.username,
      password: this.password
    }
    this.output = this.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/);
   
    if((params.password == null) ||(this.username == null))
    {
      this.toastr.warning("Bạn phải nhập đủ tài khoản và mật khẩu");
    }
    else if(params.password.length <6)
    {
      this.toastr.warning("mật khẩu phải lớn hơn 6 ký tự");
    }
    else if(this.output == null)
    {
      console.log(this.output);
      /*Giải thích:
        - `^` : Bắt đầu chuỗi
        - `(?=.*[A-Za-z])` : Positive lookahead để đảm bảo tồn tại ít nhất một chữ cái
        - `(?=.*\d)` : Positive lookahead để đảm bảo tồn tại ít nhất một số
        - `[A-Za-z\d]{6,12}` : Ký tự chữ hoặc số xuất hiện từ 6 đến 12 lần
        - `$` : Kết thúc chuỗi */
      this.toastr.warning("Mật khẩu không đúng định dạng");
    }
    else{
      this.invalidLogin = true;
      this.loginParam = params;
      this.loginService.login(this.loginParam).subscribe({
      next: (reponse) => {
      const token = reponse.accessToken;
      localStorage.setItem("jwt", token);
      this.route.navigate(["/user"]);
      console.log(this.invalidLogin);
      this.invalidLogin = false;
      this.changeLoginService.emit(this.invalidLogin);
        //this.route.navigateByUrl("/nav")
    },
    error: (error) => {this.toastr.warning("Tài khoản hoặc mật khẩu không chính xác")
    }
    })
    }
    
  }

}
