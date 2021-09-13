import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-custom-action',
  templateUrl: './custom-action.component.html',
  styleUrls: ['./custom-action.component.scss'],
})
export class CustomActionComponent implements OnInit{
  @Input() cellData: any;
  className: any;
  btntext: any = '';
  edit: any = false;
  delete: any = false;
  detail :any = false;

  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute) {
    console.log(this.cellData);
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(
     res => this.className = res.className
    );

    switch(this.className){
      case 'userList':
        this.edit = true;
        this.delete = true;
      break;
      case 'workerList':
        this.detail = true;
        this.btntext = "Detail"
      break;
      default:
        console.log('no data');
      break;
    }
  }

  editCell() {

  }

  deleteCell() {
  }
}
