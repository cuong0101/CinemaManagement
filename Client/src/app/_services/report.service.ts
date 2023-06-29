import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../_interfaces/room';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) { }
 
  doanhThuDoAn(from?:Date, to?:Date)
  {
    return this.httpClient.get<Report[]>(this.baseUrl + `Room/DoanhThuDoAn?from=${from}&to=${to}`);
  }

  doanhThuPhim(from?:Date, to?:Date)
  {
    return this.httpClient.get<Report[]>(this.baseUrl + `Room/DoanhThuPhim?from=${from}&to=${to}`);
  }

}
