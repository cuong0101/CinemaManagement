import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, PaginationNumberFormatterParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { MstMovieManagement } from 'src/app/_interfaces/moviemanagement';
import { MstMovieService } from 'src/app/_services/mstmovie.service';
import { CreateOrEditMovieComponent } from './create-or-edit-movie/create-or-edit-movie.component';
import { log } from 'console';
import * as moment from 'moment';

@Component({
  selector: 'app-mst-movie',
  templateUrl: './mst-movie.component.html',
  styleUrls: ['./mst-movie.component.css']
})
export class MstMovieComponent implements OnInit {
  @ViewChild("createOrEdit") movie?: CreateOrEditMovieComponent
  
  colDefs?: ColDef[];
  defaultColDef?:ColDef;
  rowData?: MstMovieManagement[];
  private gridApi!: GridApi<MstMovieManagement>;
  movieSelected?: MstMovieManagement = new MstMovieManagement();
  params!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
  message:any;
  public paginationPageSize = 5;
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return '' + params.value.toLocaleString() + '';
  };
  
  constructor(private movies: MstMovieService, private toastr: ToastrService,private http: HttpClient, private mstmovieService: MstMovieService) { 
    this.colDefs=[
      {
        headerName: "Name",
        field: "name",
      },
      {
        headerName: "Publish Date",
        field: "publishDate",
        valueFormatter: (params) => formatMyDate(params.value)
      },
      {
        headerName: "Time",
        field: "time",
      },
      {
        headerName: "Language",
        field: "languages",
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
    this.movieSelected = undefined;
  }

  onGridReady(params: GridReadyEvent<MstMovieManagement>){
    this.gridApi = params.api;
    this.params = params;
    this.movieSelected = undefined;
    this.mstmovieService.getAll().subscribe((re: MstMovieManagement[] | undefined) => {
      this.rowData = re;
      console.log(this.rowData)
    })
  }

  onSelectionChanged(event: any){
    const selectedRow = this.gridApi.getSelectedRows()[0];
    if(selectedRow) {
      this.movieSelected = selectedRow;
    }
  }

  delete(){
    this.message = confirm("Bạn có chắc chắn muốn xóa không?");
    if(this.message)
    {
      this.movies
      .delete(this.movieSelected?.id)
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

function formatMyDate(date: Date): string {
  if (date == null) return '';
  const dateFormat = 'dd/MM/yyyy';
  return new Date(date).toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit'});
}

