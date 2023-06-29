import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../_interfaces/report';
import { ReportDateInput } from '../_interfaces/reportDateInput';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) { }
 
  doanhThuDoAn(input: ReportDateInput)
  {
    return this.httpClient.post(this.baseUrl + `Report/DoanhThuDoAn`, input);
  }

  doanhThuPhim(input: ReportDateInput)
  {
    return this.httpClient.post(this.baseUrl + `Report/DoanhThuPhim`, input);
  }

}
