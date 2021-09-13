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
      switch(this.className){
        case 'userList':
          if(this.colName === 'status'){
          if (this.cellData[0].value) {
            this.textShow = this.cellData[0].texttoshow;
            this.cssClass = 'success';
          } else {
            this.textShow = this.cellData[0].texttoshow;
            this.cssClass = 'warning';
          }
        }else if(this.colName === 'created Date'){
          this.textShow = this.datepipe.transform((this.cellData[0].value), 'dd.MM.YYYY')
        }
        break;
        case 'workerList':
          if (this.cellData[0].value) {
            this.textShow = this.cellData[0].texttoshow;
            this.cssClass = 'active';
          } else {
            this.textShow = this.cellData[0].texttoshow;
            this.cssClass = 'inactive';
          }
        break;
      }   
  }

}
