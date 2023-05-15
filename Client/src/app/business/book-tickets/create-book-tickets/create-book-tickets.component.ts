import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateOrEditPromotionComponent } from '../../mst-promotion/create-or-edit-promotion/create-or-edit-promotion.component';
import { TicketByShowTime } from 'src/app/_interfaces/listTickets';
import { BookTickets } from 'src/app/_interfaces/booktickets';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'create-book-tickets',
  templateUrl: './create-book-tickets.component.html',
  styleUrls: ['./create-book-tickets.component.css']
})
export class CreateBookTicketsComponent implements OnInit {

  bsModalRef!: BsModalRef;
  showtime: BookTickets = new BookTickets();
  ticket: TicketByShowTime = new TicketByShowTime();
  listchair: string = '';
  constructor(
    private _modalService: BsModalService,

  ) { }

  ngOnInit(): void {
  }

  show(showtimes: BookTickets, ticket: any) {
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };

    this.bsModalRef = this._modalService.show(CreateBookTicketsComponent, config);
    this.bsModalRef.content.showtime = showtimes;
    this.bsModalRef.content.ticket = ticket;

    this.listchair = ticket?.length > 0 ? ticket?.location.join(',') : '';
  }

  close() {
    this._modalService.hide();
  }

  save() {

  }
}
