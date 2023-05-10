import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../_interfaces/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  baseUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<Room[]>(this.baseUrl + "Room/getAll");
  }

  getById(id?: number){
    return this.httpClient.get<Room[]>(this.baseUrl + `Room/${id}`);
  }
  createOrEdit(room?: Room){
    return this.httpClient.post(this.baseUrl + "Room/createOrEdit", room);
  }
  delete(id?: number){
    return this.httpClient.delete(this.baseUrl + `Room/delete/${id}`)
  }

}
