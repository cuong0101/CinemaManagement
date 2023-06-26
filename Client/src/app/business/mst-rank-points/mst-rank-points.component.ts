import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, PaginationNumberFormatterParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { RankPoints } from 'src/app/_interfaces/rankpoints';
import { RankpointsService } from 'src/app/_services/rankpoints.service';
import { CreateOrEditMstRankPointsComponent } from './create-or-edit-mst-rank-points/create-or-edit-mst-rank-points.component';

@Component({
  selector: 'app-mst-rank-points',
  templateUrl: './mst-rank-points.component.html',
  styleUrls: ['./mst-rank-points.component.css']
})
export class MstRankPointsComponent implements OnInit {
  @ViewChild("createOrEdit") rankpoint?: CreateOrEditMstRankPointsComponent
  colDefs?: ColDef[];
  defaultColDef?:ColDef;
  rowData?: RankPoints[];
  private gridApi!: GridApi<RankPoints>;
  rankpointSelected?: RankPoints = new RankPoints();
  params!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
  message:any;
  public paginationPageSize = 5;
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return '' + params.value.toLocaleString() + '';
  };

  constructor(private rankpoints: RankpointsService, private toastr: ToastrService,private http: HttpClient, ) {
    this.colDefs=[
      {
        headerName: "Thứ Hạng",
        field: "grade",
      },
      {
        headerName: "Hoạt động",
        field: "isActive",
        //valueFormatter: (params) => formatMyDate(params.value)
      },
      {
        headerName: "Ngày hoạt động",
        field: "operationDate",
      },
      {
        headerName: "Ngày hết hạn",
        field: "expirationDate",
      },
      {
        headerName: "Số lần mua vé cần đạt được",
        field: "numberOfVisit",
      },
      {
        headerName: "Mô tả",
        field: "description",
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
    this.rowData = [];
    this.rankpointSelected = undefined;
  }

  onGridReady(params: GridReadyEvent<RankPoints>){
    this.gridApi = params.api;
    this.params = params;
    this.rankpointSelected = undefined;
    this.rankpoints.getAll().subscribe((re) => {
      this.rowData = re;
    })
  }

  onSelectionChanged(event: any){
    const selectedRow = this.gridApi.getSelectedRows()[0];
    if(selectedRow) {
      this.rankpointSelected = selectedRow;
    }
  }

  delete(){
    this.message = confirm("Bạn có chắc chắn muốn xóa không?");
    if(this.message)
    {
      this.rankpoints
      .delete(this.rankpointSelected?.id)
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
