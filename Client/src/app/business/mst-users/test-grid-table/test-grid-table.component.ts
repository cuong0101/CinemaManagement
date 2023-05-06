import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-test-grid-table',
  templateUrl: './test-grid-table.component.html',
  styleUrls: ['./test-grid-table.component.css']
})
export class TestGridTableComponent implements OnInit {
  private gridApi!: GridApi;
  columnDefs:any = [];
  defaultColDef:any;
  rowData: any = [];
  constructor() { 
    this.columnDefs = [
      { field: 'make' },
      { field: 'model' },
      { field: 'price'}
    ];

    this.rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000},
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 },
    ];

    this.defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
    };
  }
  ngOnInit() {
  }
  onSelectionChanged(event: any){
    const selectedRow = event.api.getSelectedRows()[0];
    console.log(selectedRow.make);
  }

}
