import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { throwError} from "rxjs";
import { map,catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  //apiurl = 'http://jsonplaceholder.typicode.com/users';
  apiurl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getDepartments(req_params){
    return this.http.get(this.apiurl+"/api/getusers").pipe(
      map(res => res),
       catchError( this.errorHandler)
      );

  }

  public get_post_data(req_data:any){
    console.log(req_data);

    let headers = new HttpHeaders();
    //headers = headers.set("Authorization", "Bearer "+this.getToken()).set('Content-Type','application/json');
    return this.http.post(this.apiurl+req_data.url,req_data)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );

  }

  updateData(req_data){
    console.log(req_data);
    return this.http.post(this.apiurl+"/api/update-data",req_data).pipe(
      map(res => res),
       catchError( this.errorHandler)
      );

  }


  getoneDetails(id:any){
    return this.http.post(this.apiurl+"/api/getsingleusers",id).pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }

  submitDetails(data:any){
    console.log(data);
    return this.http.post(this.apiurl+"/api/submit-data",data).pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }

  getRawData() {
    //const api = 'https://www.w3.org/TR/PNG/iso_8859-1.txt';
    const api = 'http://127.0.0.1:8000/api/pdfview/1/1';
    return this.http.get(api,{ responseType: 'text' });    
  }

  errorHandler(error: Response) {   
    return throwError(error);  
  } 
}
