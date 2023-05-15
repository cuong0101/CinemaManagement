import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { MstShowtimeManagement } from 'src/app/_interfaces/showtimemanagement';
import { MstShowTimeService } from 'src/app/_services/mstshowtime.service';

@Component({
  selector: 'app-create-or-edit-mst-show-time',
  templateUrl: './create-or-edit-mst-show-time.component.html',
  styleUrls: ['./create-or-edit-mst-show-time.component.css']
})
export class CreateOrEditMstShowTimeComponent implements OnInit {
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  bsModalRef!: BsModalRef;
  show: MstShowtimeManagement = new MstShowtimeManagement();
  datepicker?: Date;
  room: any[] = [];
  listMovie: {key: number|undefined, value: string|undefined}[] = [];


  constructor(private modalService: BsModalService, 
    private route: Router,
    private showtimeService: MstShowTimeService,
    private toastr: ToastrService,) { }


  ngOnInit() {
    this.getAllMovie();
  }

  openModal(show?: MstShowtimeManagement) {
    
    this.show = new MstShowtimeManagement();
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };

    this.bsModalRef = this.modalService.show(CreateOrEditMstShowTimeComponent, config);
    this.getAllMovie();
    if(show) {
      this.show = show;
      this.bsModalRef.content.show = this.show;
    }
    else{
      this.bsModalRef.content.show = new MstShowtimeManagement();
    } 
  }

  hide(){
    this.modalService.hide();
  }

  save(){
    this.modalService.hide();this.showtimeService.createOrEdit(this.show)
    .pipe(finalize(() => this.show = new MstShowtimeManagement()))
    .subscribe({
        next: () => {
          this.toastr.success("Lưu thành công")
        },
        error: (error) => {
          this.toastr.error(error.errorMessage); 
        }
    });
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
}


