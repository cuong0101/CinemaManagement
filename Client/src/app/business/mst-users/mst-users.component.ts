import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { UserManagement } from 'src/app/_interfaces/usermanagement';
import { UsersService } from 'src/app/_services/users.service';
import { CreateOrEditUserComponent } from './create-or-edit-user/create-or-edit-user.component';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

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
  constructor(private users: UsersService, private toastr: ToastrService,) { 
    this.colDefs=[
      {
        headerName: "Họ và tên",
        field: "userName",

      },
      {
        headerName: "Ngày sinh",
        field: "doB",
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
  }

  onGridReady(params: GridReadyEvent){
    this.gridApi = params.api;
    this.params = params
    this.users.getAll().subscribe((re) => {
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
      error: (err) => this.toastr.error("Xóa thất bại")
    })
  }

}
