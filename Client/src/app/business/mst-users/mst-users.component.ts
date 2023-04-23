import { Component, OnInit } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { UserManagement } from 'src/app/_interfaces/usermanagement';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-mst-users',
  templateUrl: './mst-users.component.html',
  styleUrls: ['./mst-users.component.css']
})
export class MstUsersComponent implements OnInit {

  colDefs?: ColDef[];
  defaultColDef?:ColDef;
  rowData?: UserManagement[]
  constructor(private users: UsersService) { 
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
    this.users.getAll().subscribe((re) => {
      this.rowData = re;
    })
  }

}
