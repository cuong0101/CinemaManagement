import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateOrEditPromotionComponent } from '../../mst-promotion/create-or-edit-promotion/create-or-edit-promotion.component';
import { TicketByShowTime } from 'src/app/_interfaces/listTickets';
import { BookTickets } from 'src/app/_interfaces/booktickets';
import { tick } from '@angular/core/testing';
import * as moment from 'moment';
import { Promotion } from 'src/app/_interfaces/_iMstPromotion/promotion';
import { PromotionDetail } from 'src/app/_interfaces/_iMstPromotion/promotionDetail';
import { BookticketService } from 'src/app/_services/bookticket.service';
import { ToastrService } from 'ngx-toastr';
import { GiftChoose } from 'src/app/_interfaces/_IBookTickets/GiftChoose';

@Component({
  selector: 'create-book-tickets',
  templateUrl: './create-book-tickets.component.html',
  styleUrls: ['./create-book-tickets.component.css']
})
export class CreateBookTicketsComponent implements OnInit {

  bsModalRef!: BsModalRef;
  showtime: BookTickets = new BookTickets();
  ticket: TicketByShowTime = new TicketByShowTime();
  chair?: string = "";
  phone?: string;
  total?: number = 0;
  promotions?: Promotion
  promoDetail?: PromotionDetail
  tickets: number[]=[];
  cusId?: number;
  giftChoose: GiftChoose[]=[];
  giftsCb: GiftChoose[]=[];;
  constructor(
    private _modalService: BsModalService,
    private _bookTicketService: BookticketService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._bookTicketService.getChangeGift().subscribe((re) => {
      this.giftChoose = re;
    })
  }

  show(showtimes: BookTickets, tickets: any[]) {
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };

    this.bsModalRef = this._modalService.show(CreateBookTicketsComponent, config);
    showtimes.startDate = moment(showtimes.startDate).toDate()
    this.bsModalRef.content.showtime = showtimes;
    tickets.forEach(e => {
      this.chair += e.chair + ", ";
      this.total += e.price;
      this.tickets.push(e.id)
    })
    this.chair = this.chair?.substring(0, this.chair.length-2);
    this.bsModalRef.content.chair = this.chair;
    this.bsModalRef.content.total = this.total
    this.bsModalRef.content.tickets = this.tickets
    this.chair = "";
    this.total = 0;
  }

  close() {
    this.tickets = [];
    this._modalService.hide();
  }

  save() {
    this._bookTicketService.updateTicketStatus(this.tickets).subscribe({
      complete: () => this.toastr.success("Đặt vé thành công!")
    })
  }

  changeGiftChoose(event: any)
  {
    if(this.phone?.length == 10)
    {
      this.giftsCb = this.giftChoose.filter(e => e.phoneCus == this.phone);
    }
    else this.giftsCb.length = 0;
  }
}
