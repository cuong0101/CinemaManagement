import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, PaginationNumberFormatterParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { MstFood } from 'src/app/_interfaces/mstfood';
import { MstFoodService } from 'src/app/_services/mstfood.service';
import { CreateOrEditFoodComponent } from './create-or-edit-food/create-or-edit-food.component';
import { ImageFormatterComponent } from './ImageFormater.component';

@Component({
  selector: 'app-mst-food',
  templateUrl: './mst-food.component.html',
  styleUrls: ['./mst-food.component.css']
})
export class MstFoodComponent implements OnInit {
  @ViewChild("createOrEdit") food?: CreateOrEditFoodComponent
  @ViewChild("imageFormatter") imageFormatter?: ImageFormatterComponent
  colDefs?: ColDef[];
  defaultColDef?: ColDef;
  rowData?: MstFood[];
  private gridApi!: GridApi<MstFood>;
  params!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
  message: any;
  public paginationPageSize = 5;
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return '' + params.value.toLocaleString() + '';
  };
  foodSelected?: MstFood = new MstFood();

  constructor(private foodservice: MstFoodService, private toastr: ToastrService, private http: HttpClient) {
    this.colDefs = [
      {
        headerName: "Tên đồ ăn",
        field: "name",
      },
      {
        headerName: "Mô tả",
        field: "description",
      },
      {
        headerName: "Giá",
        field: "price",
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
  }

  onGridReady(params: GridReadyEvent<MstFood>) {
    this.gridApi = params.api;
    this.params = params;
    this.foodSelected = undefined;
    this.foodservice.getAll().subscribe((re: MstFood[] | undefined) => {
      this.rowData = re;
    })
  }

  onSelectionChanged(event: any) {
    const selectedRow = this.gridApi.getSelectedRows()[0];
    if (selectedRow) {
      this.foodSelected = selectedRow;
    }
  }

  delete() {
    this.message = confirm("Bạn có chắc chắn muốn xóa không?");
    if (this.message) {
      this.foodservice
        .delete(this.foodSelected?.id)
        .subscribe({
          next: () => {
            this.toastr.success("Xóa thành công!")
            this.onGridReady(this.params);
          },
          error: (ersr: any) => this.toastr.error("Xóa thất bại")
        });
    }
  }

}
