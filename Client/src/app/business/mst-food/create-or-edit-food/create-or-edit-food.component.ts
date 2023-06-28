import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { MstFood } from 'src/app/_interfaces/mstfood';
import { MstFoodService } from 'src/app/_services/mstfood.service';

@Component({
  selector: 'create-or-edit-food',
  templateUrl: './create-or-edit-food.component.html',
  styleUrls: ['./create-or-edit-food.component.css']
})
export class CreateOrEditFoodComponent implements OnInit {

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  bsModalRef!: BsModalRef;
  food: MstFood = new MstFood();
  constructor(private modalService: BsModalService,
    private route: Router,
    private foodservice: MstFoodService,
    private toastr: ToastrService,) { }

  ngOnInit() {
  }

  openModal(food?: MstFood) {

    this.food = new MstFood();
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };
    this.bsModalRef = this.modalService.show(CreateOrEditFoodComponent, config);
    if(food) {
      this.food = food;
      this.bsModalRef.content.food = this.food;
    }
    else {
      this.bsModalRef.content.food = new MstFood();
    }
  }

  hide() {
    this.modalService.hide();
  }

  save(){
    this.foodservice.createOrEdit(this.food)
    .pipe(finalize(() => this.food = new MstFood()))
    .subscribe({
      next: (re) => this.toastr.success("Lưu thành công"),
      error: (error) => {
        console.log(error);
        this.toastr.error(error.errorMessage);
      }
    });
      this.modalSave.emit(null);
      this.hide();
  }

}
