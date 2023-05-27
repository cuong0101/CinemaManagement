import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize, pipe } from 'rxjs';
import { CreateOrEditShowTime } from 'src/app/_interfaces/ShowTime/CreateOrEditShowTime';
import { MstShowtimeManagement } from 'src/app/_interfaces/ShowTime/showtimemanagement';
import { MstShowTimeService } from 'src/app/_services/mstshowtime.service';

@Component({
  selector: 'app-create-or-edit-mst-show-time',
  templateUrl: './create-or-edit-mst-show-time.component.html',
  styleUrls: ['./create-or-edit-mst-show-time.component.css']
})
export class CreateOrEditMstShowTimeComponent implements OnInit {
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  bsModalRef!: BsModalRef;
  show: CreateOrEditShowTime = new CreateOrEditShowTime();
  datepicker?: Date;
  room: any[] = [];
  listMovie: {key: number|undefined, value: string|undefined}[] = [];
  listRoom: {key: number|undefined, value: string|undefined}[] = [];

  IdMovie?: number;
  IdRoom?: number;

  constructor(private modalService: BsModalService, 
    private route: Router,
    private showtimeService: MstShowTimeService,
    private toastr: ToastrService,) { }


  ngOnInit() {
    this.getAllMovie();
    this.getAllRoom();
  }

  openModal(showtime?: MstShowtimeManagement) {
    
    this.show = new CreateOrEditShowTime();
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };

    this.bsModalRef = this.modalService.show(CreateOrEditMstShowTimeComponent, config);
    if(showtime) {
      this.show = showtime;
      this.show.id = showtime.id;
      this.show.movieId = showtime.idMovie;
      this.show.roomId = showtime.idRoom;
      this.show.startTime = showtime.startTime;
      this.bsModalRef.content.show = this.show;

    }
    else{
      this.bsModalRef.content.show = new CreateOrEditShowTime();
    } 
  }

  hide(){
    this.modalService.hide();
  }

  save(){
    this.showtimeService.createOrEdit(this.show)
    .pipe(finalize(() => this.show = new CreateOrEditShowTime()))
    .subscribe({
      next: () => {
        this.toastr.success("Lưu thành công")
      },
      error: (error) => {
        this.toastr.error(error.errorMessage);
      }
    })

    this.modalSave.emit(null);
    this.hide();
    location.reload();
    this.route.navigate(["/mstshowtime"]);
  }

  getAllMovie()
  {
    this.showtimeService.getAllMovie().subscribe((res) => {
      this.listMovie = res.map((item) => {
        return {
          key: item.id,
          value: item.name
        }
      });
      this.listMovie = [...this.listMovie];
    })
  }

  getAllRoom(){
    this.showtimeService.getAllRoom().subscribe((res) => {
      this.listRoom = res.map((item) => {
        return {
          key: item.id,
          value: item.name
        }
      })
    });
    this.listRoom = [...this.listRoom];
  }
}


