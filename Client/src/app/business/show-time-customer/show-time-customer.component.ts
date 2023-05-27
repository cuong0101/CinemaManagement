import { Component, OnInit } from '@angular/core';
import { addDays, format } from 'date-fns';
import { da } from 'date-fns/locale';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MstMovieManagement } from 'src/app/_interfaces/moviemanagement';
import { SeatRank } from 'src/app/_interfaces/seatrank';
import { BookticketService } from 'src/app/_services/bookticket.service';
import { MstMovieService } from 'src/app/_services/mstmovie.service';
import { MstShowTimeService } from 'src/app/_services/mstshowtime.service';
import { SeatRanksService } from 'src/app/_services/seatrank.service';

@Component({
  selector: 'app-show-time-customer',
  templateUrl: './show-time-customer.component.html',
  styleUrls: ['./show-time-customer.component.css']
})
export class ShowTimeCustomerComponent implements OnInit {

  listseatrank: {key: number|undefined, value: string|undefined}[] = [];
  listmovie: {key: number|undefined, value: string|undefined}[] = [];
  listshowtime: {key: number|undefined, value: string|undefined}[] = [];
  listday: any[] = [];
  curDate = new Date();
  movie: MstMovieManagement = new MstMovieManagement();
  startTimeSelected!: string;
  movieName!: string;


  constructor(
    private movieService: MstMovieService,
    private showtimeService: MstShowTimeService,
    private bookingService: BookticketService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.startTimeSelected = this.curDate.toLocaleDateString();
    this.getStartTime();
    this.getAllMovie(this.startTimeSelected);
    this.getAllShowTime(this.startTimeSelected,this.listshowtime[0].key!);
  }
  getAllMovie(startdate:string)
  {

    this.bookingService.getMovieByStartTime(startdate).subscribe((res:any) => {
      this.listmovie = res.map((item:any) => {
        return {
          key: item.id,
          value: item.name
        }
      });
      this.listmovie = [...this.listmovie];
    });
  }

  getAllShowTime(startTimeSelected: string,movieId:number)
  {
    this.bookingService.getShowTimeByMovieAndDate(startTimeSelected,movieId).subscribe((res:any) => {
      this.listshowtime = res.map((item:any) => {
        return {
          key: item.id,
          value: item.startTime
        }
      });
      this.listshowtime = [...this.listshowtime];
    });
  }

  submitSelection(){
    this.toastr.success('Đặt vé thành công');
  }

  getStartTime()
  {
    this.listday.push(format(this.curDate, 'dd/MM/yyyy'));
    for (let i = -7; i <= 7; i++) {
      const nextDate = addDays(this.curDate, i);
      this.listday.push(format(nextDate, 'dd/MM/yyyy'));
    }
  }
  ChangeStartTime():void
  {
    this.getAllMovie(this.startTimeSelected);
  }
  ChangeMovie():void
  {
    for (let i = 0; i < this.listmovie.length; i++) {
      if(this.listmovie[i].value == this.movieName)
      {
        this.bookingService.getShowTimeByMovieAndDate(this.startTimeSelected,this.listmovie[i].key!).subscribe((res:any) => {
          this.listshowtime = res.map((item:any) => {
            return {
              key: item.id,
              value: item.startTime
            }
          });
          this.listshowtime = [...this.listshowtime];
        })
      }
    }
  }
}
