import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent,PaginationNumberFormatterParams } from 'ag-grid-community';
import { SeatRank } from 'src/app/_interfaces/seatrank';
import { SeatRanksService } from 'src/app/_services/seatrank.service';
import { CreateOrEditSeatrankComponent } from './create-or-edit-seatrank/create-or-edit-seatrank.component';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
@Component({
  selector: 'app-mst-seatranks',
  templateUrl: './mst-seatranks.component.html',
  styleUrls: ['./mst-seatranks.component.css']
})
export class MstSeatranksComponent implements OnInit {
  public checked:boolean = false;
  @ViewChild("createOrEdit") seatrank?: CreateOrEditSeatrankComponent
  colDefs?: ColDef[];
  defaultColDef?:ColDef;
  rowData?: SeatRank[];
  private gridApi?: GridApi;
  seatrankSelected?: SeatRank = new SeatRank();
  params!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
  message:any;
  public paginationPageSize = 5;
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return '' + params.value.toLocaleString() + '';
  };
  
  constructor(private seatranks: SeatRanksService,
     private toastr: ToastrService,) { 
    this.colDefs=[
      {
        headerName: "Tên hạng ghế",
        field: "name",

      },
      {
        headerName: "Mô tả",
        field: "description",
      }
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
    this.rowData = [];
    this.checked = false;
    this.seatrankSelected = undefined;
  }

  onGridReady(params: GridReadyEvent){
    this.gridApi = params.api;
    this.params = params
    this.seatrankSelected = undefined;
    this.seatranks.getAll().subscribe((re :SeatRank[] | undefined) => {
      this.rowData = re;
    })
  }

  onSelectionChanged(event: any){
    this.checked = true;
    const selectedRow = this.gridApi?.getSelectedRows()[0];
    if(selectedRow) this.seatrankSelected = selectedRow;
  }

  deleted(){
    this.message = confirm("Bạn có chắc chắn muốn xóa không?");
    if(this.message)
    {
      this.seatranks
      .delete(this.seatrankSelected?.id)
      .subscribe({
        next:() => {
          this.toastr.success("Xóa thành công!")
          this.onGridReady(this.params);
        },
        error: (ersr: any) => this.toastr.error("Xóa thất bại")
      });
    }
  }
}