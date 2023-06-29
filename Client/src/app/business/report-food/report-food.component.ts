import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, PaginationNumberFormatterParams } from 'ag-grid-community';
import { da } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from 'src/app/_services/report.service';
import { Report } from 'src/app/_interfaces/report';
import { ReportDateInput } from 'src/app/_interfaces/reportDateInput';
type NewType = ColDef;
@Component({
  selector: 'app-report-food',
  templateUrl: './report-food.component.html',
  styleUrls: ['./report-food.component.css']
})
export class ReportFoodComponent implements OnInit {
  colDefs?: ColDef[];
  defaultColDef?:NewType;
  rowData?: Report[];
  private gridApi!: GridApi<Report>;
  reportSelected?: Report = new Report();
  params!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
  message:any;
  public paginationPageSize = 5;
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return '' + params.value.toLocaleString() + '';
  };
  fromDate: any;
  toDate: any;
  reportDateInput: ReportDateInput = new ReportDateInput();
  constructor(private reportFoodService: ReportService, private toastr: ToastrService, private http: HttpClient) 
  { 
    this.colDefs=[
      {
        headerName: "Tên món ăn",
        field: "name",
        minWidth: 200,
      },
      {
        headerName: "Doanh thu",
        field: "doanhThu",
        minWidth: 200,
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

  onGridReady(params: GridReadyEvent<Report>) {
    this.gridApi = params.api;
    this.params = params;
    this.reportSelected = undefined;
    this.getAll();
  }

  onSelectionChanged(event: any) {
    const selectedRow = this.gridApi.getSelectedRows()[0];
    if (selectedRow) {
      this.reportSelected = selectedRow;
    }
  }

  getAll() {
    var input = new ReportDateInput();
    input.from = this.fromDate;
    input.to = this.toDate;
    this.reportFoodService.doanhThuDoAn(input).subscribe((res: any) => {
      this.rowData = res;
    });
  }

  search() {
    if (this.fromDate && this.toDate && this.subtractDate(this.fromDate, this.toDate) > 0) {
      this.toastr.warning("Ngày tìm kiếm không hợp lệ");
      return;
    }
    this.getAll();
  }

  subtractDate(fromDate: any, toDate: any): number {
    return Math.floor((Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()) - Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())) / (1000 * 60 * 60 * 24));
  }
  export()
  {
    this.gridApi.exportDataAsCsv({
      fileName: 'DoanhThuDoAn.csv',
    });
  }

}
