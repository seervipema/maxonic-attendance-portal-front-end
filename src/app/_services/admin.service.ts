import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from './../../environments/environment';
const apiUrl=environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient ) { }

  create_holiday(holiday_date:string,holiday_occasion:string,is_optional:Boolean,email:string){
    return this.http.post<any>(`${apiUrl}/holidays/`,{holiday_date,holiday_occasion,is_optional,email}).pipe(
      result =>{
        return result;
      }
    )
  }
  delete_holiday(holiday_date:Date,email:string){
    const options={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body:{
        email
      }
    }
    return this.http.delete<any>(`${apiUrl}/holidays/${holiday_date}/`,options).pipe(
      result =>{
        return result;
      }
    )
  }
  get_all_holidays(){
    return this.http.get<any>(`${apiUrl}/holidays`).pipe(
      result =>{
        return result;
      }
    )
  }
}
