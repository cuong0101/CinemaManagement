import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, PaginationNumberFormatterParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { MstMovieManagement } from 'src/app/_interfaces/moviemanagement';
import { MstShowtimeManagement } from 'src/app/_interfaces/showtimemanagement';
import { MstMovieService } from 'src/app/_services/mstmovie.service';
import { MstShowTimeService } from 'src/app/_services/mstshowtime.service';

@Component({
  selector: 'app-mst-show-time',
  templateUrl: './mst-show-time.component.html',
  styleUrls: ['./mst-show-time.component.css']
})
export class MstShowTimeComponent implements OnInit {

  colDefs?: ColDef[];
  defaultColDef?:ColDef;
  rowData?: MstShowtimeManagement[];
  private gridApi!: GridApi<MstShowtimeManagement>;
  showSelected?: MstShowtimeManagement = new MstShowtimeManagement();
  params!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
  message:any;
  public paginationPageSize = 5;
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return '' + params.value.toLocaleString() + '';
  };

  constructor(private showtimeService: MstShowTimeService, private toastr: ToastrService,private http: HttpClient) { 
    this.colDefs=[
      {
        headerName: "Start Date",
        field: "startDate",
      },
      {
        headerName: "Start Time",
        field: "startTime",
      },
      {
        headerName: "Time",
        field: "time",
      },
      {
        headerName: "Movie Name",
        field: "movieName",
      },
      {
        headerName: "Room Name",
        field: "movieName",
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
  }

  onGridReady(params: GridReadyEvent<MstShowtimeManagement>){
    this.gridApi = params.api;
    this.params = params;
    this.showSelected = undefined;
    this.showtimeService.getAll().subscribe((re: MstShowtimeManagement[] | undefined) => {
      this.rowData = re;
      console.log(this.rowData)
    })
  }

  onSelectionChanged(event: any){
    const selectedRow = this.gridApi.getSelectedRows()[0];
    if(selectedRow) {
      this.showSelected = selectedRow;
    }
  }

}
