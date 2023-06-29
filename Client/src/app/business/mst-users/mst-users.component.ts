import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { UserManagement } from 'src/app/_interfaces/usermanagement';
import { UsersService } from 'src/app/_services/users.service';
import { CreateOrEditUserComponent } from './create-or-edit-user/create-or-edit-user.component';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { FormatService } from 'src/app/_services/format-service.service';

@Component({
  selector: 'app-mst-users',
  templateUrl: './mst-users.component.html',
  styleUrls: ['./mst-users.component.css']
})
export class MstUsersComponent implements OnInit {

  @ViewChild("createOrEdit") user?: CreateOrEditUserComponent
  colDefs?: ColDef[];
  defaultColDef?:ColDef;
  rowData?: UserManagement[];
  private gridApi?: GridApi;
  userSelected: UserManagement = new UserManagement();
  params!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
  constructor(private users: UsersService, 
    private toastr: ToastrService,
    private _format: FormatService
    ) { 
    this.colDefs=[
      {
        headerName: "Username",
        field: "userName",
        flex:1
      },
      {
        headerName: "Image",
        field: "image",
        flex:1
      },
      {
        headerName: "Địa chỉ",
        field: "address",
        flex:1
      },
      {
        headerName: "Số điện thoại",
        field: "phone",
        flex:1
      },
      {
        headerName: "DoB",
        field: "doB",
        valueFormatter: (params) => this._format.formatMyDate(params.value),
        flex:1
      },
      {
        headerName: "Giới tính",
        field: "sex",
        valueFormatter: (params)=> params.data.sex == true ? "Nam" : "Nữ",
        flex:1
      },
      {
        headerName: "Email",
        field: "email",
        flex:1
      },
    ];
    this.defaultColDef = {
      flex:1,
      sortable: true,
      filter: true,
      resizable: true,

    };
  }

  ngOnInit() {
    this.rowData = [];
  }

  onGridReady(params: GridReadyEvent){
    this.gridApi = params.api;
    this.params = params
    this.users.getAll().subscribe((re: UserManagement[] | undefined) => {
      this.rowData = re;
    })
  }

  onSelectionChanged(event: any){
    const selectedRow = this.gridApi?.getSelectedRows()[0];
    if(selectedRow) this.userSelected = selectedRow;
  }

  deleted(){
    this.users.delete(this.userSelected.id).subscribe({
      next:() => this.toastr.success("Xóa thành công!"),
      error: (ersr: any) => this.toastr.error("Xóa thất bại")
    })
  }

}
