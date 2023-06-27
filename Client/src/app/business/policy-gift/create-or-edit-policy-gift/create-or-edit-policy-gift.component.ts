import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { error } from 'console';
import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { PolicyGift } from 'src/app/_interfaces/policygift';
import { PolicyGiftsService } from 'src/app/_services/policygift.service';
import  {Router}  from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-create-or-edit-policy-gift',
  templateUrl: './create-or-edit-policy-gift.component.html',
  styleUrls: ['./create-or-edit-policy-gift.component.css']
})
export class CreateOrEditPolicyGiftComponent implements OnInit {
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  bsModalRef!: BsModalRef;
  pathFile?: string;
   policygift:  PolicyGift = new  PolicyGift();
  constructor(private modalService: BsModalService, 
    private  policygiftService:  PolicyGiftsService,
    private route: Router,
 
    private toastr: ToastrService,
    ) { 
    }

  ngOnInit() {
    
  }

  openModal( policygift?:  PolicyGift) {
    
    this.policygift = new  PolicyGift();
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };
    
    this.bsModalRef = this.modalService.show(CreateOrEditPolicyGiftComponent, config);
    if( policygift) {
      this.policygift =  policygift;
      this.policygift.fromDate = moment(policygift.fromDate).toDate();
      this.policygift.toDate = moment(policygift.toDate).toDate();

      this.bsModalRef.content. policygift =  policygift;
    }
    else{
      this.bsModalRef.content. policygift = new  PolicyGift();
    } 
  }

  hide(){
    this.modalService.hide();
  }
  uploadFinished(event: any)
  {
    this.pathFile = event.dbPath;
  }
  save(){
    this.policygift.image = this.pathFile;
    if(this.policygift.giftName == null)
    {
      this.toastr.warning("cần nhập GiftName")
    }
    else{
      this.policygiftService.createOrEdit(this.policygift).pipe(finalize(() => this.policygift = new  PolicyGift())).subscribe({
        next: (re) => this.toastr.success("Lưu thành công"),
        error: (error) => this.toastr.error("Đã xảy ra lỗi")
      }
      );
      location.reload();
      this.modalSave.emit(null);
      this.route.navigate(["/ policygift"]);
      this.hide();
    }
    
  }
}
