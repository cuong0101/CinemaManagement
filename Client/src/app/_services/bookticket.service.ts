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
      return this.httpClient.get(this.baseUrl + "Booking/GetTicketByShowTime");
    }

    updateTicketStatus(tickets: number[]){
      return this.httpClient.post(this.baseUrl + "Booking/UpdateTicketStatus", tickets);
    }

    getMovieByStartTime(startTime:string){
      return this.httpClient.get(this.baseUrl + "Booking/GetMovieByStartTime?startTime=" + startTime.replace(/\//g, "%2F"));
    }
    getShowTimeByMovieAndDate(startTime:string, movieId:number){
      return this.httpClient.get(this.baseUrl + "Booking/GetShowTimeByMovieAndDate?startTime=" + startTime.replace(/\//g, "%2F") + "&idmovie=" + movieId);
    }
}
