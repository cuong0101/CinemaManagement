import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:44389/api/";
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private httpClient: HttpClient) { }

  login(model: any){
    return this.httpClient.post<User>(this.baseUrl + "account/login", model).pipe(map((reponse: User)=> {
      const user = reponse;
      if(user){
        localStorage.setItem("user", JSON.stringify(user));
        this.currentUserSource.next(user);
      }
    }));
  }
  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }
}
