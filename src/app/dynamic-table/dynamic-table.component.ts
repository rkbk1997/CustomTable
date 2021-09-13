import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit {
  @Input() tableInputData!: any;
  @Input() tableDisplayColumns: any;
  @Input() tableFilter: any;
  @Input() collectionSize: any;

  dataSource: any;
  selectedInput: any;
  selectedValue: any;
  selectedDate: any;
  page = 1;
  pageSetting = {
    pageNo: this.page,
    start: this.page * 10,
    limit: 10,
    sort: [{ property: '', order: '' }],
  };

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.tableInputData);
  }

  ngAfterViewInit() {}

  changePage(event: any) {
    console.log(event);
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

  pageEvents(e: any) {}

  selectFilterChange() {}

  ascendingSort(colName:any){
    console.log(colName); 
  }

  decendingsort(colName: any){
    console.log(colName);
  }
}
