import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import { ceil } from 'lodash';

@Component({
  selector: 'grid-pagination',
  templateUrl: './grid-pagination.component.html',
  styleUrls: ['./grid-pagination.component.css']
})
export class GridPaginationComponent implements OnInit {
  @Input() pageSize = 0;
  @Input() gridApi;
  @Input() paginationParams = { pageNum: 1, pageSize: 20, totalCount: 0, totalPage: 1 };
  @Output() pageChangedEvent = new EventEmitter();
  constructor() { }

  get fromRecord() {
    if (this.paginationParams.totalCount === 0) return 0;
    return (
      (this.paginationParams.pageNum - 1) *
      this.paginationParams.pageSize +
      1
    );
  }

  get toRecord() {
    let calcRecord =
      this.paginationParams.pageNum * this.paginationParams.pageSize;
    return calcRecord > this.paginationParams.totalCount
      ? this.paginationParams.totalCount
      : calcRecord;
  }

  ngAfterViewInit() {
    this.paginationParams.pageSize =
      this.paginationParams.pageSize > 0
        ? this.paginationParams.pageSize
        : 10;
    this.paginationParams.totalPage = this.paginationParams.totalPage ?? 0;
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) { }

  // Next button click
  goToNext() {
    this.paginationParams.pageNum = this.paginationParams.pageNum + 1;
    this.pageChangedEvent.emit(this.paginationParams);
  }

  // Back button click
  goToPrevious() {
    // Allow to go to previous page only if Current Page > 1
    if (this.paginationParams.pageNum > 1) {
      this.paginationParams.pageNum = this.paginationParams.pageNum - 1;
    }

    this.pageChangedEvent.emit(this.paginationParams);
  }

  // First or Last button click
  goToPage(index: number) {
    this.paginationParams.pageNum = index;
    this.pageChangedEvent.emit(this.paginationParams);
  }

  // Change page size
  onPageSizeChanged() {
    let newTotalPage = ceil(
      this.paginationParams.totalCount / this.pageSize
    );
    this.paginationParams.pageNum =
      newTotalPage < this.paginationParams.pageNum
        ? newTotalPage
        : this.paginationParams.pageNum;
    this.paginationParams.pageSize = this.pageSize;
    this.paginationParams.totalPage = newTotalPage ?? 0;
    this.pageChangedEvent.emit(this.paginationParams);
  }

}
