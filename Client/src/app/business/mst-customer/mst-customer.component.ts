import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Customer } from 'src/app/_interfaces/customer';
import { CustomersService } from 'src/app/_services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-mst-customer',
  templateUrl: './mst-customer.component.html',
  styleUrls: ['./mst-customer.component.css']
})
export class MstCustomersComponent implements OnInit {
  colDefs?: ColDef[];
  defaultColDef?:ColDef;
  rowData?: Customer[];
  private gridApi?: GridApi;
  customerSelected: Customer = new Customer();
  params!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
  constructor(private customers: CustomersService, private toastr: ToastrService,) { 
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
      },
      {
        headerName: "Giới tính",
        field: "sex",
      },
      {
        headerName: "Email",
        field: "email",
      },
    ];
    this.defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true
    };
  }

  ngOnInit() {
    this.rowData = [];
  }

  onGridReady(params: GridReadyEvent){
    this.gridApi = params.api;
    this.params = params
    this.customers.getAll().subscribe((re) => {
      console.log(re)
      this.rowData = re;
    })
  }

  onSelectionChanged(event: any){
    const selectedRow = this.gridApi?.getSelectedRows()[0];
    if(selectedRow) this.customerSelected = selectedRow;
  }
}
