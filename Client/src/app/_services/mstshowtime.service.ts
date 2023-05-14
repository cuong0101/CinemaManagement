import { Injectable } from "@angular/core";
import { MstShowtimeManagement } from "../_interfaces/showtimemanagement";
import { MstShowTimeComponent } from "../business/mst-show-time/mst-show-time.component";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { MstMovieManagement } from "../_interfaces/moviemanagement";

@Injectable({
    providedIn: 'root'
  })
  export class MstShowTimeService {
    baseUrl = "https://localhost:44389/api/";
  
    constructor(private httpClient: HttpClient) { }
  
    getAll(){
      let res = this.httpClient.get(this.baseUrl + "ShowTime/GetAll");
      return res;
    }
  
    createOrEdit(movie?: MstShowtimeManagement){
      return this.httpClient.post(this.baseUrl + "ShowTime/CreateOrEdit", movie);
    }

    delete(id?: number){
      return this.httpClient.delete(this.baseUrl + `ShowTime/${id}`);
    }

    getAllMovie()
    {
      return this.httpClient.get<MstMovieManagement[]>(this.baseUrl + "ShowTime/GetAllMovie");
    }
  
  }