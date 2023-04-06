import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:44389/api/"
  constructor(private httpClient: HttpClient) { }

  login(model: any){
    this.httpClient.post(this.baseUrl + "/account/login", model);
  }
}
