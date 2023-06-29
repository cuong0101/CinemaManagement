import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BookticketService } from 'src/app/_services/bookticket.service';

@Component({
  selector: 'order-food',
  templateUrl: './order-food.component.html',
  styleUrls: ['./order-food.component.css']
})
export class OrderFoodComponent implements OnInit {
  foods: any;
  bsModalRef!: BsModalRef;
  config: ModalOptions = {
    class: 'modal-dialog modal-xl',
    backdrop: 'static',
    keyboard: false,
    id:1
  };
  constructor(    
    private _bookTicketService: BookticketService,
    private _modalService: BsModalService,

    ) {

     }

  ngOnInit() {
    this._bookTicketService.getAllFood().subscribe(re => {
      this.foods = re;
    })
  }

  close() {
    if(this._modalService.config.id == 1)
        this._modalService.hide(1);

  }

  show()
  {
    this.bsModalRef = this._modalService.show(OrderFoodComponent, this.config);
  }
}
