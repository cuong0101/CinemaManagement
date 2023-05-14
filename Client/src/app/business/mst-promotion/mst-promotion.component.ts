import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridParams,
  GridReadyEvent,
  PaginationNumberFormatterParams,
} from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { Promotion } from 'src/app/_interfaces/_iMstPromotion/promotion';
import { PromotionDetail } from 'src/app/_interfaces/_iMstPromotion/promotionDetail';
import { PromotionInput } from 'src/app/_interfaces/_iMstPromotion/promotionInput';
import { PromotionService } from 'src/app/_services/promotion.service';
import { CreateOrEditPromotionComponent } from './create-or-edit-promotion/create-or-edit-promotion.component';
import { CreateOrEditPromotionDetailComponent } from './create-or-edit-promotion-detail/create-or-edit-promotion-detail.component';

@Component({
  selector: 'app-mst-promotion',
  templateUrl: './mst-promotion.component.html',
  styleUrls: ['./mst-promotion.component.css'],
})
export class MstPromotionComponent implements OnInit {
  @ViewChild("createOrEdit") modal?: CreateOrEditPromotionComponent;
  @ViewChild("createOrEditDetail") modalDetail?: CreateOrEditPromotionDetailComponent;

  colPromoDefs?: ColDef[];
  colPromoDetailDefs?: ColDef[];
  // defaultColDef?:ColDef;
  promoData?: Promotion[];
  promoDetailData?: Promotion[];
  private gridApi!: GridApi<Promotion>;
  private gridDetailApi!: GridApi<PromotionDetail>;
  promotionSelected?: Promotion = new Promotion();
  promotionDetailSelected?: PromotionDetail = new PromotionDetail();
  params!: GridReadyEvent;
  paramsDetail!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
  promotionContent: any;
  fromDate: any;
  toDate: any;
  message:any;


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
    private _promotionService: PromotionService,
    private _toastr: ToastrService,
    private _http: HttpClient
  ) {
    this.colPromoDefs = [
      {
        headerName: 'STT',
        headerTooltip: 'STT',
        cellRenderer: (params: { rowIndex: number }) => params.rowIndex + 1,
        cellClass: ['text-center'],
        flex: 0.5,
      },
      {
        headerName: 'Nội dung CTKM',
        field: 'promotionContent',
        cellClass: ['text-center'],
        flex: 2,
      },
      {
        headerName: 'Thời gian bắt đầu KM',
        field: 'fromDate',
        valueFormatter: (params) => formatMyDate(params.value),
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Thời gian kết thúc',
        field: 'toDate',
        valueFormatter: (params) => formatMyDate(params.value),
        cellClass: ['text-center'],
        flex: 1,
      },
      {
        headerName: 'Mô tả',
        field: 'description',
        cellClass: ['text-center'],
        flex: 1,
      },
    ];

    this.colPromoDetailDefs = [
      {
        headerName: 'STT',
        headerTooltip: 'STT',
        cellRenderer: (params: { rowIndex: number }) => params.rowIndex + 1,
        cellClass: ['text-center'],
        flex: 0.5,
      },
      {
        headerName: 'Tên KH',
        field: 'cusName',
        cellClass: ['text-center'],
        flex: 2,
      },
      {
        headerName: 'Mô tả',
        field: 'description',
        cellClass: ['text-center'],
        flex: 1,
      }
    ];
  }
  ngOnInit() {
  }

  onGridReady(params: GridReadyEvent<Promotion>) {
    this.gridApi = params.api;
    this.params = params;
    this.promotionSelected = undefined;
    this.getAllPromotion();
  }

  search() {
    if (this.fromDate && this.toDate && this.subtractDate(this.fromDate, this.toDate) > 0)
    {
      this._toastr.warning("Ngày tìm kiếm không hợp lệ");
      return;
    }
    this.getAllPromotion();
  }

  getAllPromotion() {
    var input = new PromotionInput();
    input.promotionContent = this.promotionContent;
    input.fromDate = this.fromDate;
    input.toDate = this.toDate;
    this._promotionService.getAllPromotion(input).subscribe((res: any) => {
      this.promoData = res;
    });
  }

  onChangeSelection(event: any) {
    const selectedRow = event.api?.getSelectedRows()[0];
    if(selectedRow) {
      this.promotionSelected = selectedRow;
    }

    this.promotionDetailSelected = new PromotionDetail();
    if (this.promotionSelected) {
      this.promoDetailData = this.promotionSelected?.promotionDetails;
    }
  }

  onChangeSelectionDetail(paramsDetail: any) {
    this.promotionDetailSelected = paramsDetail.api?.getSelectedRows()[0] ?? new PromotionDetail();
  }

  changePage(params: any) {
    this.getAllPromotion();
  }

  subtractDate(fromDate: any, toDate: any): number {
    return Math.floor((Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()) - Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())) / (1000 * 60 * 60 * 24));
  }

  deleted(){
    this.message = confirm("Bạn có chắc chắn muốn xóa CTKM này không?");
    if(this.message)
    {
      this._promotionService
      .delete(this.promotionSelected?.id)
      .subscribe({
        next:() => {
          this._toastr.success("Xóa thành công!")
          this.onGridReady(this.params);
        },
        error: (ersr: any) => this._toastr.error("Xóa thất bại")
      });
    }
  }

  deletedDetail(){
    this.message = confirm("Bạn có chắc chắn muốn xóa Khách hàng này không?");
    if(this.message)
    {
      this._promotionService
      .deleteDetail(this.promotionDetailSelected?.id)
      .subscribe({
        next:() => {
          this._toastr.success("Xóa thành công!")
          this.onGridReady(this.params);
        },
        error: (ersr: any) => this._toastr.error("Xóa thất bại")
      });
    }
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
