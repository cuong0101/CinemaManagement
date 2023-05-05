import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
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
  seatrankSelected: SeatRank = new SeatRank();
  params!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
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
      resizable: true
    };
  }

  ngOnInit() {
    this.rowData = [];
    this.checked = false;
  }

  onGridReady(params: GridReadyEvent){
    this.gridApi = params.api;
    this.params = params
    this.seatranks.getAll().subscribe((re) => {
      this.rowData = re;
    })
  }

  onSelectionChanged(event: any){
    this.checked = true;
    const selectedRow = this.gridApi?.getSelectedRows()[0];
    if(selectedRow) this.seatrankSelected = selectedRow;
  }

  deleted(){
    this.seatranks.delete(this.seatrankSelected.id).subscribe({
      next:() => this.toastr.success("Xóa thành công!"),
      error: (err) => this.toastr.error("Xóa thất bại")
    }
    )
    location.reload();
  }

}