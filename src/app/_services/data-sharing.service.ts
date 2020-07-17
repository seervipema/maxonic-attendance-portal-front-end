import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();
  constructor(private http:HttpClient ) { }
  changeMessage(message: boolean) {
    this.messageSource.next(message)
  }
  private isAdminLoggedIn=new BehaviorSubject(false);
  currentStatusOfIsAdminLoggedIn=this.isAdminLoggedIn.asObservable();
  changeStatusOfIsAdminLoggedIn(status:boolean){
    this.isAdminLoggedIn.next(status);
  }
 
}
