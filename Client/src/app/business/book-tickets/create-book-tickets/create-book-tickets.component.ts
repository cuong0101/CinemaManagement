import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateOrEditPromotionComponent } from '../../mst-promotion/create-or-edit-promotion/create-or-edit-promotion.component';

@Component({
  selector: 'create-book-tickets',
  templateUrl: './create-book-tickets.component.html',
  styleUrls: ['./create-book-tickets.component.css']
})
export class CreateBookTicketsComponent implements OnInit {

  bsModalRef!: BsModalRef;

  constructor(
    private _modalService: BsModalService,

  ) { }

  ngOnInit(): void {
  }

  show() {
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };

    this.bsModalRef = this._modalService.show(CreateOrEditPromotionComponent, config);

  }

  close() {

  }

  save() {

  }
}
