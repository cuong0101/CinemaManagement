import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent,PaginationNumberFormatterParams } from 'ag-grid-community';
import { Room } from 'src/app/_interfaces/room';
import { RoomsService } from 'src/app/_services/room.service';
import { CreateOrEditRoomComponent } from './create-or-edit-room/create-or-edit-room.component';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
@Component({
  selector: 'app-mst-room',
  templateUrl: './mst-room.component.html',
  styleUrls: ['./mst-room.component.css']
})
export class MstRoomComponent implements OnInit {
  public checked:boolean = false;
  @ViewChild("createOrEdit") room?: CreateOrEditRoomComponent
  colDefs?: ColDef[];
  defaultColDef?:ColDef;
  rowData?: Room[];
  private gridApi?: GridApi;
  roomSelected?: Room = new Room();
  params!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
  message:any;
  public paginationPageSize = 5;
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return '' + params.value.toLocaleString() + '';
  };
  
  constructor(private rooms: RoomsService,
     private toastr: ToastrService,) { 
    this.colDefs=[
      {
        headerName: "Tên Phòng",
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
    this.roomSelected = undefined;
  }

  onGridReady(params: GridReadyEvent){
    this.gridApi = params.api;
    this.params = params
    this.roomSelected = undefined;
    this.rooms.getAll().subscribe((re :Room[] | undefined) => {
      this.rowData = re;
    })
  }

  onSelectionChanged(event: any){
    this.checked = true;
    const selectedRow = this.gridApi?.getSelectedRows()[0];
    if(selectedRow) this.roomSelected = selectedRow;
  }

  deleted(){
    this.message = confirm("Bạn có chắc chắn muốn xóa không?");
    if(this.message)
    {
      this.rooms
      .delete(this.roomSelected?.id)
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