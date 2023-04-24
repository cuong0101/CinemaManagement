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
    return this.httpClient.get<UserManagement[]>(this.baseUrl + "users/getAll");
  }

  createOrEdit(user: UserManagement){
    return this.httpClient.post(this.baseUrl + "users/createOrEdit", user);
  }
  delete(id: number){
    return this.httpClient.delete(this.baseUrl + `users/deleted/${id}`)
  }

}
