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

    getMovieByStartTime(startTime: any){
      return this.httpClient.get(this.baseUrl + "Booking/GetMovieByStartTime?startTime=" + startTime);
    }
    getShowTimeByMovieAndDate(startTime:any, movieId:number){
      return this.httpClient.get(this.baseUrl + "Booking/GetShowTimeByMovieAndDate?startTime=" + startTime + "&idmovie=" + movieId);
    }
    GetTicketByShowtimeAdmin(idshow: number){
      return this.httpClient.get(this.baseUrl + "Booking/GetTicketByShowtimeAdmin?idshow=" + idshow);
    }
}
