import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators,FormArray,FormControl } from  '@angular/forms';
import { PageEvent, MatPaginator} from '@angular/material';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  public user = {};
  // userprofileForm = new FormGroup({
  //   firstname: new FormControl('',Validators.required),
  //   useremail: new FormControl('',Validators.required)
  // });

  public departments:any=[];
  public deptidarr:any=[];
  public deptid:number;
  public deptname:string;
  public mail:string;
  public name:string;
  //public id:any;
  public allOrdersArray:Array<any>=[];

page: number=1;
Pagechange: number;
index:number;
offset:number=0;
limit:number=5;
public pageSize:number=5;
public num_dealer_data:number = 0;

  options = [
    {id: 1, name: 'one'},
    {id: 2, name: 'two'},
    {id: 3, name: 'three'},
  ]

  selectedValue = 2;

  userprofileForm:FormGroup;
  constructor(private _departmentService:DepartmentService,private formBuilder: FormBuilder) { 
    this.userprofileForm = this.formBuilder.group({
      firstname: ['',[Validators.required]],
      useremail:['',[Validators.required,Validators.email]],
      titles:['']
    
    })

  }

    // server side pagination 
    getServerData(event?: PageEvent){
      this.page = (event.pageSize * event.pageIndex);
      this.offset = this.page;
      this.limit = event.pageSize;
      //console.log(event);
      
      let req_params = {'url':"/api/getalldata","offset":this.offset,"limit":this.limit};
      this._departmentService.get_post_data(req_params).subscribe((res)=>{
        console.log(res);
        if(res['success']=="true"){
          
          this.num_dealer_data=0;
          this.departments=[];
          this.departments.length=0;
          this.departments=res['data']['users'];
          this.num_dealer_data=res['data']['users_count'];
  
      }
       
    });
     
      return this.departments;
  
  
    }

  ngOnInit() {
    let req_params = {'url':"/api/getalldata","offset":this.offset,"limit":this.limit};
    this._departmentService.get_post_data(req_params).subscribe((res)=>{
      console.log(res);
      console.log(res['success']);
      if(res['success']=="true"){
        
        this.num_dealer_data=0;
        this.departments=[];
        this.departments.length=0;
        this.departments=res['data']['users'];
        this.num_dealer_data=res['data']['users_count'];

    }
     
  });
   
    return this.departments;
  }

  getDetails(id){
    //console.log(id);
    let req_data = {"id":id};
    this._departmentService.getoneDetails(req_data).subscribe((res)=>{
      if(res['success']=="true"){
        this.deptidarr = res['data'];
        this.deptid = this.deptidarr[0].id;
        this.deptname = this.deptidarr[0].title;
        this.mail = this.deptidarr[0].email;
        this.name = this.deptidarr[0].name;
        
      }
      
    });

  }

  getData(){
    alert('hi');
  }




  onSubmit(formdata){
    console.log(formdata);
    this._departmentService.submitDetails(formdata).subscribe((res)=>{
          console.log(res);
          if(res['success']=="true"){
            // res['data'];
                 
          }
         
        });
    
  }

  submitUser(){
    console.log(this.userprofileForm.value);
    //console.log(formdata);
    this._departmentService.submitDetails('test').subscribe((res)=>{
          console.log(res);
          if(res['success']=="true"){
            // res['data'];
                 
          }
         
        });
  }


}
