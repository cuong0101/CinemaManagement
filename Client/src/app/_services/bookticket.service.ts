import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { GiftChoose } from '../_interfaces/_IBookTickets/GiftChoose';

@Injectable({
  providedIn: 'root'
})
export class BookticketService {
  baseUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) {}

   getTicketByShowTime()
    {
      return this.httpClient.get(this.baseUrl + "Booking/GetTicketByShowtimeAdmin");
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
    GetTicketByShowtimeAdmin(idshow?: number){
      let id = idshow == undefined ? null: idshow
      return this.httpClient.get(this.baseUrl + "Booking/GetTicketByShowtimeAdmin?idshow=" + id );
    }

    getMovieInfor(startTime: any, movieName: string | null){
      let startdate = startTime == null || startTime == undefined ? '' : format(new Date(startTime), 'yyyy-MM-dd');
      let name = movieName == null || movieName == undefined ? '':movieName
      return this.httpClient.get(this.baseUrl + "Booking/getMovieInfor?startTime=" + startdate + "&namemovie="+name??"");
    }

    getChangeGift(){
      return this.httpClient.get<GiftChoose[]>(this.baseUrl + "Booking/getChangeGift");
    }
}
