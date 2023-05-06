import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeatRank } from '../_interfaces/seatrank';

@Injectable({
  providedIn: 'root'
})
export class SeatRanksService {
  baseUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<SeatRank[]>(this.baseUrl + "SeatRank/getAll");
  }

  createOrEdit(seatrank?: SeatRank){
    return this.httpClient.post(this.baseUrl + "SeatRank/createOrEdit", seatrank);
  }
  delete(id?: number){
    return this.httpClient.delete(this.baseUrl + `SeatRank/${id}`)
  }

}
