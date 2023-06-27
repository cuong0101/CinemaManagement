import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, PaginationNumberFormatterParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { RankpointsService } from 'src/app/_services/rankpoints.service';
import { CreateOrEditMstRankPointsComponent } from './create-or-edit-mst-rank-points/create-or-edit-mst-rank-points.component';
import { RankPoints } from 'src/app/_interfaces/RankPoint/rankpoints';
import { Benefits } from 'src/app/_interfaces/RankPoint/benefits';
import { CreateOrEditBenefitsComponent } from './create-or-edit-benefits/create-or-edit-benefits.component';

@Component({
  selector: 'app-mst-rank-points',
  templateUrl: './mst-rank-points.component.html',
  styleUrls: ['./mst-rank-points.component.css']
})
export class MstRankPointsComponent implements OnInit {
  @ViewChild("createOrEdit") rankpoint?: CreateOrEditMstRankPointsComponent
  @ViewChild("createOrEditBenefits") benefits?: CreateOrEditBenefitsComponent
  colDefs?: ColDef[];
  benefitsColDefs?: ColDef[];
  defaultColDef?:ColDef;
  rowData?: RankPoints[];
  benefitsData?: Benefits[];
  private gridApi!: GridApi<RankPoints>;
  rankpointSelected: RankPoints = new RankPoints();
  benefitsSelected: Benefits = new Benefits();
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

    this.benefitsColDefs=[
      {
        headerName: "Quyền lợi",
        field: "name",
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
    this.rankpointSelected = new RankPoints();
  }

  onGridReady(params: GridReadyEvent<RankPoints>){
    this.gridApi = params.api;
    this.params = params;
    this.rankpointSelected = new RankPoints();
    this.rankpoints.getAll().subscribe((re) => {
      this.rowData = re;
    })
  }

  onSelectionChanged(event: any){
    const selectedRow = this.gridApi.getSelectedRows()[0];
    if(selectedRow) {
      this.rankpointSelected = selectedRow;
    }
    this.benefitsSelected = new Benefits();
    if (this.rankpointSelected) {
      this.benefitsData = this.rankpointSelected?.benefits;
    }
  }

  onSelectionBenefitsChanged(event: any) {
    this.benefitsSelected = event.api?.getSelectedRows()[0] ?? new Benefits();
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

  deleteBenefit(){
    this.message = confirm("Bạn có chắc chắn muốn xóa không?");
    if(this.message)
    {
      this.rankpoints.deleteBenefits(this.benefitsSelected?.id)
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
