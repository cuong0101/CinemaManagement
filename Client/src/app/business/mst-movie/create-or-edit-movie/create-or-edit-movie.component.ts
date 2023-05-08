import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { MstMovieManagement } from 'src/app/_interfaces/moviemanagement';
import { MstMovieService } from 'src/app/_services/mstmovie.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'create-or-edit-movie',
  templateUrl: './create-or-edit-movie.component.html',
  styleUrls: ['./create-or-edit-movie.component.css']
})
export class CreateOrEditMovieComponent implements OnInit {
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  bsModalRef!: BsModalRef;
  movie: MstMovieManagement = new MstMovieManagement();
  constructor(private modalService: BsModalService, 
    private route: Router,
    private movieService: MstMovieService,
    private toastr: ToastrService,) { }

  ngOnInit() {
  }

  openModal(movie?: MstMovieManagement) {
    
    this.movie = new MstMovieManagement();
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };
    
    this.bsModalRef = this.modalService.show(CreateOrEditMovieComponent, config);
    if(movie) {
      this.movie = movie;
      movie.publishDate = new Date(new Date(movie.publishDate!).toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit'}));
      this.bsModalRef.content.movie = movie;
    }
    else{
      this.bsModalRef.content.movie = new MstMovieManagement();
    } 
  }

  hide(){
    this.modalService.hide();
  }

  save(){
    this.movieService.createOrEdit(this.movie).pipe(finalize(() => this.movie = new MstMovieManagement())).subscribe({
      next: (re) => this.toastr.success("Lưu thành công"),
      error: (error) => this.toastr.error("Đã xảy ra lỗi")
    }
    );
    this.modalSave.emit(null);
    location.reload();
    this.hide();
    this.route.navigate(["/mstmovie"]);
  }

}
