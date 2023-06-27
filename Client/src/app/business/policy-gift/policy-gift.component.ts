import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent,PaginationNumberFormatterParams } from 'ag-grid-community';
import { PolicyGift } from 'src/app/_interfaces/policygift';
import {  PolicyGiftsService } from 'src/app/_services/policygift.service';
import { CreateOrEditPolicyGiftComponent } from './create-or-edit-policy-gift/create-or-edit-policy-gift.component';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-policy-gift',
  templateUrl: './policy-gift.component.html',
  styleUrls: ['./policy-gift.component.css']
})
export class PolicyGiftComponent implements OnInit {
  public checked:boolean = false;
  @ViewChild("createOrEdit") policygift?: CreateOrEditPolicyGiftComponent
  colDefs?: ColDef[];
  defaultColDef?:ColDef;
  rowData?:  PolicyGift[];
  private gridApi?: GridApi;
  policygiftSelected?:  PolicyGift = new  PolicyGift();
  params!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
  message:any;
  public paginationPageSize = 5;
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return '' + params.value.toLocaleString() + '';
  };
  
  constructor(private policygifts:  PolicyGiftsService,
     private toastr: ToastrService,) { 
    this.colDefs=[
      {
        headerName: "GiftName",
        field: "giftName",

      },
      {
        headerName: "Point",
        field: "point",
      },
      {
        headerName: "IsStatus",
        field: "isStatus",
      },
    
      {
        headerName: "FromDate",
        field: "fromDate",
      },
      {
        headerName: "ToDate",
        field: "toDate",
      },
      {
        headerName: "Description",
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
    this.policygiftSelected = undefined;
  }

  onGridReady(params: GridReadyEvent){
    this.gridApi = params.api;
    this.params = params
    this.policygiftSelected = undefined;
    this.policygifts.getAll().subscribe((re : PolicyGift[] | undefined) => {
      this.rowData = re;
    })
  }

  onSelectionChanged(event: any){
    this.checked = true;
    const selectedRow = this.gridApi?.getSelectedRows()[0];
    if(selectedRow) this.policygiftSelected = selectedRow;
  }

  deleted(){
    this.message = confirm("Bạn có chắc chắn muốn xóa không?");
    if(this.message)
    {
      this.policygifts
      .delete(this.policygiftSelected?.id)
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