import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../_interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  baseUrl = "https://localhost:44389/api/cus/";

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<Customer[]>(this.baseUrl + "Customer/getAll");
  }
  createOrEdit(customer?: Customer){
    return this.httpClient.post(this.baseUrl + "Customer/CreateOrEdit", customer);
  }
  delete(id?: number){
    return this.httpClient.post(this.baseUrl + `Customer/Delete?id=${id}`, id);
  }
}
