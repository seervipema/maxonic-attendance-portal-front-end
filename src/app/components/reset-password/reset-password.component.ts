import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {first} from 'rxjs/operators';
declare var $: any;
import {ToastrManager} from 'ng6-toastr-notifications';
import {UserService} from '../../_services/user.service';
import { catchError } from 'rxjs/operators';
declare var $: any;
import {Router} from  "@angular/router";
import {AdminService} from '../../_services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  isSignUpConfirmPassToggled:boolean=false;
  issignUpPasswordToggled:boolean=false;
  passwordForm: FormGroup;
  signUpPassword:string;
  isValidPassword:boolean=false;
  confirmPassword:string;
  confirmPasswordMessage:string="Password didn't match";
  isConfirmPasswordMatched:boolean=false;
  loading:boolean=false;
  isCurrentPasswordToggeld:boolean=false;
  isConfirmCurrentPasswordToggled:boolean=false;
  isSubmitClicked:boolean=false;
  isPasswordchanged:boolean=false;
  constructor(private authenticationService :AuthenticationService, private userService:UserService,
     private toastr:ToastrManager,private fb: FormBuilder,private router:Router ,private data:AdminService) { }
  forgotEmail:string
  isForgotPasswordClicked:boolean=false;
  isLoginForgotEmailEmpty:boolean=false;
  passwordIsValid = false;
  loginForgotEmailMessage="Forgot email should not be empty !!!";
  forgotLoading:boolean=false;
  SendEmailLoadingMessage="please wait for server response...";
  isSendEmailLoadingMessage:boolean=false;
  isEmailInputEmpty:boolean=true;
  isSendEmailClicked:boolean=false;
  ngOnInit() {
    this.CheckJWTAuthentication();
    this.isPasswordchanged=false;
    this.isSubmitClicked=false;
    this.passwordForm = this.fb.group({
      signUpPassword: ['', Validators.required],
      confirmPassword:['',Validators.required],
      currentPassword:['',Validators.required],
      confirmCurrentPassword:['',Validators.required]
  });
  }
  CheckJWTAuthentication(){
  this.authenticationService.check_JWT_IS_VALID().pipe(
      result=>{
        return result;
      },
      catchError(
        (err)=>{
             this.toastr.errorToastr(err,"Error",{position:'bottom-right'});
             return "";
        }
      )
    ).subscribe(
  result=>{
    if(result["failed"]){
        // this.authenticationService.logout();
        // this.router.navigateByUrl('/');
       this.data.changeMessage(false);
    }else{
      this.data.changeMessage(true);
    }
  }
  )
  }
  onSubmitCliked(){
    // console.log(this.passwordForm.value.signUpPassword);
    this.isSubmitClicked=true;
    if(this.passwordForm.value.signUpPassword && (this.passwordForm.value.signUpPassword === this.passwordForm.value.confirmPassword ) &&
    this.passwordForm.value.currentPassword && (this.passwordForm.value.currentPassword === this.passwordForm.value.confirmCurrentPassword)
    && this.passwordIsValid
     ){
      this.loading=true;
       this.userService.reset_password_after_login(localStorage.getItem('email'),this.passwordForm.value.currentPassword,this.passwordForm.value.signUpPassword).pipe(
        result=>{
          return result;
        },
        catchError(
          (err)=>{
                this.isSubmitClicked=false;
                this.loading=false;
               this.toastr.errorToastr(err,"Error",{position:'bottom-right'});
               return "";
          }
        )
      ).subscribe(result=>{
        this.loading=false;
        this.isSubmitClicked=false;
        this.toastr.infoToastr(result["message"],"Info",{position:'bottom-right'})
        if(result["message"]){
         
          this.isPasswordchanged=true;
        }
        if(result["message"]==="Password changed successfully"){
          this.router.navigate(['/login']);
          this.data.changeMessage(false);
        }
      })
    }else{
      this.loading=false;
      this.isSubmitClicked=false;
      if(this.passwordForm.value.signUpPassword==="" || this.passwordForm.value.signUpPassword ===undefined){
        this.toastr.errorToastr("New password should not be empty.","Error",{position:'bottom-right'});
      }else if(this.passwordForm.value.signUpPassword !==this.passwordForm.value.confirmPassword){
        this.toastr.warningToastr("Password and confirm password are not same.","Warning",{position:'bottom-right'});
      }else if(!this.passwordForm.value.currentPassword){
        this.toastr.errorToastr("Current password should not be empty.","Error",{position:'bottom-right'});
      }else if(this.passwordForm.value.currentPassword !==this.passwordForm.value.confirmCurrentPassword){
        this.toastr.warningToastr("Current password and confirm current password are not same.","Warning",{position:'bottom-right'});
      }else if(!this.passwordIsValid){
        this.toastr.warningToastr("Strong password required.","Warning",{position:'bottom-right'});
      }
    }
  }
   onPasswordChanged(){
    if(this.confirmPassword === this.signUpPassword){
           this.confirmPasswordMessage="Password Matched"
           this.isConfirmPasswordMatched=true
           $('#confirmPasswordMessage').css("color","green");
    }else{
          this.isConfirmPasswordMatched=true;
          this.confirmPasswordMessage="Password didn't match"
          $('#confirmPasswordMessage').css("color","red");
    }
  }
   passwordValid(event) {
    this.passwordIsValid = event;
  }
  onSignUpPasswordChanged(){
   // console.log(this.isStrong);
    if(this.signUpPassword.length >=8 && this.signUpPassword.length <= 50){
      this.isValidPassword=true;
    }else{
      this.isValidPassword=false;
    }
  }
  onCurrentPasswordEyeIconClick(){
  this.isCurrentPasswordToggeld=!this.isCurrentPasswordToggeld;
  let x= document.getElementById('currentPassword');
  if(x["type"] ==="password"){
      x["type"]="text";
  }else{
      x["type"]="password";
  }
  }
  onConfirmCurrentPassEyeIconClick(){
    this.isConfirmCurrentPasswordToggled=!this.isConfirmCurrentPasswordToggled;
  let x= document.getElementById('confirmCurrentPassword');
  if(x["type"] ==="password"){
      x["type"]="text";
  }else{
      x["type"]="password";
  }
  }
   onConfirmPassEyeIconClick(){
    this.isSignUpConfirmPassToggled=!this.isSignUpConfirmPassToggled;
    let x=document.getElementById('Confirmpassword');
    if(x["type"]==="password" ){
     x["type"]="text";
    }else{
     x["type"]="password";
    }
  }
  onSignUpPasswordEyeIconClick(){
    this.issignUpPasswordToggled=!this.issignUpPasswordToggled;
    let x=document.getElementById('signUpPassword');
    if(x["type"]==="password" ){
     x["type"]="text";
    }else{
     x["type"]="password";
    }
  }
}
