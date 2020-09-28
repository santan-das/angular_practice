import { Component, OnInit } from '@angular/core';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import {DepartmentService} from '../department.service';
import { FormBuilder, FormGroup, Validators,FormArray,FormControl } from  '@angular/forms';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DialogBodyComponent} from '../dialog-body/dialog-body.component';
import {ShowpopupComponent} from '../showpopup/showpopup.component';
import Swal from 'sweetalert2';
import { PageEvent, MatPaginator} from '@angular/material';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


export interface OptionTblda {
  name: string;
  position: number;
  email: string;
  title: string;
  user_image: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  form: FormGroup;
  public OptionDataSuce:any;
  public manageOptionDataSource:Array<any>=[];
  public resdata:Array<any>=[];
  dialogValue:any;
  fileData: File = null;
previewUrl:any = null;
fileUploadProgress: string = null;
uploadedFilePath: string = null;
profile_image:any;
gender = ['Male', 'Female','Other'];
defaultValue = this.gender[1];
defaultemail:any='test@gmail.com';
page: number;
Pagechange: number;
index:number;
offset:number=0;
limit:number=10;
public pageSize:number=10;
rawlist: any;
trustedDashboardUrl : SafeUrl;

  displayedColumns: string[] = ['position', 'name', 'email', 'title','user_image','action'];
  //dataSource = ELEMENT_DATA;
  constructor(private _departmentService:DepartmentService,public fb: FormBuilder,private matDialog: MatDialog,private sanitizer: DomSanitizer) { 
    this.form = this.fb.group({
      name: [''],
      description:[''],
      email:[''],
      gender:[''],
    })
  }


  // server side pagination 
  getServerData(event?: PageEvent){
    this.page = (event.pageSize * event.pageIndex);
		this.offset = this.page;
    this.limit = event.pageSize;
  }


  ngOnInit() {
    this.getallUsers();
    //return this.departments;
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
}

preview() {
  // Show preview 
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
  }
}


  getallUsers(){
    let req_params = {'total_data': 50};
    this._departmentService.getDepartments(req_params).subscribe((res)=>{
      if(res['success']=="true"){
        this.manageOptionDataSource=[];
        this.manageOptionDataSource.length=0;
        this.resdata = res['data'];

        for(var i=0; i<this.resdata.length; i++){
          if(this.resdata[i].user_image==""){
            this.profile_image = 'no image';
          }else{
            this.profile_image = this.resdata[i].user_image;
          }


          this.manageOptionDataSource[i]={
            'name':this.resdata[i].name,
            'email':this.resdata[i].email,
            'title':this.resdata[i].title,
            'id'   : this.resdata[i].id,
            //'user_image'   : this.resdata[i].user_image,
            'user_image'   : this.profile_image,
          }
          this.OptionDataSuce = new MatTableDataSource<OptionTblda>(this.manageOptionDataSource);                     
        }
    }
     
  });
  }

  editDetails(id,name,email){
      //const dialogConfig = new MatDialogConfig();
    //  const dialogConfig = this.matDialog.open(DialogBodyComponent, {
    //   data: {id:id},
    // });
     const dialogConfig = this.matDialog.open(DialogBodyComponent, { 
      data:{id:id,name:name,email:email},
      disableClose: true
    });


    dialogConfig.afterClosed().subscribe(result => {
      //console.log('The dialog was closed',result);
      this.dialogValue = result.data;
      this._departmentService.updateData(this.dialogValue).subscribe((res)=>{
        if(res['success']=="true"){
          this.getallUsers();
      }   
    });
  });

  }


  getRawData() {
    // this._departmentService.getRawData().subscribe( 
    //   data => this.trustedDashboardUrl=data,
    //   error => console.log(error));
    //   this.trustedDashboardUrl =
    //                     this.sanitizer.bypassSecurityTrustResourceUrl
    //                         ("http://127.0.0.1:8000/api/pdfview/1/1");

    const dialogConfig = this.matDialog.open(ShowpopupComponent, { 
      width:"90vw",
      height:"90vw",
      data:{'samplepdf':"http://127.0.0.1:8000/api/pdfview/1/1"},
      disableClose: true
    });
      
  }
  
  

  submitProduct(){
    //console.log(this.fileData);
    console.log(this.form);

    if(this.form.value.name == ""){
      Swal.fire("Error", "Required data missing", "error");
      return false;
    }

    const formData = new FormData();
      formData.append('file', this.fileData);
      formData.append('name', this.form.value.name);
      formData.append('email', this.form.value.email);
      formData.append('gender', this.form.value.gender);

      this._departmentService.submitDetails(formData).subscribe((res)=>{
        console.log(res);
        if(res['success']=="true"){
          Swal.fire("Success", "User Added", "success");
          this.getallUsers();
          this.form.reset();
               
        }
       
      });


    
  }

}
