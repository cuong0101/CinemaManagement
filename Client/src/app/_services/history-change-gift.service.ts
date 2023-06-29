import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MstFood } from '../_interfaces/mstfood';
import { HistoryChangeGift } from '../_interfaces/historychangegift';

@Injectable({
  providedIn: 'root'
})
export class HistoryChangeGiftService {
  baseUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) { }

  getAllRedeemVoucher(){
    return this.httpClient.get<HistoryChangeGift[] | undefined>(this.baseUrl + "RedeemVoucher/GetAllRedeemVoucher");
  }
}
