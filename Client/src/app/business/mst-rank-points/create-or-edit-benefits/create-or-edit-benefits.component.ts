import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { Benefits } from 'src/app/_interfaces/RankPoint/benefits';
import { RankPoints } from 'src/app/_interfaces/RankPoint/rankpoints';
import { RankpointsService } from 'src/app/_services/rankpoints.service';

@Component({
  selector: 'create-or-edit-benefits',
  templateUrl: './create-or-edit-benefits.component.html',
  styleUrls: ['./create-or-edit-benefits.component.css']
})
export class CreateOrEditBenefitsComponent implements OnInit {
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  benefit: Benefits = new Benefits();
  bsModalRef!: BsModalRef;

  constructor(
    private _modalService: BsModalService,
    private _rankPointsService: RankpointsService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  openModal(rankPoint: RankPoints, benefits?: Benefits | null) {
    this.benefit = new Benefits();
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };

    this.bsModalRef = this._modalService.show(CreateOrEditBenefitsComponent, config);
    if(benefits) {
      this.benefit = benefits;
      this.bsModalRef.content.benefit = this.benefit;
    }
    else{
      this.bsModalRef.content.benefit = new Benefits();
      this.bsModalRef.content.benefit.rankPointId = rankPoint.id;
    }
  }

  hide() {
    this._modalService.hide();
  }
  save() {
    this._rankPointsService.createOrEditBenefits(this.benefit)
    .pipe(finalize(() => this.benefit = new Benefits()))
    .subscribe({
      next: (re) => this._toastr.success("Lưu thành công"),
      error: (error) => {
        console.log(error);
        this._toastr.error(error.errorMessage);
      }
    });
      this.modalSave.emit(null);
      this.hide();
      this.benefit = new Benefits();
  }
}
