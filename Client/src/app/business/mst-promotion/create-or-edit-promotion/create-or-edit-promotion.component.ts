import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { CreateOrEditPromo } from 'src/app/_interfaces/_iMstPromotion/createOrEditPromo';
import { Promotion } from 'src/app/_interfaces/_iMstPromotion/promotion';
import { PromotionService } from 'src/app/_services/promotion.service';

@Component({
  selector: 'create-or-edit-promotion',
  templateUrl: './create-or-edit-promotion.component.html',
  styleUrls: ['./create-or-edit-promotion.component.css']
})
export class CreateOrEditPromotionComponent implements OnInit {
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  bsModalRef!: BsModalRef;
  promo: CreateOrEditPromo = new CreateOrEditPromo();
  datepicker?: Date;
  constructor(
    private _modalService: BsModalService,
    private _promotionService: PromotionService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  show(promo?: CreateOrEditPromo) {

    this.promo = new CreateOrEditPromo();
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };

    this.bsModalRef = this._modalService.show(CreateOrEditPromotionComponent, config);
    if(promo) {
      this.promo = promo;
      this.promo.fromDate = moment(promo.fromDate).toDate();
      this.promo.toDate = moment(promo.toDate).toDate();
      this.bsModalRef.content.promo = this.promo;
    }
    else{
      this.bsModalRef.content.promo = new CreateOrEditPromo();
    }
  }

  close(){
    this._modalService.hide();
  }

  save(){
    this._promotionService.createOrEdit(this.promo)
    .pipe(finalize(() => this.promo = new CreateOrEditPromo()))
    .subscribe({
      next: (re) => this._toastr.success("Lưu thành công"),
      error: (error) => {
        console.log(error);
        this._toastr.error(error.errorMessage);
      }
    });
      this.modalSave.emit(null);
      this.close();
  }

}
