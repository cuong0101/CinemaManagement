import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { MstMovieManagement } from 'src/app/_interfaces/moviemanagement';
import { UserManagement } from 'src/app/_interfaces/usermanagement';
import { MstMovieService } from 'src/app/_services/mstmovie.service';

@Component({
  selector: 'app-mst-movie',
  templateUrl: './mst-movie.component.html',
  styleUrls: ['./mst-movie.component.css']
})
export class MstMovieComponent implements OnInit {
  colDefs?: ColDef[];
  defaultColDef?:ColDef;
  rowData?: MstMovieManagement[];
  private gridApi!: GridApi<MstMovieManagement>;
  movieSelected: MstMovieManagement = new MstMovieManagement();
  params!: GridReadyEvent;
  rowSelection: 'single' | 'multiple' = 'single';
  message:any;
  
  constructor(private movies: MstMovieService, private toastr: ToastrService,private http: HttpClient) { 
    this.colDefs=[
      {
        headerName: "Name",
        field: "name",
      },
      {
        headerName: "Director",
        field: "director",
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

  onGridReady(params: GridReadyEvent<MstMovieManagement>){
    this.gridApi = params.api;
    this.params = params;
    this.movies.getAll().subscribe((re: MstMovieManagement[] | undefined) => {
      this.rowData = re;
    })
  }

  onSelectionChanged(event: any){
    const selectedRow = this.gridApi?.getSelectedRows()[0];
    if(selectedRow) this.movieSelected = selectedRow;
  }

  delete(){
    this.message = confirm("Bạn có chắc chắn muốn xóa không?");
    if(this.message)
    {
      this.movies
      .delete(this.movieSelected.id)
      .subscribe({
        next:() => this.toastr.success("Xóa thành công!"),
        error: (ersr: any) => this.toastr.error("Xóa thất bại")
      });
      
      this.params.api.refreshCells();
    }
  }
}
