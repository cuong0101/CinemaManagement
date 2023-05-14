import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RankPoints } from '../_interfaces/rankpoints';

@Injectable({
  providedIn: 'root'
})
export class RankpointsService {
  baseUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<RankPoints[]>(this.baseUrl + "MstRankPoints/getAll");
  }

  createOrEdit(user?: RankPoints){
    return this.httpClient.post(this.baseUrl + "MstRankPoints/createOrEdit", user);
  }
  delete(id?: number){
    return this.httpClient.post(this.baseUrl + `MstRankPoints/deleted`, id);
  }
}
