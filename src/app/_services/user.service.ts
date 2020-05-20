import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
const apiUrl=environment.apiUrl;
import {map} from 'rxjs/operators';

// as soon as the user logs in, this component will hit a SECURED API ENDPOINT
// SECURE API ENDPOINT: The requests must have a jwt token in its Authorization Header
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
 
  
  get_all_users(){
    return this.http.get(`${apiUrl}/user/allUsers`).pipe(
      result =>{
        return result;
      }
    );
  }
  delete_user(email:string,admin_email:string){
    return this.http.delete(`${apiUrl}/user/userDeletion/${email}/${admin_email}`).pipe(
      result=>{
        return result;
      }
    )
  }

}
