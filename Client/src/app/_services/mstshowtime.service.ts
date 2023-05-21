import { Injectable } from "@angular/core";
import { MstShowtimeManagement } from "../_interfaces/ShowTime/showtimemanagement";
import { MstShowTimeComponent } from "../business/mst-show-time/mst-show-time.component";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { MstMovieManagement } from "../_interfaces/moviemanagement";
import { Room } from "../_interfaces/room";
import { CreateOrEditShowTime } from "../_interfaces/ShowTime/CreateOrEditShowTime";

@Injectable({
    providedIn: 'root'
  })
  export class MstShowTimeService {
    baseUrl = "https://localhost:44389/api/";
  
    constructor(private httpClient: HttpClient) { }
  
    getAll(){
      return this.httpClient.get<MstShowtimeManagement[]>(this.baseUrl + "ShowTime/GetAll");
    }
  
    createOrEdit(movie?: CreateOrEditShowTime){
      return this.httpClient.post(this.baseUrl + "ShowTime/CreateOrEdit", movie);
    }

    delete(id?: number){
      return this.httpClient.delete(this.baseUrl + `ShowTime/${id}`);
    }

    getAllMovie()
    {
      return this.httpClient.get<MstMovieManagement[]>(this.baseUrl + "ShowTime/GetAllMovie");
    }

    getAllRoom()
    {
      return this.httpClient.get<Room[]>(this.baseUrl + "ShowTime/GetAllRoom");
    }
  
  }