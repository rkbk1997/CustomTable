import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-custom-column',
  templateUrl: './custom-column.component.html',
  styleUrls: ['./custom-column.component.scss']
})
export class CustomColumnComponent implements OnInit {
  @Input() cellData: any;
  @Input() colName: any;
  textShow: any;
  cssClass: any;
  className: any;
  constructor(
    private activatedRoute : ActivatedRoute,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      res => this.className = res.className
    )
      if (this.cellData.format === 'date'){
        this.textShow = this.datepipe.transform(this.cellData.value, 'MM.dd.YYYY')
      }else if(this.cellData.format === 'dateTime'){
        this.textShow = this.datepipe.transform(this.cellData.value, 'MM.dd.YYYY hh.mm a')
      }
      switch(this.className){
        case 'userList':
          if(this.colName === 'status'){
          if (this.cellData.value) {
            this.textShow = this.cellData.texttoshow;
            this.cssClass = 'success';
          } else {
            this.textShow = this.cellData.texttoshow;
            this.cssClass = 'warning';
          }
        }else if(this.colName === 'created Date'){
          this.textShow = this.datepipe.transform((this.cellData.value), 'dd.MM.YYYY')
        }
        break;
        case 'workerList':
          if(this.colName === 'status'){
            if (this.cellData.value) {
              this.textShow = this.cellData.texttoshow;
              this.cssClass = 'active';
            } else {
              this.textShow = this.cellData.texttoshow;
              this.cssClass = 'inactive';
            }
          }
        break;
      }   
  }

}
