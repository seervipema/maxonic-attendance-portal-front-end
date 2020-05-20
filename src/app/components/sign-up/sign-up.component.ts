import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {first} from 'rxjs/operators';
import {ToastrManager} from 'ng6-toastr-notifications';
declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authenticationService :AuthenticationService,
    private toastr:ToastrManager) { }
  signUpEmail:string;
  timezone:string;
  converted_timezone:string;
  isSignUpEmailEmpty:boolean=false;
  signUpLoading:boolean=false;
  signUpLoadingMessage:boolean=false
  message:string="please wait....";
  signUpPassword:string;
  signUpDOB:Date;
  confirmPassword:string;
  isSignUpPasswordEmpty:boolean=false;
  isConfirmPasswordMatched:boolean=false;
  isSignUpDOBEmpty:boolean=false;
  confirmPasswordMessage:string="Password didn't match";
  isSignUpConfirmPassToggled:boolean=false;
  issignUpPasswordToggled:boolean=false;
  isEmailValid:boolean=false;
  ngOnInit() {
  }
  OnEmailTextChanged(signUpEmail1:any){
    if(!(signUpEmail1.errors &&(signUpEmail1.touched || signUpEmail1.dirty))){
       console.log("done");
       this.isEmailValid=true;
    }else{
      this.isEmailValid=false;
    }
    if(this.signUpEmail){
      this.isSignUpEmailEmpty=false;
    }else{
      this.isSignUpEmailEmpty=true;
    }
  }
  onTimezonechanged(){
    console.log("timezone",this.timezone);
    if(this.timezone==="IST"){
       this.converted_timezone="Asia/Calcutta";
    }else if(this.timezone==="PST"){
      this.converted_timezone="America/Los_Angeles";
    }else if(this.timezone==="EST"){
      this.converted_timezone="America/New_York";
    }else{
    this.converted_timezone="Asia/Calcutta"
    }
  }
  onSubmitCliked(){
    if(this.signUpEmail !=="" && this.signUpEmail !==undefined && this.signUpPassword !=="" 
    && this.signUpPassword !==undefined && this.signUpDOB !== null
     && this.signUpDOB !==undefined && this.confirmPassword !==null 
     && this.confirmPassword !==undefined && this.converted_timezone!==undefined && this.converted_timezone!=="" &&this.isEmailValid ){
      this.signUpLoading=true;
      this.authenticationService.signup(this.signUpEmail,this.signUpPassword,this.signUpDOB,this.converted_timezone).pipe(first()).subscribe(
        result =>{
          // console.log(result,"successfully signned up")
          if(result["message1"]){
            this.toastr.successToastr(result["message1"],"Success");
          }
          if(result["message"]){
            this.toastr.successToastr(result["message"],"Success");
          }
          this.message=result["message"]
          this.signUpLoading=false;
          this.signUpLoadingMessage=true;
        }
      )   
    }else{
      // console.log("signUpEmail1)
      if(!this.isEmailValid){
        this.toastr.errorToastr("Email is not valid for sign-up","Error");
      }
     if(this.signUpEmail ==="" || this.signUpEmail ===undefined){
      this.toastr.errorToastr("Email should not be empty","Error");
        this.isSignUpEmailEmpty=true;
      }else if(this.signUpPassword==="" || this.signUpPassword ===undefined){
        this.toastr.errorToastr("Password should not be empty","Error");
        this.isSignUpPasswordEmpty=true;
      }else if(this.signUpDOB ===undefined){
        this.toastr.errorToastr("DOB should not be empty","Error");
        this.isSignUpDOBEmpty=true;
      }else if(this.confirmPassword === undefined){
        this.toastr.errorToastr("Confirm password should not be empty","Error");
        this.isConfirmPasswordMatched=true;
      }else if(this.converted_timezone ===undefined || this.converted_timezone ===null){
        this.toastr.warningToastr("Timezone should not be empty","Warning");
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
    }
  }
  onSignUpPasswordChanged(){
    if(this.signUpPassword){
      this.isSignUpPasswordEmpty=false;
    }else{
      this.isSignUpPasswordEmpty=true;
    }
  }
  OnSignUpDobChanged(){
    if(this.signUpDOB){
      this.isSignUpDOBEmpty=false;
    }else{
      this.isSignUpDOBEmpty=true;
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
