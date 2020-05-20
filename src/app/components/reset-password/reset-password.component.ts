import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {first} from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authenticationService :AuthenticationService ) { }
  forgotEmail:string
  isForgotPasswordClicked:boolean=false;
  isLoginForgotEmailEmpty:boolean=false;
  loginForgotEmailMessage="Forgot email should not be empty !!!";
  forgotLoading:boolean=false;
  SendEmailLoadingMessage="please wait for server response...";
  isSendEmailLoadingMessage:boolean=false;
  isEmailInputEmpty:boolean=true;
  ngOnInit() {
    
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
    this.isEmailInputEmpty=true;
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
