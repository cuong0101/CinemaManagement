import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrEditPromo } from '../_interfaces/_iMstPromotion/createOrEditPromo';
import { PromotionInput } from '../_interfaces/_iMstPromotion/promotionInput';
import { Promotion } from '../_interfaces/_iMstPromotion/promotion';
import { CreateOrEditPromoDetail } from '../_interfaces/_iMstPromotion/createOrEditPromoDetail';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  baseUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) { }

  getAllPromotion(promo: PromotionInput){
    return this.httpClient.post(this.baseUrl + "Promotion/getAll", promo);
  }

  createOrEdit(room?: CreateOrEditPromo){
    return this.httpClient.post(this.baseUrl + "Promotion/createOrEdit", room);
  }

  delete(id?: number){
    return this.httpClient.delete(this.baseUrl + `Promotion/delete/${id}`)
  }

  createOrEditDetail(room?: CreateOrEditPromoDetail){
    return this.httpClient.post(this.baseUrl + "Promotion/createOrEditDetail", room);
  }

  deleteDetail(id?: number){
    return this.httpClient.delete(this.baseUrl + `Promotion/deleteDetail/${id}`)
  }
}
