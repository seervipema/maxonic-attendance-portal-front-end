import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from './../../environments/environment';
const apiUrl=environment.apiUrl;
// authentication service is used to LOGIN and LOGOUT of the application
// it posts the creds (username and password) to the backend and check for the response if it has JWT token
// if the response from the backend has jwt token, then the authentication was succesful
// on successful authentication, the user details are stored in the local storage + jwt token

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http : HttpClient) { }
//login 
login(email:string,password:string){
    return this.http.post<any>(`${apiUrl}/user/login`,{email,password})
    .pipe(
      // the backend service sends an instance of the user
            // user: any (because .post<any>)
            map(user=>{
              //login successful if the response has jwt token
              if(user && user.token){
                // store user details and jwt token in the local storage to keep the user logged in between page refreshes
                localStorage.setItem('currentUser',JSON.stringify(user));
                localStorage.setItem('isLoggedIn','true');
                localStorage.setItem('email',email);
              }
              return user;
            })
    )
}
logout(){
  //remove user from local storage
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('email');
}

isLogged(){
  if(localStorage.getItem('isLoggedIn') ==='true'){
            return true;
  }else{
            return false;
  }
}
signup(email:string,password:string,date_of_birth:Date,timezone:string){
  return this.http.post<any>(`${apiUrl}/user/signup`,{email,password,date_of_birth,timezone}).pipe(
    map( result=>{
      return result;
    })
  )
}
sendEmail(email:string){
  return this.http.post<any>(`${apiUrl}/email/couponCode`,{email}).pipe(
    map(
      result=>{
        return result;
      }
    )
  )
}
check_JWT_IS_VALID(){
  return this.http.get<any>(`${apiUrl}/user/JWTtokenAuthentication`).pipe(
    map(
      result =>{
        return result;
      }
    )
  )
}


}
