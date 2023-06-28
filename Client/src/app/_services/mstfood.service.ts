import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MstFood } from '../_interfaces/mstfood';

@Injectable({
  providedIn: 'root'
})
export class MstFoodService {
  baseUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<MstFood[] | undefined>(this.baseUrl + "MstFood/GetAll");
  }

  createOrEdit(food?: MstFood){
    return this.httpClient.post(this.baseUrl + "MstFood/CreateOrEdit", food//, {headers: new HttpHeaders({ "Content-Type": "multipart/form-data"})}
    );
  }
  
  delete(id?: number){
    return this.httpClient.delete(this.baseUrl + `MstFood/Delete?Id=${id}`);
  }
  
}
