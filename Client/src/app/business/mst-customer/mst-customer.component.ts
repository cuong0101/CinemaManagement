import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, PaginationNumberFormatterParams  } from 'ag-grid-community';
import { Customer } from 'src/app/_interfaces/customer';
import { CustomersService } from 'src/app/_services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { CreateOrEditCustomerComponent } from './create-or-edit-customer/create-or-edit-customer.component';
import { FormatService } from 'src/app/_services/format-service.service';


@Component({
  selector: 'app-mst-customer',
  templateUrl: './mst-customer.component.html',
  styleUrls: ['./mst-customer.component.css']
})
export class MstCustomersComponent implements OnInit {
  @ViewChild("createOrEdit") customer?: CreateOrEditCustomerComponent
  public checked:boolean = false;
  colDefs?: ColDef[];
  defaultColDef?:ColDef;
  rowData?: Customer[];
  private gridApi?: GridApi;
  customerSelected?: Customer = new Customer();
  params!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
  message:any;
  public paginationPageSize =50;
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return '' + params.value.toLocaleString() + '';
  };
  constructor(private customers: CustomersService, 
    private toastr: ToastrService,    
    private _format: FormatService
    ) { 
    this.colDefs=[
      {
        headerName: "Tên khách hàng",
        field: "name",

      },
      {
        headerName: "Image",
        field: "image",
      },
      {
        headerName: "Địa chỉ",
        field: "address",
      },
      {
        headerName: "Số điện thoại",
        field: "phone",
      },
      {
        headerName: "DoB",
        field: "doB",
        valueFormatter: (params) => this._format.formatMyDate(params.value),
      },
      {
        headerName: "Giới tính",
        field: "sex",
        valueFormatter: (params)=> params.data.sex == true ? "Nam" : "Nữ"
      },
      {
        headerName: "Email",
        field: "email",
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
    this.checked = false;
    this.customerSelected = undefined;
  }

  onGridReady(params: GridReadyEvent){
    this.gridApi = params.api;
    this.params = params;
    this.customerSelected = undefined;
    this.customers.getAll().subscribe((re:any) => {
      this.rowData = re.data;
    })
  }

  onSelectionChanged(event: any){
    this.checked = true;
    const selectedRow = this.gridApi?.getSelectedRows()[0];
    if(selectedRow) this.customerSelected = selectedRow;
  }
  deleted(){
    this.message = confirm("Bạn có chắc chắn muốn xóa không?");
    if(this.message)
    {
      this.customers
      .delete(this.customerSelected?.id)
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
