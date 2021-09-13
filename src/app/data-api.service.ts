import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

let userList = {
  "class" : "userList",
  "filter" : [
    {'type':'select' , 'value' : ['pending' ,'published'], 'searchHeader' : 'status'},
    {'type': 'calendar' , 'value' : [], 'searchHeader' : 'created Date'},
    {'type' : 'text' , 'value' : []},
  ],
  "headertoShow" : ['title', 'status', 'description', 'created Date' , 'action'],
  "tableData" : [
    {'title': [{'type': '', 'value': 'Delhi'}],'status' :[{'type': 'custom', 'value': true ,  'texttoshow' : 'Published'}], 'description' : [{'type': '', 'value': 'Ok'}],'created Date' :[{'type': 'custom' , 'value': '2.01.2021'}]},
    {'title': [{'type': '', 'value': 'Delhi'}],'status' :[{'type': 'custom', 'value': true ,  'texttoshow' : 'Published'}], 'description' : [{'type': '', 'value': 'Ok'}],'created Date' :[{'type': 'custom' , 'value': '2.11.2021'}]},
    {'title': [{'type': '', 'value': 'Hisar'}],'status' :[{'type': 'custom', 'value': false , 'texttoshow' : 'Pending'}],   'description' : [{'type': '', 'value': 'Ok'}],'created Date' :[{'type': 'custom' , 'value': '2.01.2021'}]},
    {'title': [{'type': '', 'value': 'Hisar'}],'status' :[{'type': 'custom', 'value': false , 'texttoshow' : 'Pending'}],   'description' : [{'type': '', 'value': 'Ok'}],'created Date' :[{'type': 'custom' , 'value': '12.01.2021'}]},
    {'title': [{'type': '', 'value': 'Delhi'}],'status' :[{'type': 'custom', 'value': true ,  'texttoshow' : 'Published'}], 'description' : [{'type': '', 'value': 'Ok'}],'created Date' :[{'type': 'custom' , 'value': '5.10.2021'}]},
    {'title': [{'type': '', 'value': 'Hisar'}],'status' :[{'type': 'custom', 'value': false , 'texttoshow' : 'Pending'}],   'description' : [{'type': '', 'value': 'Ok'}],'created Date' :[{'type': 'custom' , 'value': '2.01.2021'}]},
    {'title': [{'type': '', 'value': 'Delhi'}],'status' :[{'type': 'custom', 'value': true ,  'texttoshow' : 'Published'}], 'description' : [{'type': '', 'value': 'Ok'}],'created Date' :[{'type': 'custom' , 'value': '2.01.2021'}]},
    {'title': [{'type': '', 'value': 'Hisar'}],'status' :[{'type': 'custom', 'value': false , 'texttoshow' : 'Pending'}],   'description' : [{'type': '', 'value': 'Ok'}],'created Date' :[{'type': 'custom' , 'value': '2.01.2021'}]},
    {'title': [{'type': '', 'value': 'Delhi'}],'status' :[{'type': 'custom', 'value': true ,  'texttoshow' : 'Published'}], 'description' : [{'type': '', 'value': 'Ok'}],'created Date' :[{'type': 'custom' , 'value': '2.01.2021'}]},
    {'title': [{'type': '', 'value': 'Hisar'}],'status' :[{'type': 'custom', 'value': false , 'texttoshow' : 'Pending'}],   'description' : [{'type': '', 'value': 'Ok'}],'created Date' :[{'type': 'custom' , 'value': '2.01.2021'}]},
    {'title': [{'type': '', 'value': 'Delhi'}],'status' :[{'type': 'custom', 'value': true ,  'texttoshow' : 'Published'}], 'description' : [{'type': '', 'value': 'Ok'}],'created Date' :[{'type': 'custom' , 'value': '2.01.2021'}]},
    {'title': [{'type': '', 'value': 'Hisar'}],'status' :[{'type': 'custom', 'value': false , 'texttoshow' : 'Pending'}],   'description' : [{'type': '', 'value': 'Ok'}],'created Date' :[{'type': 'custom' , 'value': '2.01.2021'}]},
    {'title': [{'type': '', 'value': 'Delhi'}],'status' :[{'type': 'custom', 'value': true ,  'texttoshow' : 'Published'}], 'description' : [{'type': '', 'value': 'Ok'}],'created Date' :[{'type': 'custom' , 'value': '2.01.2021'}]},
    {'title': [{'type': '', 'value': 'Hisar'}],'status' :[{'type': 'custom', 'value': false , 'texttoshow' : 'Pending'}],   'description' : [{'type': '', 'value': 'Ok'}],'created Date' :[{'type': 'custom' , 'value': '2.01.2021'}]}
  ],
  "metaData": 120
}

let workerList = {
  "class" : "workerList",
  "filter" : [
    {'type':'select' , 'value' : ['active' ,'inactive'], 'searchHeader' : 'status'},
    {'type': 'calendar' , 'value' : [], 'searchHeader' : 'created Date'},
    {'type' : 'text' , 'value' : []},
  ],
  "headertoShow" : ['name', 'status', 'description', 'joining Date' , 'action'],
  "tableData" : [
    {'name': [{'type': '', 'value': 'Ram Kumar'}],'status' :[{'type': 'custom', 'value': true ,'texttoshow' : 'Active'}], 'description' : [{'type': '', 'value': 'Active User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Raman'}],'status' :[{'type': 'custom', 'value': false ,'texttoshow' : 'Inactive'}], 'description' : [{'type': '', 'value': 'Inactive User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Ram Kumar'}],'status' :[{'type': 'custom', 'value': true ,'texttoshow' : 'Active'}], 'description' : [{'type': '', 'value': 'Active User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Raman'}],'status' :[{'type': 'custom', 'value': false ,'texttoshow' : 'Inactive'}], 'description' : [{'type': '', 'value': 'Inactive User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Ram Kumar'}],'status' :[{'type': 'custom', 'value': true ,'texttoshow' : 'Active'}], 'description' : [{'type': '', 'value': 'Active User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Raman'}],'status' :[{'type': 'custom', 'value': false ,'texttoshow' : 'Inactive'}], 'description' : [{'type': '', 'value': 'Inactive User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Ram Kumar'}],'status' :[{'type': 'custom', 'value': true ,'texttoshow' : 'Active'}], 'description' : [{'type': '', 'value': 'Active User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Raman'}],'status' :[{'type': 'custom', 'value': false ,'texttoshow' : 'Inactive'}], 'description' : [{'type': '', 'value': 'Inactive User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Ram Kumar'}],'status' :[{'type': 'custom', 'value': true ,'texttoshow' : 'Active'}], 'description' : [{'type': '', 'value': 'Active User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Raman'}],'status' :[{'type': 'custom', 'value': false ,'texttoshow' : 'Inactive'}], 'description' : [{'type': '', 'value': 'Inactive User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Ram Kumar'}],'status' :[{'type': 'custom', 'value': true ,'texttoshow' : 'Active'}], 'description' : [{'type': '', 'value': 'Active User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Raman'}],'status' :[{'type': 'custom', 'value': false ,'texttoshow' : 'Inactive'}], 'description' : [{'type': '', 'value': 'Inactive User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Ram Kumar'}],'status' :[{'type': 'custom', 'value': true ,'texttoshow' : 'Active'}], 'description' : [{'type': '', 'value': 'Active User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Raman'}],'status' :[{'type': 'custom', 'value': false ,'texttoshow' : 'Inactive'}], 'description' : [{'type': '', 'value': 'Inactive User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Ram Kumar'}],'status' :[{'type': 'custom', 'value': true ,'texttoshow' : 'Active'}], 'description' : [{'type': '', 'value': 'Active User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Raman'}],'status' :[{'type': 'custom', 'value': false ,'texttoshow' : 'Inactive'}], 'description' : [{'type': '', 'value': 'Inactive User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Ram Kumar'}],'status' :[{'type': 'custom', 'value': true ,'texttoshow' : 'Active'}], 'description' : [{'type': '', 'value': 'Active User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
    {'name': [{'type': '', 'value': 'Raman'}],'status' :[{'type': 'custom', 'value': false ,'texttoshow' : 'Inactive'}], 'description' : [{'type': '', 'value': 'Inactive User'}],'joining Date' :[{'type': '' , 'value': '20.01.2021'}]},
  ],
  "metaData": 40
}


@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private activatedRoute : ActivatedRoute, private http: HttpClient ) { }

  getTableDataUser(className:any):any {
    return className === 'userList'? userList: className === 'workerList' ? workerList : '';
  }

  getInitialData(payload: any){
    // console.log(payload);
    return this.http.post('http://localhost:8080/api/customTable',payload);
  }
}
