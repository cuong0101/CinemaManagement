import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserManagement } from '../_interfaces/usermanagement';
import { MstMovieComponent } from '../business/mst-users/mst-movie/mst-movie.component';
import { MstMovieManagement } from '../_interfaces/moviemanagement';

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
    return this.httpClient.post(this.baseUrl + "Movie/CreateOrEdit", movie);
  }
  delete(id?: number){
    return this.httpClient.post(this.baseUrl + `Movie/Delete?id=${id}`, id);
  }

}