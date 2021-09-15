import { Component, Input, OnInit, Output, EventEmitter, SimpleChange } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators'
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
  @Output() resetTable = new EventEmitter<any>();
  searchSubject = new Subject();
  tableInputData: any;
  tableDisplayColumns: any;
  tableFilter: any;
  collectionSize: any;
  dataSource: any;
  selectValue: any;
  selectedInput: any;
  selectedDate: any;
  filterData: any = []
  page = 1;
  pageSetting = {
    pageNo: 0,
    start: 0,
    limit: 10,
    sort: { property: '', order: '' },
    filter: []
  };

  sortFiltersetting = { 
    sort : {},
    filter : []
   }

  constructor(private api: DataApiService) {
    this.searchSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      value => {
        console.log(value,'@@@@');
        
        this.applyFilter('all');
      }
    )
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChange) { 
    this.tableDisplayColumns = this.entityData?.headerToShow?.headertoShow;
    this.tableFilter = this.entityData?.filter;
    this.tableInputData = this.entityData?.tableData;
    this.collectionSize = this.entityData?.metaData;
    this.dataSource = new MatTableDataSource(this.tableInputData);
  }

  changePage(event: any) {
    let newpageSetting = {
      ...this.pageSetting,
      pageNo: this.page - 1,
      start: (this.page - 1) * 10,
      limit: 10,
      sort: this.sortFiltersetting.sort,
      filter: this.sortFiltersetting.filter
    };
    this.loadNextPage.emit(newpageSetting);
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

  applyFilter(header: any, event?: any) {
    this.filterData = this.filterData.filter((item: any) => item.header != header );
    this.filterData.push({header: header, value: this.selectedInput})
    this.page = 1
    let newpageSetting = {
      ...this.pageSetting,
      sort : this.sortFiltersetting.sort,
      filter: this.filterData
    }
    this.sortFiltersetting.filter = this.filterData
    this.loadNextPage.emit(newpageSetting);
  }

  selectFilterChange(header: any , value: any) {
    this.selectValue = value;
    this.filterData = this.filterData.filter((item: any) => item.header != header );
    this.filterData.push({ header: header, value : value === 'active' ? true : false })
    this.page = 1
    let newpageSetting = {
      ...this.pageSetting,
      sort : this.sortFiltersetting.sort,
      filter: this.filterData
    }
    this.sortFiltersetting.filter = this.filterData
    this.loadNextPage.emit(newpageSetting);
  }

  ascendingSort(colName: any, order: any) {
    console.log(colName, order);
    this.page = 1
    let newpageSetting ={ 
      ...this.pageSetting,
      sort : { property : colName , order : order }
    }
    this.sortFiltersetting.sort = newpageSetting.sort
    this.loadNextPage.emit(newpageSetting);
  }

  decendingsort(colName: any, order: any) {
    console.log(colName, order);
    this.page = 1
    let newpageSetting ={ 
      ...this.pageSetting,
      sort : { property : colName , order : order }
    }
    this.sortFiltersetting.sort = newpageSetting.sort
    this.loadNextPage.emit(newpageSetting);
  }

  resetTableData(){
    this.page = 1
    this.selectValue = '';
    this.selectedInput = '';
    this.selectedDate = '';
    this.sortFiltersetting.sort = {}
    this.sortFiltersetting.filter = []
    this.resetTable.emit(this.pageSetting)
  }
}
