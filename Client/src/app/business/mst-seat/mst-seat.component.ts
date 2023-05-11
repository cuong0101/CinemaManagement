import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent,PaginationNumberFormatterParams } from 'ag-grid-community';
import { Seat } from 'src/app/_interfaces/seat';
import { SeatsService } from 'src/app/_services/seat.service';
import { CreateOrEditSeatComponent } from './create-or-edit-seat/create-or-edit-seat.component';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-mst-seat',
  templateUrl: './mst-seat.component.html',
  styleUrls: ['./mst-seat.component.css']
})
export class MstSeatComponent implements OnInit {
  public checked:boolean = false;
  @ViewChild("createOrEdit") seat?: CreateOrEditSeatComponent
  colDefs?: ColDef[];
  defaultColDef?:ColDef;
  rowData?: Seat[];
  private gridApi?: GridApi;
  seatSelected?: Seat = new Seat();
  params!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
  message:any;
  public paginationPageSize = 5;
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return '' + params.value.toLocaleString() + '';
  };
  
  constructor(private seats: SeatsService,
     private toastr: ToastrService,) { 
    this.colDefs=[
      {
        headerName: "Hàng",
        field: "row",

      },
      {
        headerName: "Cột",
        field: "column",
      },
      {
        headerName: "Phòng",
        field: "nameRoom",
      },
      {
        headerName: "Loại Ghế",
        field: "nameSeatRank",
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
    this.seatSelected = undefined;
  }

  onGridReady(params: GridReadyEvent){
    this.gridApi = params.api;
    this.params = params
    this.seatSelected = undefined;
    this.seats.getAll().subscribe((re :Seat[] | undefined) => {
      this.rowData = re;
    })
  }

  onSelectionChanged(event: any){
    this.checked = true;
    const selectedRow = this.gridApi?.getSelectedRows()[0];
    if(selectedRow) this.seatSelected = selectedRow;
  }

  deleted(){
    this.message = confirm("Bạn có chắc chắn muốn xóa không?");
    if(this.message)
    {
      this.seats
      .delete(this.seatSelected?.id)
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