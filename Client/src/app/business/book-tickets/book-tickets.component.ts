import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, PaginationNumberFormatterParams } from 'ag-grid-community';
import { CreateBookTicketsComponent } from './create-book-tickets/create-book-tickets.component';
import { BookTickets } from 'src/app/_interfaces/booktickets';
import { TicketByShowTime } from 'src/app/_interfaces/listTickets';
import { BookticketService } from 'src/app/_services/bookticket.service';
import * as moment from 'moment';
import { FormatService } from 'src/app/_services/format-service.service';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css']
})
export class BookTicketsComponent implements OnInit {
  @ViewChild("createOrEdit") modal?: CreateBookTicketsComponent;

  colShowTimeDefs?: ColDef[];
  colTicketsDefs?: ColDef[];
  showTimeData?: BookTickets[];
  ticketData?: TicketByShowTime[];
  private gridApi!: GridApi<BookTickets>;
  private gridTicketApi!: GridApi<TicketByShowTime>;
  showTimeSelected: BookTickets = new BookTickets();
  ticketSelected: TicketByShowTime = new TicketByShowTime();
  paramsShowTime!: GridReadyEvent;
  paramsTicket!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';

  movie: any;
  searchDate: any;

  listTicketSelected: string[] = [];
  public paginationPageSize = 5;
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return '' + params.value.toLocaleString() + '';
  };
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    // floatingFilter: true,
  };
empId!: number;
  constructor(
    private _bookTicketService: BookticketService,
    private _format: FormatService

  ) {

    this.colShowTimeDefs = [
      {
        headerName: 'STT',
        headerTooltip: 'STT',
        cellRenderer: (params: { rowIndex: number }) => params.rowIndex + 1,
        cellClass: ['text-center'],
        flex: 0.5,
      },
      {
        headerName: 'Tên phim',
        field: 'name',
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Ngày chiếu',
        field: 'startDate',
        valueFormatter: (params) => this._format.formatMyDate(params.value),
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Thời gian bắt đầu chiếu phim',
        field: 'startTime',
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Thời lượng phim',
        field: 'time',
        //valueFormatter: (params) => this._format.formatHour(params.value),
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Phòng chiếu',
        field: 'roomName',
        cellClass: ['text-center'],
        flex: 1,
      },
    ];

    this.colTicketsDefs = [
      {
        headerName: "",
        headerTooltip: "",
        field: "checked",
        cellClass: ["check-box-center", "cell-border", "text-center"],
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        pinned: true,
        width: 1,
      },
      {
        headerName: 'Vị trí',
        field: 'location',
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Hạng ghế',
        field: 'seatrank',
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Giá vé',
        field: 'price',
        valueFormatter: (params) => this._format.moneyFormat(params.value),
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Trạng thái',
        field: 'status',
        valueFormatter: (params) => params.value == 0 ? "Chưa đặt" : params.value == 2 ? "Đang chọn" : "Đã đặt",
        cellClass: ['text-center'],
        flex: 1,
      },
    ];
  }

  ngOnInit() {
    this._bookTicketService.getMyEmpInfo().subscribe((re: any) => {
      this.empId = re.data.id;
    })
  }

  onGridReady(params: any) {
    this.gridApi = params.api
     this.search();
  }

  onChangeSelection(params: any) {
    this.ticketData = [];
    const selectedRow = params.api?.getSelectedRows()[0];
    if(selectedRow) {
      this.showTimeSelected = selectedRow;
      this.onGridReadyTicket(this.paramsTicket);
    }
  }

  onChangeSelectionTicket(params: any) {
    this.ticketSelected = params.api?.getSelectedRows()[0] ?? new TicketByShowTime();
    
  }


  search() {
    this._bookTicketService.getMovieInfor(this.searchDate, this.movie).subscribe((res: any) => {
      this.showTimeData = res;
    });
  }

  onGridReadyTicket(params: any) {
    this.paramsTicket = params;
    this.gridTicketApi = params.api;
    this._bookTicketService.GetTicketByShowtimeAdmin(this.showTimeSelected.id).subscribe((re:any)=> {
      this.ticketData = re;
    })
  }


  modalShow(){
    let listTicket: any[] = []
    this.gridTicketApi.forEachNode(e => {
      if(e.isSelected()){
        listTicket.push({id: e.data?.id, chair: e.data?.location, price: e.data?.price})
      }
        
    })
    this.modal?.show(this.showTimeSelected, listTicket, this.empId)
  }
}
