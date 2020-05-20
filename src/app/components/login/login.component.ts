import { Component, OnInit,Input } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {first} from 'rxjs/operators';
import {DataSharingService} from '../../_services/data-sharing.service';
import { catchError } from 'rxjs/operators';
import {ToastrManager} from 'ng6-toastr-notifications'
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
 
  constructor(private authenticationService :AuthenticationService ,
     private router:Router,private route:ActivatedRoute,
     private data:DataSharingService,
     private toastr:ToastrManager
     ) { }
 
  error = '';
  email:string;
  LoginLabelMessage:string ="Email should not be empty !!!";
  password:string;
  LoginPasswordLabelMessage="Login Password should not be empty !!!";
  LoginLoadingMessage="please wait for server response....";
  SendEmailLoadingMessage="please wait for server response...";
  forgotEmail:string;
  loginForgotEmailMessage="Forgot email should not be empty !!!";
  isSendEmailLoadingMessage:boolean=false;
  isForgotPasswordClicked:boolean=false;
  forgotLoading:boolean=false;
  isLoginForgotEmailEmpty:boolean=false;
  isLoginpPasswordEmpty:boolean=false;
  isLoginpEmailEmpty:boolean=false;
  isEmailInputEmpty:boolean=true;
  submitted = false;
  loading = false;
  isLoginLoadingMessage:boolean=false;
  isLoggedIn:boolean=false;
  isToggled:boolean=false;
  redirectURL:any;
  ngOnInit() {
  
  }
  onLoginEmailChanged(){
    if(this.email){
      this.isLoginpEmailEmpty=false;
    }else{
      this.isLoginpEmailEmpty=true;
    }
  }
  OnLoginClicked(){
    if(this.email !==undefined && this.email !=="" && this.password !== undefined && this.password !==""){
     this.submitted = true;
     this.loading = true;
     this.authenticationService.login(this.email, this.password)
     .pipe(
      result=>{
        return result;
      },
      catchError(
        (err)=>{
              this.loading=false;
             this.toastr.errorToastr(err,"Error");
             return "";
        }
      )
    )
     .subscribe(
         data => {
           if(data["message"]==="Auth successful"){
            this.data.changeMessage(true)
             if(this.email==='admin@maxonic.com'){
               this.data.changeStatusOfIsAdminLoggedIn(true);
             }else{
              this.data.changeStatusOfIsAdminLoggedIn(false);
             }
             let params = this.route.snapshot.queryParams;
              if (params['returnUrl']) {
                  this.redirectURL = params['returnUrl'];
             }
            if (this.redirectURL) {        
              this.router.navigateByUrl(this.redirectURL,)
                     .catch(() => this.router.navigate(['homepage']))
           } else {

           this.router.navigate(['attendance'])
              }
            //  this.router.navigateByUrl('attendance')
             this.LoginLoadingMessage=data["message"]; 
             this.isLoginLoadingMessage=true;
             this.loading=false;
             $('#exampleModal').modal('hide');
             $('#exampleModal').modal('hide');
             $('body').removeClass('modal-open');
             $('.modal-backdrop').remove();
           }else{
             if(data["message"]==='Email not found in database !!! Please sign-up first'){
               this.LoginLoadingMessage=data["message"] ;
               this.isLoginLoadingMessage=true;
               this.loading=false;
             }else{
               this.LoginLoadingMessage=data["message"] + " Please try Again with correct password"; 
               this.isLoginLoadingMessage=true;
               this.loading=false;
             }
            
           }
         },
         error => {
             this.error = error;
             this.loading = false;
         }
     )
    }else{
      if(this.email === undefined || this.email === ""){
        this.isLoginpEmailEmpty=true;
      }else if(this.password ===undefined || this.password === ""){
        this.isLoginpPasswordEmpty=true;
      }
    }
  }
  onLoginPasswordChanged(){
    if(this.password){
      this.isLoginpPasswordEmpty=false;
    }else{
      this.isLoginpPasswordEmpty=true;
    }
  }
  onEyeIconClick(){
    this.isToggled=!this.isToggled;
    let x=document.getElementById('password');
    if(x["type"]==="password" ){
     x["type"]="text";
    }else{
     x["type"]="password";
    }
 }
 onForgotPasswordClicked(){
  this.isForgotPasswordClicked=true
  if(this.forgotEmail==="" || this.forgotEmail===undefined){
    this.isLoginForgotEmailEmpty=true;
  }
}
onLoginForgotEmailChanged(){
  if(this.forgotEmail){
    this.isLoginForgotEmailEmpty=false;
    this.isEmailInputEmpty=false;
  }else{
    this.isLoginForgotEmailEmpty=true;
    this.isEmailInputEmpty=false;
  }
 }
 OnLoginSendEmailClicked(){
   this.forgotLoading=true;
   this.authenticationService.sendEmail(this.forgotEmail).pipe(first()).subscribe(result=>{
     this.SendEmailLoadingMessage=result["message"];
     this.isSendEmailLoadingMessage=true;
     this.forgotLoading=false;
   })
 }
}
