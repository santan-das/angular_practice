import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgxPrintModule} from 'ngx-print';
import {DepartmentService} from '../department.service';

@Component({
  selector: 'app-showpopup',
  templateUrl: './showpopup.component.html',
  styleUrls: ['./showpopup.component.css']
})
export class ShowpopupComponent implements OnInit {
  public samplepdf:any;
  constructor(private _departmentService:DepartmentService,public dialogRef: MatDialogRef<ShowpopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private sanitizer: DomSanitizer) {
    //this.samplepdf=this.data.samplepdf;
    //this.samplepdf = sanitizer.bypassSecurityTrustResourceUrl( this.samplepdf);
   }

  ngOnInit() {
    this._departmentService.getRawData().subscribe((res)=>{
        this.samplepdf = res;
  });
  }

  closeClick(): void {
    this.dialogRef.close();
  }


}
