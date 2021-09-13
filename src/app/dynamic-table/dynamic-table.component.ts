import { Component, Input, OnInit, Output, EventEmitter, SimpleChange } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import { EventEmitter } from 'stream';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit {
  @Input() entityData: any;
  @Output() loadNextPage = new EventEmitter<any>();
  tableInputData: any;
  tableDisplayColumns: any;
  tableFilter: any;
  collectionSize: any;
  dataSource: any;
  selectedInput: any;
  selectedValue: any;
  selectedDate: any;
  page = 1;
  pageSetting = {
    pageNo: 0,
    start: 0,
    limit: 10,
    sort: { property: '', order: '' },
  };

  constructor(private api: DataApiService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChange) { 
    this.tableDisplayColumns = this.entityData?.headerToShow?.headertoShow;
    this.tableFilter = this.entityData?.filter;
    this.tableInputData = this.entityData?.tableData;
    this.collectionSize = this.entityData?.metaData;
    this.dataSource = new MatTableDataSource(this.tableInputData);
  }

  changePage(event: any) {
    this.pageSetting = {
      ...this.pageSetting,
      pageNo: this.page - 1,
      start: (this.page - 1) * 10,
      limit: 10,
      sort: { property: '', order: '' },
    };
    this.loadNextPage.emit(this.pageSetting);
  }

  showSorting(headerName: any) {
    if (
      headerName == 'action' ||
      headerName == 'description' ||
      headerName == 'status'
    ) {
      return false;
    } else {
      return true;
    }
  }

  applyFilter(event: any) {}

  selectFilterChange() {}

  ascendingSort(colName: any, order: any) {
    console.log(colName, order);
  }

  decendingsort(colName: any, order: any) {
    console.log(colName, order);
  }
}
