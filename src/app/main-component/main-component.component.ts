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
    this.entityData = this.api.getTableDataUser(this.className);
    console.log(this.entityData);
    this.tableDisplayColumns = this.entityData.headertoShow;
    this.tableFilter = this.entityData.filter;
    this.tableInputData = this.entityData.tableData;
    this.collectionSize = this.entityData.metaData
  }
}
