import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MstShowtimeManagement } from "../_interfaces/showtimemanagement";
import { MstShowTimeComponent } from "../business/mst-show-time/mst-show-time.component";

@Injectable({
    providedIn: 'root'
  })
  export class MstShowTimeService {
    baseUrl = "https://localhost:44389/api/";
  
    constructor(private httpClient: HttpClient) { }
  
    getAll(){
      return this.httpClient.get<MstShowtimeManagement[] | undefined>(this.baseUrl + "ShowTime/GetAll");
    }
  
    createOrEdit(movie?: MstShowtimeManagement){
      return this.httpClient.post(this.baseUrl + "ShowTime/CreateOrEdit", movie, {headers: new HttpHeaders({ "Content-Type": "application/json"})});
    }
    delete(id?: number){
      return this.httpClient.post(this.baseUrl + `ShowTime/Delete?id=${id}`, id);
    }
  
  }