import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seat } from '../_interfaces/seat';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {
  baseUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<Seat[]>(this.baseUrl + "Seat/getAll");
  }

  createOrEdit(seat?: Seat){
    return this.httpClient.post(this.baseUrl + "Seat/createOrEdit", seat);
  }
  delete(id?: number){
    return this.httpClient.delete(this.baseUrl + `Seat/delete/${id}`)
  }

}
