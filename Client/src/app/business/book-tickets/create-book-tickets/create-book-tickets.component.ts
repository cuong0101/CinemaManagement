import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { TicketByShowTime } from 'src/app/_interfaces/listTickets';
import { BookTickets } from 'src/app/_interfaces/booktickets';
import * as moment from 'moment';
import { Promotion } from 'src/app/_interfaces/_iMstPromotion/promotion';
import { PromotionDetail } from 'src/app/_interfaces/_iMstPromotion/promotionDetail';
import { BookticketService } from 'src/app/_services/bookticket.service';
import { ToastrService } from 'ngx-toastr';
import { GiftChoose } from 'src/app/_interfaces/_IBookTickets/GiftChoose';
import { filter, iif, map, takeWhile, timer } from 'rxjs';
import { OrderFoodComponent } from './order-food/order-food.component';
import { FormatService } from 'src/app/_services/format-service.service';
import { CellClassParams, ColDef, EditableCallbackParams, GridApi, PaginationNumberFormatterParams } from 'ag-grid-community';
import { BookingTickets } from 'src/app/_interfaces/_IBookTickets/bookingTickets';

@Component({
  selector: 'create-book-tickets',
  templateUrl: './create-book-tickets.component.html',
  styleUrls: ['./create-book-tickets.component.css']
})
export class CreateBookTicketsComponent implements OnInit {
  @ViewChild('orderFoodModal') orderFoodModal!: OrderFoodComponent;
  bsModalRef!: BsModalRef;
  showtime: BookTickets = new BookTickets();
  ticket: TicketByShowTime = new TicketByShowTime();
  chair?: string = "";
  phone?: string;
  totalTicket: number = 0;
  promotions?: Promotion
  promoDetail?: PromotionDetail
  tickets: number[]=[];
  cusId?: number;
  giftChoose: GiftChoose[]=[];
  giftsCb: GiftChoose[]=[];
  config: ModalOptions = {
    class: 'modal-dialog modal-xl',
    backdrop: 'static',
    keyboard: false,
    id: "booking"
  };
  timeRemaining$ = timer(0, 1000).pipe(
    map(n => (300 - n) * 1000),
    takeWhile(n => n >= 0),
  );
  totalFood: number = 0;
  totalAmount: number = 0;
  modalRef!: BsModalRef;
  colDefs?: ColDef[];
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
  };
  rowDataFood: any;
  public paginationPageSize = 100;
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return '' + params.value.toLocaleString() + '';
  };
  private gridApi!: GridApi<any>;
  rowSelection: 'single' | 'multiple' = 'single';

  public columnTypes: {
    [key: string]: ColDef;
  } = {
    editableColumn: {
      editable: (params: EditableCallbackParams<any>) => {
        return true;
      },
      cellStyle: (params: CellClassParams<any>) => {
        if (params.column.getColId() == 'quantity') {
          return { backgroundColor: '#FFD700' };
        }
      },
    },
  };

  empId!: number;
  constructor(
    private _modalService: BsModalService,
    private _bookTicketService: BookticketService,
    private toastr: ToastrService,
    private _format: FormatService

  ) { 
    this.colDefs = [
      {
        headerName: 'STT',
        headerTooltip: 'STT',
        cellRenderer: (params: { rowIndex: number }) => params.rowIndex + 1,
        cellClass: ['text-center'],
        flex: 0.5,
      },
      {
        headerName: 'Tên đồ ăn',
        field: 'name',
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Số lượng',
        field: 'quantity',
        cellClass: ['text-center'],
        flex: 1,
        type: 'editableColumn',
        editable: true
      },
      {
        headerName: 'Giá',
        field: 'price',
        valueFormatter: (params) => this._format.moneyFormat(params.value),
        cellClass: ['text-center'],
        flex: 1,
      },
    ];


  }

  ngOnInit(): void {
    this._bookTicketService.getChangeGift().subscribe((re) => {
      this.giftChoose = re;
    })
    
  }

  show(showtimes: BookTickets, tickets: any[], empId: number) {
    
    this.totalAmount = 0;
    this.bsModalRef = this._modalService.show(CreateBookTicketsComponent, this.config);
    showtimes.startDate = moment(showtimes.startDate).toDate()
    this.bsModalRef.content.showtime = showtimes;
    tickets.forEach(e => {
      this.chair += e.chair + ", ";
      this.totalTicket += e.price;
      this.tickets.push(e.id)
    })
    this.chair = this.chair?.substring(0, this.chair.length-2);
    this.bsModalRef.content.chair = this.chair;
    this.bsModalRef.content.totalTicket = this.totalTicket
    this.bsModalRef.content.tickets = this.tickets
    this.chair = "";
    //this.totalTicket = 0;
    this.bsModalRef.content.totalAmount = this.totalTicket + this.totalFood;
    this.bsModalRef.content.empId = empId;

    setTimeout(() => {
      this.close();
    }, 300000); // Thời gian đóng modal sau 5 phút
  }

  close() {
    this.tickets = [];
    this._modalService.hide("booking");
      
  }

  save() {
    let booking = new BookingTickets();
    booking.cusId = this.giftChoose.find(e => e.phoneCus == this.phone)?.cusId;
    booking.empId = this.empId;
    booking.totalAmount = this.totalAmount;
    this.rowDataFood.forEach((e: any) => {
      if(Number(e.quantity) != 0) booking.listfood?.push({foodId: e.id, quantity: e.quantity});
    })
    booking.listticket = this.tickets;
    this._bookTicketService.bookingTickets(booking).subscribe({
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

  onGridReady(params: any) {
    this.gridApi = params.api
     this.search();
  }
  search() {
    this._bookTicketService.getAllFood().subscribe((res: any) => {
      this.rowDataFood = res;
      this.rowDataFood.forEach((ele: any)=> ele.quantity = 0);
    });
  }

  onCellValueChange(params: any )
  {
    this.totalFood = 0;
    this.rowDataFood.forEach((e: any) => {
      this.totalFood += e.price * e.quantity
    })
    this.totalAmount = this.totalTicket + this.totalFood;
  }
}