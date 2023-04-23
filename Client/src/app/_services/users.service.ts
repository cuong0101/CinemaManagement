import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserManagement } from '../_interfaces/usermanagement';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<UserManagement[]>(this.baseUrl + "users");
  }

}
