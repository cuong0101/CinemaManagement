import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Client';
  users: any;
  constructor(private httpClient: HttpClient){

  }
  ngOnInit(): void {
    this.httpClient.get("https://localhost:44389/api/users").subscribe(re => this.users = re)
  }
}
