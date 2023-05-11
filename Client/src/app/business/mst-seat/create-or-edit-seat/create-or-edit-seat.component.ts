import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { error } from 'console';
import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { Seat } from 'src/app/_interfaces/seat';
import { SeatsService } from 'src/app/_services/seat.service';
import  {Router}  from '@angular/router';

@Component({
  selector: 'app-create-or-edit-seat',
  templateUrl: './create-or-edit-seat.component.html',
  styleUrls: ['./create-or-edit-seat.component.css']
})
export class CreateOrEditSeatComponent implements OnInit {
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  bsModalRef!: BsModalRef;
  seat: Seat = new Seat();
  constructor(private modalService: BsModalService, 
    private seatService: SeatsService,
    private route: Router,
    private toastr: ToastrService,
    ) { 
    }

  ngOnInit() {
    
  }

  openModal(seat?: Seat) {
    
    this.seat = new Seat();
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };
    
    this.bsModalRef = this.modalService.show(CreateOrEditSeatComponent, config);
    if(seat) {
      this.seat = seat;
      this.bsModalRef.content.seat = seat;
    }
    else{
      this.bsModalRef.content.seat = new Seat();
    } 
  }

  hide(){
    this.modalService.hide();
  }

  save(){
    if(this.seat.row ==null && this.seat.column== null)
    {
      this.toastr.warning("Cần nhập đủ các trường");
    }
    else if(this.seat.row == null)
    {
      this.toastr.warning("cần nhập tên")
    }
    else if(this.seat.column == null)
    {
      this.toastr.warning("Cần nhập description");
    }
    else{
      this.seatService.createOrEdit(this.seat).pipe(finalize(() => this.seat = new Seat())).subscribe({
        next: (re) => this.toastr.success("Lưu thành công"),
        error: (error) => this.toastr.error("Đã xảy ra lỗi")
      }
      );
      location.reload();
      this.modalSave.emit(null);
      this.route.navigate(["/seat"]);
      this.hide();
    }
    
  }
}

