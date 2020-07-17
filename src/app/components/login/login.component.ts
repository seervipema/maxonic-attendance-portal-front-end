import { Component, OnInit,Input } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {first} from 'rxjs/operators';
import {AdminService} from '../../_services/admin.service';
import { catchError } from 'rxjs/operators';
import {ToastrManager} from 'ng6-toastr-notifications'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
 
  constructor(private authenticationService :AuthenticationService , 
   private router:Router,private route:ActivatedRoute,
   private data:AdminService,private toastr:ToastrManager,private fb: FormBuilder
     ) { }

  forgetPasswordForm: FormGroup;
  message:boolean;
  error = '';
  email:string;
  LoginLabelMessage:string ="Email should not be empty.";
  password:string;
  LoginPasswordLabelMessage="Login Password should not be empty.";
  LoginLoadingMessage="please wait for server response.";
  SendEmailLoadingMessage="please wait for server response.";
  // forgotEmail:string;
  loginForgotEmailMessage="Forgot email should not be empty.";
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
  isLoginButtonAlreadyClicked:boolean=false;
  isForgotPasswordAlreadyClicked:boolean=false;
  isEmailSent:boolean=false;
  ngOnInit() {
    this.forgetPasswordForm = this.fb.group({
      forgotEmail:['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@(maxonic\.com)")]]
  });
    this.isLoginButtonAlreadyClicked=true;
    this.isForgotPasswordAlreadyClicked=true;
    this.data.currentMessage.subscribe(message => {
      this.isLoggedIn = message
    console.log(this.isLoggedIn);
    })
  }
  onLoginEmailChanged(){
    if(this.email){
      this.isLoginpEmailEmpty=false;
    }else{
      this.isLoginpEmailEmpty=true;
    }
  }
  get  forgotEmail(){
    return this.forgetPasswordForm.get('forgotEmail');
  }
  OnLoginClicked(){
    this.isLoginButtonAlreadyClicked=false;
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
           this.toastr.errorToastr(err,"Error",{position:'bottom-right'});
           this.isLoginButtonAlreadyClicked=true;
           return "";
      }
    )
  )
     .subscribe(
         data => {
           if(data["message"]==="Auth successful"){
            this.data.changeMessage(true)
            if(this.email==="admin@maxonic.com"){
              this.data.changeAdminStatus(true);
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
             this.isLoginButtonAlreadyClicked=true
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
          this.isLoginButtonAlreadyClicked=true;
              console.log(error)
             this.error = error;
             this.loading = false;
         }
     )
    }else{
      this.isLoginButtonAlreadyClicked=true;
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
   this.forgetPasswordForm.reset();
   if(this.isEmailSent){
    this.isEmailSent=false;
   }
   this.isForgotPasswordAlreadyClicked=true;
  this.isForgotPasswordClicked=!this.isForgotPasswordClicked;
  if(this.forgetPasswordForm.value.forgotEmail==="" || this.forgetPasswordForm.value.forgotEmail===undefined){
    this.isLoginForgotEmailEmpty=true;
  }
}
onLoginForgotEmailChanged(){
  if(this.forgetPasswordForm.value.forgotEmail){
    this.isLoginForgotEmailEmpty=false;
    this.isEmailInputEmpty=false;
  }else{
    this.isLoginForgotEmailEmpty=true;
    this.isEmailInputEmpty=false;
  }
 }
 OnLoginSendEmailClicked(){
  if(this.forgetPasswordForm.value.forgotEmail && !this.forgotEmail.errors){
    this.isForgotPasswordAlreadyClicked=false;
    this.forgotLoading=true;
    this.authenticationService.sendEmail(this.forgetPasswordForm.value.forgotEmail)
    .pipe(
     result=>{
       return result;
     },
     catchError(
       (err)=>{
        this.forgotLoading=false;
            this.toastr.errorToastr(err,"Error",{position:'bottom-right'});
            this.isForgotPasswordAlreadyClicked=true;
            return "";
       }
     )
   ).subscribe(result=>{
      this.SendEmailLoadingMessage=result["message"];
      if(result["message"]==="Check your email inbox to reset the password."){
        this.isEmailSent=true;
      }
      this.toastr.infoToastr(result["message"],"info",{position:"bottom-right"})
      this.isSendEmailLoadingMessage=true;
      this.forgotLoading=false;
      this.isForgotPasswordAlreadyClicked=true;
    })
  }else{
    this.isForgotPasswordAlreadyClicked=true;
    this.forgotLoading=false;
         if(!this.forgetPasswordForm.value.forgotEmail){
           this.toastr.warningToastr("Email should not be empty.","Warning",{position:"bottom-right"})
         }else if(this.forgotEmail.errors){
          this.toastr.warningToastr("Email is not valid.","Warning",{position:'bottom-right'});
       
        }
  }
 }
}
