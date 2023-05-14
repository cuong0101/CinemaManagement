import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MstMovieManagement } from '../_interfaces/moviemanagement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MstMovieService {
  baseUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<MstMovieManagement[] | undefined>(this.baseUrl + "Movie/GetAll");
  }

  createOrEdit(movie?: MstMovieManagement){
    return this.httpClient.post(this.baseUrl + "Movie/CreateOrEdit", movie, {headers: new HttpHeaders({ "Content-Type": "application/json"})});
  }
  
  delete(id?: number){
    return this.httpClient.post(this.baseUrl + `Movie/Delete?id=${id}`, id);
  }

}