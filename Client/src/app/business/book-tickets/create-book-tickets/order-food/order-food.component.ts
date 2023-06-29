import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { BookticketService } from 'src/app/_services/bookticket.service';

@Component({
  selector: 'order-food',
  templateUrl: './order-food.component.html',
  styleUrls: ['./order-food.component.css']
})
export class OrderFoodComponent implements OnInit {
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild("modal", { static: true }) modal?: ModalDirective;

  foods: any;
  bsModalRef!: BsModalRef;
  totalFood: number=0;
  config: ModalOptions = {
    class: 'modal-dialog modal-md',
    backdrop: 'static',
    keyboard: false,
    id:1
  };
  bookingFoods?: any;
  constructor(    
    private _bookTicketService: BookticketService,
    private _modalService: BsModalService,

    ) {

     }

  ngOnInit() {
    this._bookTicketService.getAllFood().subscribe(re => {
      this.foods = re;
      this.foods.forEach((ele: any)=> ele.quantity = 0);
    })
  }

  close() {
    this.modal?.hide();
  }

  show()
  {
    this.modal?.show();
  }

  totalMoneyFood()
  {
    this.totalFood = 0;
    this.foods.forEach((e:any) => 
    {
      this.totalFood += e.quantity * e.price;
    })
  }

  saveFood()
  {
    this.bookingFoods = this.foods.filter((e:any) => e.quatity != 0);
    this.modal?.hide();
    this.closeModalEvent.emit(this.bookingFoods);
    
  }
}
