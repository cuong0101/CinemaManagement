import { Component, ElementRef, EventEmitter, OnInit, Output,  } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
// import { FileUploader } from 'ng2-file-upload';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { MstMovieManagement } from 'src/app/_interfaces/moviemanagement';
import { MstMovieService } from 'src/app/_services/mstmovie.service';

@Component({
  selector: 'create-or-edit-movie',
  templateUrl: './create-or-edit-movie.component.html',
  styleUrls: ['./create-or-edit-movie.component.css']
})
export class CreateOrEditMovieComponent implements OnInit {
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  //uploader!: FileUploader;
  bsModalRef!: BsModalRef;
  movie: MstMovieManagement = new MstMovieManagement();
  datepicker?: Date;
  fileBlob!: Blob
  //selectFile: File | null;
  constructor(private modalService: BsModalService,
    private route: Router,
    private movieService: MstMovieService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    //this.initializeUploader()
  }

  openModal(movie?: MstMovieManagement) {

    this.movie = new MstMovieManagement();
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };

    this.bsModalRef = this.modalService.show(CreateOrEditMovieComponent, config);
      // this.datepicker = moment(movie.publishDate).toDate();
      // console.log(moment(movie.publishDate))
    if(movie) {
      this.movie = movie;
      this.movie.publishDate = moment(movie.publishDate).toDate();
      this.bsModalRef.content.movie = this.movie;
    }
    else {
      this.bsModalRef.content.movie = new MstMovieManagement();
    }
  }

  hide() {
    this.modalService.hide();
  }
  // initializeUploader (){
  //   this.uploader = new FileUploader({
  //     url: 'https://localhost:44389/api/Movie/add-photo',
  //     authToken: localStorage.getItem("jwt")?.toString(),
  //     isHTML5: true,
  //     allowedFileType: ['image'],
  //     removeAfterUpload: true,
  //     autoUpload:false,
  //     maxFileSize:10 * 1024 *1024
  //   });

  //   this.uploader.onAfterAddingFile = (file) => {
  //     file.withCredentials = false;
  //   }
  //   this.uploader.onSuccessItem = (Item, response, status, headers) => {
  //     if(response){

  //     }
  //   }
  // }
  save(){
    this.movieService.createOrEdit(this.movie)
    .pipe(finalize(() => this.movie = new MstMovieManagement()))
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
      this.route.navigate(["/mstmovie"]);
  }

// save(){
//   console.log(this.uploader)
//   let formData = new FormData();
//   formData.append('id', this.movie.id!.toString())

//   formData.append('image', this.fileBlob)
//   this.movieService.createOrEdit(formData).pipe(finalize(() => this.movie = new MstMovieManagement())).subscribe({
//     next: (re) => this.toastr.success("Lưu thành công"),
//     error: (error) => {
//       this.toastr.error("Đã xảy ra lỗi")
//       console.log(error)
//     }
//   }
//   );
//   this.modalSave.emit(null);
//   //location.reload();
//   this.hide();
//   //this.route.navigate(["/mstmovie"]);
// }

}

function b64Blob(arg0: unknown[], type: any): any {
  throw new Error('Function not implemented.');
}

