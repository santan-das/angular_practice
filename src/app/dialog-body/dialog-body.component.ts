import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";


class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {
  userid:number;
  name:string;
  email:string;
  fromDialog:string;
  dialgdata:any;

  public userData:any;
  public profileData={first_name:'',last_name:'',username:'',telephone:'',user_image:'',user_image_file:''};
  public logoPath:any;
  profileLogo:ImageSnippet;
  public saveBtn:boolean=true;
  public logo:any;
  public is_phone:boolean=false;
  public is_email:boolean=false;
  public is_last_name:boolean=false;
  public is_first_name:boolean=false;
  public files_data:any;
  public img_size:any;

  constructor(public dialogRef: MatDialogRef<DialogBodyComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.userid = data.id;
    this.name = data.name;
    this.email = data.email;

   }

  ngOnInit() {
  }

  updateclose() {
    this.dialgdata  = {'name':this.name,'email':this.email,'id':this.userid};
    this.dialogRef.close({event:'close',data:this.dialgdata}); 
  }

  closedialog(){
    this.dialogRef.close(); 
  }

  processFile(imageInput:any){
    this.saveBtn=false;
    const file: File = imageInput.target.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      
      let filedata  = new ImageSnippet(event.target.result, file);
      if(filedata.file.type=="image/png" || filedata.file.type=="image/jpeg" || filedata.file.type=="image/jpg"){
       this.profileLogo =filedata;
      }else{
        this.profileLogo=undefined;
       //swal.fire("Error", "Only image files are allowed", "error");
       return false;
      }
 
    });

    reader.readAsDataURL(imageInput.target.files[0]); 
    reader.onload = (_event) => { 
      if(this.profileLogo !=undefined){
				if (this.img_size > 2) {
				}else{
				  this.logoPath = reader.result;
				}
			  }
    }

  }

  
}
