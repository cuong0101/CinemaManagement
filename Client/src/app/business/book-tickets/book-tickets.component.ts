import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, PaginationNumberFormatterParams } from 'ag-grid-community';
import { CreateBookTicketsComponent } from './create-book-tickets/create-book-tickets.component';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css']
})
export class BookTicketsComponent implements OnInit {
  @ViewChild("createOrEdit") modal?: CreateBookTicketsComponent;

  colShowTimeDefs?: ColDef[];
  colTicketsDefs?: ColDef[];
  // defaultColDef?:ColDef;
  // showTimeData?: Promotion[];
  // ticketData?: Promotion[];
  // private gridApi!: GridApi<Promotion>;
  // private gridTicketApi!: GridApi<PromotionDetail>;
  // showTimeSelected?: Promotion = new Promotion();
  // ticketSelected?: PromotionDetail = new PromotionDetail();
  paramsShowTime!: GridReadyEvent;
  paramsTicket!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';

  movie: any;
  searchDate: any;

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
    floatingFilter: true,
  };

  constructor(

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
        field: 'movie',
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Ngày chiếu',
        field: 'showTimeDate',
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Thời gian bắt đầu chiếu phim',
        field: 'startTime',
        valueFormatter: (params) => formatMyDate(params.value),
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Thời lượng phim',
        field: 'toDate',
        valueFormatter: (params) => formatMyDate(params.value),
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Phòng chiếu',
        field: 'room',
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
        headerName: 'Tên phim',
        field: 'movie',
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Vị trí',
        field: 'local',
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Hạng ghế',
        field: 'startTime',
        valueFormatter: (params) => formatMyDate(params.value),
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Trạng thái',
        field: 'staus',
        valueFormatter: (params) => params.value == 1 ? "Đã đặt" : "Chưa đặt",
        cellClass: ['text-center'],
        flex: 1,
      },
    ];
  }

  ngOnInit() {
  }

  onGridReady(params: any) {

  }

  onChangeSelection(params: any) {

  }

  onChangeSelectionDetail(params: any) {

  }

  search() {

  }
  changePage(params: any) {

  }
}


function formatMyDate(date: any): string {
  if (date == null) return '';
  const dateFormat = 'dd/MM/yyyy';
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function formatMyTime(date: any): string {
  if (date == null) return '';
  const dateFormat = 'dd/MM/yyyy';
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
