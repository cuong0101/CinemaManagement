import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { RankPoints } from 'src/app/_interfaces/rankpoints';
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
    if (movie) {
      // this.datepicker = moment(movie.publishDate).toDate();
      // console.log(moment(movie.publishDate))
      this.rankpoints = movie;
      //this.rankpoints.publishDate = moment(movie.publishDate).toDate();
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
  // console.log(this.uploader)
  // let formData = new FormData();
  // formData.append('id', this.movie.id!.toString())

  // formData.append('image', this.fileBlob)
  this.rankPointService.createOrEdit(this.rankpoints).pipe(finalize(() => this.rankpoints = new RankPoints())).subscribe({
    next: (re) => this.toastr.success("Lưu thành công"),
    error: (error) => {
      this.toastr.error("Đã xảy ra lỗi")
      console.log(error)
    }
  }
  );
  this.modalSave.emit(null);
  //location.reload();
  this.hide();
  //this.route.navigate(["/mstmovie"]);
}

}
