import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
// import { start } from 'repl';
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
  @ViewChild ('picker') picker! : ElementRef;
  searchSubject = new Subject();
  className: any;
  tableInputData: any;
  tableDisplayColumns: any;
  tableFilter: any;
  collectionSize: any;
  dataSource: any;
  selectValue: any;
  selectedInput: any;
  selectedDate: any;
  startDate: any;
  endDate: any;
  filterDate: any;
  filterData: any = []
  columnToShow: any =[];
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

  constructor(private api: DataApiService, private activatedRoute: ActivatedRoute,
    private datepipe: DatePipe) {
    this.searchSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      value => {
        console.log(value,'@@@@');

        this.tableDisplayColumns.forEach( (t:any) => {
            if(t.filter === 'text') this.applyFilter(t.field , this.selectedInput) 
        });
        
        // this.applyFilter('all');
      }
    )
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      res =>{ this.page = 1;
      this.resetTableData();
      },
    )
  }

  ngOnChanges(changes: SimpleChange) { 
    this.className = this.entityData.class
    this.tableDisplayColumns = this.entityData?.headerToShow?.headertoShow;
    console.log(this.tableDisplayColumns);
    this.columnToShow = [];
    this.tableDisplayColumns.forEach( (obj: any) => {
      this.columnToShow.push(obj.field)
    });
    
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

  applyFilter(header: any, filterCondition: any) {
    this.filterData = this.filterData.filter((item: any) => item.header != header );
    if(this.selectedInput)this.filterData.push({header: header, value: filterCondition})
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
    if(this.selectValue != '0')this.filterData.push({ header: header, value : value === 'active' ? true : false })
    this.page = 1
    let newpageSetting = {
      ...this.pageSetting,
      sort : this.sortFiltersetting.sort,
      filter: this.filterData
    }
    this.sortFiltersetting.filter = this.filterData
    this.loadNextPage.emit(newpageSetting);
  }

  applyDateRangeFilter(header: any, startDate: any, endDate: any){
    console.log('##########', startDate, endDate);
    this.startDate =  this.datepipe.transform (startDate ,'YYYY-MM-dd');
    this.endDate = this.datepipe.transform(endDate , 'YYYY-MM-dd');
    this.filterDate = {startDate : this.startDate , endDate: this.endDate}
    this.filterData = this.filterData.filter((item: any) => item.header != header );
    if(endDate ?? false )this.filterData.push({ header: header, value : {startDate: this.startDate, endDate: this.endDate} })
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
      sort : { property : colName , order : order },
      filter: this.sortFiltersetting.filter
    }
    this.sortFiltersetting.sort = newpageSetting.sort
    this.loadNextPage.emit(newpageSetting);
  }

  decendingsort(colName: any, order: any) {
    console.log(colName, order);
    this.page = 1
    let newpageSetting ={ 
      ...this.pageSetting,
      sort : { property : colName , order : order },
      filter: this.sortFiltersetting.filter

    }
    this.sortFiltersetting.sort = newpageSetting.sort
    this.loadNextPage.emit(newpageSetting);
  }

  resetTableData(){
    this.page = 1
    this.selectValue = '';
    this.selectedInput = '';
    this.selectedDate = '';
    this.filterDate = {}
    this.startDate =''
    this.endDate =''
    this.sortFiltersetting.sort = {}
    this.sortFiltersetting.filter = []

    this.resetTable.emit(this.pageSetting)

  }
}
