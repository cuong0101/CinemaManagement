import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookticketService {
  baseUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) {}

   getTicketByShowTime()
    {
      return this.httpClient.get(this.baseUrl + "ShowTime/GetTicketByShowTime");
    }

    updateTicketStatus(tickets: number[]){
      return this.httpClient.post(this.baseUrl + "ShowTime/UpdateTicketStatus", tickets);
    }
}
