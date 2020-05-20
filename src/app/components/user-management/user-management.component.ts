import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import { first } from 'rxjs/operators';
import {AuthenticationService} from '../../_services/authentication.service';
import {ToastrManager} from 'ng6-toastr-notifications';
declare var $: any;
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  loading:boolean=false;
  allUser:any=[];
  constructor(private userService:UserService,private authenticationService:AuthenticationService,
    private toastr:ToastrManager
    
    ) { }
  isDeleteUserLoadingMessage:boolean=false;
  isDeleteUserEmailEmpty:boolean=false;
  signUpLoadingMessage:boolean=false;
  signUpLoading:boolean=false;
  signUpEmail:string;
  signUpPassword:string;
  signUpDOB:Date;
  isSignUpEmailEmpty:boolean=false;
  isSignUpDOBEmpty:boolean=false;
  isLoginLoadingMessage:boolean=false;
  isSignUpPasswordEmpty:boolean=false;
  confirmPassword:string;
  isConfirmPasswordMatched:boolean=false;
  isSignUpConfirmPassToggled:boolean=false;
  issignUpPasswordToggled:boolean=false;
  SignEmailMessage:string="Email should not be empty !!!";
  confirmPasswordMessage:string="Password didn't match";
  message:string="please wait....";
  SignPasswordMessage:string="Password should not be empty !!!";
  SignUpDOBMessage:string="Date of birth should not be empty !!!";
  deleteUserLoadingMessage:string="Please wait for response server....";
  deleteUserEmailResponse:string="Please wait for response server....."
  email:string;
  timezone:string;
  converted_timezone:string;

  ngOnInit() {
    this.userService.get_all_users().pipe(first()).subscribe(
      result=>{
        this.allUser= result["result"]
      }
    )
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
    if(this.signUpEmail !=="" && this.signUpEmail !==undefined && 
    this.signUpPassword !=="" && this.signUpPassword !==undefined && 
    this.signUpDOB !== null && this.signUpDOB !==undefined && this.confirmPassword !==null
     && this.confirmPassword !==undefined &&
      this.converted_timezone!==undefined && this.converted_timezone!=="" 
     ){
      this.signUpLoading=true;
      this.authenticationService.signup(this.signUpEmail,this.signUpPassword,this.signUpDOB,this.converted_timezone).pipe(first()).subscribe(
        result =>{
          console.log(result,"successfully signned up")
          this.message=result["message"]
          this.signUpLoading=false;
          this.signUpLoadingMessage=true;
          this.userService.get_all_users().pipe(first()).subscribe(
            result=>{
              this.allUser= result["result"]
            }
          )
        }
      )   
    }else{
      if(this.signUpEmail ==="" || this.signUpEmail ===undefined){
        this.isSignUpEmailEmpty=true;
      }else if(this.signUpPassword==="" || this.signUpPassword ===undefined){
        this.isSignUpPasswordEmpty=true;
      }else if(this.signUpDOB ===undefined){
        this.isSignUpDOBEmpty=true;
      }else if(this.confirmPassword === undefined){
        this.isConfirmPasswordMatched=true;
      }else if(this.converted_timezone ===undefined || this.converted_timezone ===null){
        this.toastr.warningToastr("Timezone should not be empty","Warning");
    }
    }
   }
  onDeleteUser(){
    this.userService.delete_user(this.email,localStorage.getItem('email')).pipe(first()).subscribe(
      result=>{
        this.deleteUserLoadingMessage=result["message"];
        this.isDeleteUserLoadingMessage=true;
        this.userService.get_all_users().pipe(first()).subscribe(
          result=>{
            this.allUser= result["result"]
          }
        )
      }
    )
  }
  onDeleteUserEmailChanged(){
    if(this.email){
      this.isDeleteUserEmailEmpty=false
    }else{
     this.isDeleteUserEmailEmpty=true;
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
  onSignUpPasswordChanged(){
    if(this.signUpPassword){
      this.isSignUpPasswordEmpty=false;
    }else{
      this.isSignUpPasswordEmpty=true;
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
  OnEmailTextChanged(){
    if(this.signUpEmail){
      this.isSignUpEmailEmpty=false;
    }else{
      this.isSignUpEmailEmpty=true;
    }
  }
}
