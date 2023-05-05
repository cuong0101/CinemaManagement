import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { error } from 'console';
import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { SeatRank } from 'src/app/_interfaces/seatrank';
import { SeatRanksService } from 'src/app/_services/seatrank.service';
import  {Router}  from '@angular/router';

@Component({
  selector: 'app-create-or-edit-seatrank',
  templateUrl: './create-or-edit-seatrank.component.html',
  styleUrls: ['./create-or-edit-seatrank.component.css']
})
export class CreateOrEditSeatrankComponent implements OnInit {
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  bsModalRef!: BsModalRef;
  seatrank: SeatRank = new SeatRank();
  constructor(private modalService: BsModalService, 
    private seatrankService: SeatRanksService,
    private route: Router,
    private toastr: ToastrService,
    ) { 
    }

  ngOnInit() {
    
  }

  openModal(seatrank?: SeatRank) {
    
    this.seatrank = new SeatRank();
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };
    
    this.bsModalRef = this.modalService.show(CreateOrEditSeatrankComponent, config);
    if(seatrank) {
      this.seatrank = seatrank;
      this.bsModalRef.content.seatrank = seatrank;
    }
    else{
      this.bsModalRef.content.seatrank = new SeatRank();
    } 
  }

  hide(){
    this.modalService.hide();
  }

  save(){
    if(this.seatrank.description ==null && this.seatrank.name == null)
    {
      this.toastr.warning("Cần nhập đủ các trường");
    }
    else if(this.seatrank.name == null)
    {
      this.toastr.warning("cần nhập tên")
    }
    else if(this.seatrank.description == null)
    {
      this.toastr.warning("Cần nhập description");
    }
    else{
      this.seatrankService.createOrEdit(this.seatrank).pipe(finalize(() => this.seatrank = new SeatRank())).subscribe({
        next: (re) => this.toastr.success("Lưu thành công"),
        error: (error) => this.toastr.error("Đã xảy ra lỗi")
      }
      );
      location.reload();
      this.modalSave.emit(null);
      this.route.navigate(["/seatrank"]);
      this.hide();
    }
    
  }
}
