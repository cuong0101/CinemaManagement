import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { RankPoints } from 'src/app/_interfaces/RankPoint/rankpoints';
import { RankpointsService } from 'src/app/_services/rankpoints.service';

@Component({
  selector: 'create-or-edit-mst-rank-points',
  templateUrl: './create-or-edit-mst-rank-points.component.html',
  styleUrls: ['./create-or-edit-mst-rank-points.component.css']
})
export class CreateOrEditMstRankPointsComponent implements OnInit {

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  bsModalRef!: BsModalRef;
  rankpoints: RankPoints = new RankPoints();
  datepicker?: Date;
  //fileBlob!: Blob
  //selectFile: File | null;
  constructor(private modalService: BsModalService,
    //private route: Router,
    private rankPointService: RankpointsService,
    private toastr: ToastrService,) { }

  ngOnInit() {
  }

  openModal(movie?: RankPoints) {

    this.rankpoints = new RankPoints();
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };

    this.bsModalRef = this.modalService.show(CreateOrEditMstRankPointsComponent, config);
    this.modalSave = this.bsModalRef.content.modalSave;
    if (movie) {
      this.rankpoints = movie;
      this.rankpoints.operationDate = moment(movie.operationDate).toDate() ?? undefined;
      this.rankpoints.expirationDate = moment(movie.expirationDate).toDate() ?? undefined;
      this.bsModalRef.content.rankpoints = this.rankpoints;
    }
    else {
      this.bsModalRef.content.movie = new RankPoints();
    }
  }

  hide() {
    this.modalService.hide();
  }


save(){
  this.rankPointService.createOrEdit(this.rankpoints).pipe(finalize(() => this.rankpoints = new RankPoints())).subscribe({
    next: (re) => this.toastr.success("Lưu thành công"),
    error: (error) => {
      this.toastr.error("Đã xảy ra lỗi")
      console.log(error)
    }
  }
  );
  this.modalSave.emit(1);
  this.hide();
}

}
