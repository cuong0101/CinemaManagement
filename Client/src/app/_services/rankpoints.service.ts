import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RankPoints } from '../_interfaces/RankPoint/rankpoints';
import { Benefits } from '../_interfaces/RankPoint/benefits';

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

  createOrEditBenefits(benefits?: Benefits){
    return this.httpClient.post(this.baseUrl + "MstRankPoints/createOrEditBenefit", benefits);
  }
  deleteBenefits(id?: number){
    return this.httpClient.post(this.baseUrl + `MstRankPoints/deletedBenefit?id=${id}`, id);
  }
}
