import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
const apiUrl=environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private http:HttpClient) { }
  store_timesheet_details(email:any,editable:any,work_record_status:any){
   return this.http.post<any>(`${apiUrl}/timesheet/store-timesheet-details`,{email,editable,work_record_status});
  }
  get_timesheet_status(email:string){
    return this.http.get<any>(`${apiUrl}/timesheet/timesheet-status/${email}`);
  }
  get_timesheet_details(email:string){
    return this.http.get<any>(`${apiUrl}/timesheet/timesheet-details/${email}`);
  }
  send_email_to_verify(email:string){
    return this.http.post<any>(`${apiUrl}/email/verify-timesheet`,{email});
  }
  send_email_to_resubmit(email:string){
    return this.http.post<any>(`${apiUrl}/email/resubmit-timesheet`,{email});
  }
  send_pdf_file(email:string){
    return this.http.post<any>(`${apiUrl}/email/timesheet-pdf`,{email});
  }

}
