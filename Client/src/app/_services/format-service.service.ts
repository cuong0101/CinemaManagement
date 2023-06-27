import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() { }
  formatMyDate(date: any): string {
    if (date == null) return '';
    const dateFormat = 'dd/MM/yyyy';
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
  formatHour(hour: any): string {
    if (hour == null) return "";
    const formattedTime = moment(hour, 'HH:mm').format('hh:mm').toString();
    return formattedTime
  }

  moneyFormat(value: any) {
    return value ? Math.round(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0';
  }
}
