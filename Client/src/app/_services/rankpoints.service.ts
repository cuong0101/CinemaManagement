import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RankpointsService {
  baseUrl = "https://localhost:44389/api/";

constructor(private httpClient: HttpClient) { }

getAll(paginationParams: any){
  this.httpClient.get
}
}
