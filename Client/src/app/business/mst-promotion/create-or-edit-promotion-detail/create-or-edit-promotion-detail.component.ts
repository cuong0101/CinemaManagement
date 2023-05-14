import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { PromotionDetail } from 'src/app/_interfaces/_iMstPromotion/promotionDetail';
import { CustomersService } from 'src/app/_services/customer.service';
import { PromotionService } from 'src/app/_services/promotion.service';

@Component({
  selector: 'create-or-edit-promotion-detail',
  templateUrl: './create-or-edit-promotion-detail.component.html',
  styleUrls: ['./create-or-edit-promotion-detail.component.css']
})
export class CreateOrEditPromotionDetailComponent implements OnInit {
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  bsModalRef!: BsModalRef;
  promoDetail: PromotionDetail = new PromotionDetail();
  datepicker?: Date;

  cusId: any;
  cusList: any[] = [];
  selectedItem: any;
  label: string = 'label';
  key: string = 'value';
  type: string = 'text';

  private onChange: Function = new Function();


  constructor(
    private _modalService: BsModalService,
    private _promotionService: PromotionService,
    private _cusService: CustomersService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllCus();
  }

  show(promo?: PromotionDetail) {
    //this.getAllCus();
    this.promoDetail = new PromotionDetail();
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };

    this.bsModalRef = this._modalService.show(CreateOrEditPromotionDetailComponent, config);
    if(promo) {
      this.promoDetail = promo;
      this.bsModalRef.content.promoDetail = this.promoDetail;
    }
    else{
      this.bsModalRef.content.promoDetail = new PromotionDetail();
    }
  }

  close(){
    this._modalService.hide();
  }

  save(){
    this._promotionService.createOrEditDetail(this.promoDetail)
    .pipe(finalize(() => this.promoDetail = new PromotionDetail()))
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

  changeValue(e: any) {
    if (!isNaN(e.target.value) && this.type === 'number') {
      this.cusId = Number(e.target.value);
      if (typeof this.onChange === 'function') {
        this.onChange(Number(e.target.value));
      }
    } else {
    if (isNaN(e.target.value) && (e.target.value == 'undefined' || e.target.value == 'null' || !e.target.value)) this.cusId = undefined;
      //if (isNaN(e.target.value)) this.value = undefined;
      else this.cusId = e.target.value;
      if (typeof this.onChange === 'function') {
        this.onChange(this.cusId);
      }
    }
  }

  getAllCus() {
    this._cusService.getAll()
    .pipe(finalize(() => this.promoDetail = new PromotionDetail()))
    .subscribe(res =>  {
        res.forEach(e => this.cusList.push({value: e.id, label: e.name}))
        this.cusList = [...this.cusList]
    });
  }

}
