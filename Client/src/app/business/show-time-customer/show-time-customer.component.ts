import { Component, OnInit } from '@angular/core';
import { addDays, format, getDate } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { MstShowtimeManagement } from 'src/app/_interfaces/ShowTime/showtimemanagement';
import { TicketByShowTime } from 'src/app/_interfaces/listTickets';
import { MstMovieManagement } from 'src/app/_interfaces/moviemanagement';
import { BookticketService } from 'src/app/_services/bookticket.service';
import { MstMovieService } from 'src/app/_services/mstmovie.service';
import { MstShowTimeService } from 'src/app/_services/mstshowtime.service';
@Component({
  selector: 'app-show-time-customer',
  templateUrl: './show-time-customer.component.html',
  styleUrls: ['./show-time-customer.component.css']
})
export class ShowTimeCustomerComponent implements OnInit {

  listseat: {key: number|undefined, value: {id: number, status: number, seatRankName: string, location: string}|undefined}[] = [];
  listmovie: {key: number|undefined, value: string|undefined}[] = [];
  listshowtime: {key: number|undefined, value: string|undefined}[] = [];
  listday: any[] = [];
  curDate = new Date();
  movie: MstMovieManagement = new MstMovieManagement();
  startTimeSelected!: string;
  movieName!: string;
  movieId: any;
  showtimeId:number = 0;
  listChooseTicket: any[] = [];
  minDate = new Date();
  maxDate = new Date();
  startTime: any;
  showtime: any

  constructor(
    private movieService: MstMovieService,
    private showtimeService: MstShowTimeService,
    private bookingService: BookticketService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    let today = new Date();
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5);
  }

  changeStartTime(params:any) {
    this.listmovie.length = 0;
    let startdate = format(new Date(params), 'yyyy-MM-dd');
    this.bookingService.getMovieByStartTime(startdate).subscribe((res:any) => {
      this.listmovie = res.map((item:any) => {
        return {
          key: item.id,
          value: item.name
        }
      });
      this.listmovie = [...this.listmovie];
      this.listmovie.unshift({key: undefined, value: ""});
    });


  }

  changeMovie(params: any)
  {
    if (params != "") {
      let startdate = format(new Date(this.startTime), 'yyyy-MM-dd');
      this.bookingService.getShowTimeByMovieAndDate(startdate, params)
        .subscribe((res:any) => {
          this.listshowtime = res.map((item:any) => {
            return {
              key: item.id,
              value: item.startTime
            }
          });
          this.listshowtime = [...this.listshowtime];
          this.listshowtime.unshift({key: undefined, value: ""});
        })
    }
  }

  changeShowtime(params: any)
  {
    if (params)
    {
      this.bookingService.GetTicketByShowtimeAdmin(params).subscribe((res:any) => {
        this.listseat = res.map((item:any) => {
          return {
            key: item.id,
            value: {
              id: item.id,
              status: item.status,
              seatRankName: item.seatrank,
              location: item.location,
            }
          }
        });
        this.listseat = [...this.listseat];
      })
    }
  }

  chooseSeat(event:any)
  {
    if (event) {}
  }

  submitSelection(){
  }

}
