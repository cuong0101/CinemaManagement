import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PolicyGift } from '../_interfaces/policygift';

@Injectable({
  providedIn: 'root'
})
export class PolicyGiftsService {
  baseUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<PolicyGift[]>(this.baseUrl + "PolicyGifts/getAll");
  }

  getById(id?: number){
    return this.httpClient.get<PolicyGift[]>(this.baseUrl + `PolicyGifts/${id}`);
  }
  createOrEdit(policygift?: PolicyGift){
    return this.httpClient.post(this.baseUrl + "PolicyGifts/createOrEdit", policygift);
  }
  delete(id?: number){
    return this.httpClient.delete(this.baseUrl + `PolicyGifts/delete/${id}`)
  }

}
