import { Component, OnInit } from '@angular/core';
import { addDays, format } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
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

  listseat: {key: number|undefined, value: {id: number, status: number, seatrankName: string, location: string}|undefined}[] = [];
  listmovie: {key: number|undefined, value: string|undefined}[] = [];
  listshowtime: {key: number|undefined, value: string|undefined}[] = [];
  listday: any[] = [];
  curDate = new Date();
  movie: MstMovieManagement = new MstMovieManagement();
  startTimeSelected!: string;
  movieName!: string;
  movieId: number = 0;
  event:any;
  showtimeId:number = 0;
  listChooseTicket: any[] = [];

  constructor(
    private movieService: MstMovieService,
    private showtimeService: MstShowTimeService,
    private bookingService: BookticketService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.startTimeSelected = this.curDate.toLocaleDateString();
    this.getStartTime();
    this.getAllMovie(this.startTimeSelected);
    this.getAllShowTime(this.startTimeSelected,this.movieId);
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
          value: format(new Date(item.startTime), 'HH:mm')
        }
      });
      this.listshowtime = [...this.listshowtime];
    });
  }

  submitSelection(){
    console.log(this.listChooseTicket);
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
        this.movieId = this.listmovie[i].key!;
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

  ChangeShowtime(event:any):void
  {
    const selectedOption: HTMLOptionElement = event.target['options'][event.target['selectedIndex']];
    this.showtimeId = Number.parseInt(selectedOption.value);
  }

  getAllSeat()
  {
    this.bookingService.GetTicketByShowtimeAdmin(this.showtimeId).subscribe((res:any) => {
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
  ChooseSeat(event:any)
  {
    const selectedOption: HTMLOptionElement = event.target['options'][event.target['selectedIndex']];
    this.listChooseTicket.push(selectedOption.value);
  }
}