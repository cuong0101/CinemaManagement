import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, PaginationNumberFormatterParams, ValueGetterParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HistoryChangeGift } from 'src/app/_interfaces/historychangegift';
import { HistoryChangeGiftService } from 'src/app/_services/history-change-gift.service';

type NewType = ColDef;

@Component({
  selector: 'app-history-change-gift',
  templateUrl: './history-change-gift.component.html',
  styleUrls: ['./history-change-gift.component.css']
})
export class HistoryChangeGiftComponent implements OnInit {
  colDefs?: ColDef[];
  defaultColDef?:NewType;
  rowData?: HistoryChangeGift[];
  private gridApi!: GridApi<HistoryChangeGift>;
  historyChangeGiftSelected?: HistoryChangeGift = new HistoryChangeGift();
  params!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
  message:any;
  public paginationPageSize = 5;
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return '' + params.value.toLocaleString() + '';
  };
  constructor(private historyChangeGiftService: HistoryChangeGiftService, private toastr: ToastrService, private http: HttpClient) 
  { 
    this.colDefs=[
      {
        headerName: "Mã đổi quà",
        field: "changeGiftCode",
      },
      {
        headerName: "Mã quà",
        field: "giftId",
      },
      {
        headerName: "Tên quà",
        field: "giftName",
      },
      {
        headerName: "Điểm quy đổi",
        field: "giftPoint",
      },
      {
        headerName: "Mã khách",
        field: "cusId",
      },
      {
        headerName: "SDT khách",
        field: "phoneCus",
      },
      {
        headerName: "Trạng thái",
        field: "usedStatus",
        valueGetter: (params: ValueGetterParams) => { return params.data.usedStatus == true ? "Đã sử dụng" : "Chưa sử dụng" }
      },
      
    ];
    this.defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      floatingFilter: true,
    };
  }

  ngOnInit() {
  }

  onGridReady(params: GridReadyEvent<HistoryChangeGift>) {
    this.gridApi = params.api;
    this.params = params;
    this.historyChangeGiftSelected = undefined;
    this.historyChangeGiftService.getAllRedeemVoucher().subscribe((re: HistoryChangeGift[] | undefined) => {
      this.rowData = re;
    })
  }

  onSelectionChanged(event: any) {
    const selectedRow = this.gridApi.getSelectedRows()[0];
    if (selectedRow) {
      this.historyChangeGiftSelected = selectedRow;
    }
  }

}
