import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
const apiUrl=environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http:HttpClient) { }

  download_pdf_directly(){
    return this.http.get<any>( `${apiUrl}/pdf_download/pdf`).pipe(
      result=>{
        return result;
      }
    )
  }
  send_timesheet_by_email(image:any){
    return this.http.post<any>(`${apiUrl}/email/timesheet`,{image}).pipe(
      result=>{
        return result;
      }
    )
  }
}
