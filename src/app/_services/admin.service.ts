import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from './../../environments/environment';
const apiUrl=environment.apiUrl;
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private messageSource = new BehaviorSubject(false);
  private adminMessageSource = new BehaviorSubject(false);
  private email= new BehaviorSubject(false);
  emailMessage= this.email.asObservable();
  isAdminLogged = this.adminMessageSource.asObservable();
  currentMessage = this.messageSource.asObservable();
  constructor(private http:HttpClient ) { }
  changeMessage(message: boolean) {
    this.messageSource.next(message)
  }
  changeAdminStatus(message:boolean){
    this.adminMessageSource.next(message);
  }
  changeEmailStatus(message:boolean){
    this.email.next(message);
  }
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
