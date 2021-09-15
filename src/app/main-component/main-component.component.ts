import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss'],
})
export class MainComponentComponent implements OnInit, OnChanges {
  tableDisplayColumns: any;
  tableInputData: any;
  tableFilter: any;
  className: any;
  entityData: any;
  collectionSize: any;
  pageSetting = {
    start: 0,
    limit: 10,
    sort: { property: '', order: '' },
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: DataApiService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.className = res.className;
      this.setTableData();
    });
  }

  ngOnChanges() {}

  setTableData(): any {
    let payload = {
      start: 0,
      limit: 10,
      sort: { property: '', order: '' },
      class: this.className,
    };

    this.api.getInitialData(payload).subscribe((res) => {
      console.log(res);
      this.entityData = res;
    });
  }

  setAttributeData(): any {
    let payload = {
      ...this.pageSetting,
      class: this.className,
    };

    this.api.getData(payload).subscribe((res: any) => {
      console.log(res.tableData);
      this.entityData = res;
    });
  }

  loadNextPages(event: any) {
    console.log(event);
    this.pageSetting = {
      ...this.pageSetting,
      ...event,
    };
    this.setAttributeData();
  }

  resetTableData(event: any) {
    this.pageSetting = {
      ...this.pageSetting,
      ...event,
    };
    this.setTableData();
  }
}
