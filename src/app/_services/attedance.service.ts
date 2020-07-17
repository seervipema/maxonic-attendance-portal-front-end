import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from './../../environments/environment';
const apiUrl=environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AttedanceService {

  constructor(private http:HttpClient ) {}

  attendanceBasedOnDate(startDate:any){
    return this.http.post<any>(`${apiUrl}/attendance`,{startDate}).pipe(
        result =>{
          return result;
        }
    )
  }
  allAttendanceDetails(){
    return this.http.get<any>(`${apiUrl}/attendance`).pipe(
      result =>{
        return result;
      }
    )
  }
  attendanceBasedOnEmail(email:any){
    return this.http.post<any>(`${apiUrl}/attendance/emailBasedData/`,{email}).pipe(
      result=>{
        return result;
      }
    )
  }
  doCheckIn(email:string,date:string,check_in:string){
    return this.http.post<any>(`${apiUrl}/attendance/doCheckIn`,{email,date,check_in});
  }
  doCheckOut(email:string,date:string,check_out:string,taskDescription:string){
    return this.http.post<any>(`${apiUrl}/attendance/doCheckOut`,{email,date,check_out,taskDescription})
  }
}
