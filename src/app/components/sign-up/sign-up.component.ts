import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {first} from 'rxjs/operators';
import {ToastrManager} from 'ng6-toastr-notifications';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authenticationService :AuthenticationService,
    private toastr:ToastrManager,private fb: FormBuilder) { }
    passwordForm: FormGroup;
    passwordIsValid = false;
  converted_timezone:any;
  isSignUpEmailEmpty:boolean=false;
  signUpLoading:boolean=false;
  signUpLoadingMessage:boolean=false
  message:string="please wait.";
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
  isValidPassword:boolean=false;
  isSignUpButtonAlreadyClicked:boolean=false;

  isStrong:boolean=false;
  ngOnInit() {
    this.isSignUpButtonAlreadyClicked=true;
    this.passwordForm = this.fb.group({
      signUpPassword: ['', Validators.required],
      confirmPassword:['',Validators.required],
      signUpEmail:['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@(maxonic\.com)")]],
      signUpDOB:['',Validators.required],
      timezone:['',Validators.required]
  });
  }
  // OnEmailTextChanged(signUpEmail1:any){
  //   if(!(signUpEmail1.errors &&(signUpEmail1.touched || signUpEmail1.dirty))){
  //      console.log("done");
  //      this.isEmailValid=true;
  //   }else{
  //     this.isEmailValid=false;
  //   }
    // if(this.signUpEmail){
    //   this.isSignUpEmailEmpty=false;
    // }else{
    //   this.isSignUpEmailEmpty=true;
    // }
    // }
  get signUpEmail(){
    return this.passwordForm.get('signUpEmail');
  }
  passwordValid(event) {
    this.passwordIsValid = event;
  }
  // onTimezonechanged(){
  //   console.log("timezone",this.timezone);
  //   if(this.timezone==="IST"){
  //      this.converted_timezone="Asia/Calcutta";
  //   }else if(this.timezone==="PST"){
  //     this.converted_timezone="America/Los_Angeles";
  //   }else if(this.timezone==="EST"){
  //     this.converted_timezone="America/New_York";
  //   }else{
  //   this.converted_timezone="Asia/Calcutta"
  //   }
  // }
  onSubmitCliked(){
    if(this.passwordForm.value.timezone==="IST"){
      this.converted_timezone="Asia/Calcutta";
    }else if(this.passwordForm.value.timezone==="PST"){
          this.converted_timezone="America/Los_Angeles";
    }else if(this.passwordForm.value.timezone==="EST"){
          this.converted_timezone="America/New_York";
    }else{
        this.converted_timezone="Asia/Calcutta"
    }
    if(this.passwordForm.value.signUpEmail !=="" && this.passwordForm.value.signUpEmail !==undefined && this.passwordForm.value.signUpPassword !=="" && this.passwordForm.value.signUpPassword !==undefined && this.passwordForm.value.signUpDOB  && this.passwordForm.value.confirmPassword !==null && this.passwordForm.value.confirmPassword !==undefined && (!this.signUpEmail.errors)  && (this.passwordForm.value.signUpPassword ===this.passwordForm.value.confirmPassword && this.passwordIsValid)  && this.converted_timezone){
      this.signUpLoading=true;
      this.authenticationService.signup(this.passwordForm.value.signUpEmail,this.passwordForm.value.signUpPassword,this.passwordForm.value.signUpDOB,this.converted_timezone).pipe(first()).subscribe(
        result =>{
          // console.log(result,"successfully signned up")
          if(result["message1"]){
            this.toastr.successToastr(result["message1"],"Success",{position:'bottom-right'});
          }
          if(result["message"]){
            this.toastr.successToastr(result["message"],"Success",{position:'bottom-right'});
          }
          this.message=result["message"]
          this.signUpLoading=false;
          this.signUpLoadingMessage=true;
          this.isSignUpButtonAlreadyClicked=true;
        }
      )   
    }else{
    
      if(this.signUpEmail.errors){
        this.toastr.errorToastr("Email is not valid for sign-up.","Error",{position:'bottom-right'});
      }
      if(this.passwordForm.value.signUpEmail ==="" || this.passwordForm.value.signUpEmail ===undefined){
        this.toastr.errorToastr("Email should not be empty.","Error",{position:'bottom-right'});
        this.isSignUpEmailEmpty=true;
      }else if(this.passwordForm.value.signUpPassword==="" || this.passwordForm.value.signUpPassword ===undefined){
        this.toastr.errorToastr("Password should not be empty.","Error",{position:'bottom-right'});
        this.isSignUpPasswordEmpty=true;
      }else if(!this.passwordForm.value.signUpDOB){
        this.toastr.errorToastr("DOB should not be empty.","Error",{position:'bottom-right'});
        this.isSignUpDOBEmpty=true;
      }else if(this.passwordForm.value.confirmPassword === undefined){
        this.toastr.errorToastr("Confirm password should not be empty.","Error",{position:'bottom-right'});
        this.isConfirmPasswordMatched=true;
      }else if(this.passwordForm.value.signUpPassword !==this.passwordForm.value.confirmPassword){
        this.toastr.warningToastr("Passwords do not match.","Warning",{position:'bottom-right'});
      }else if(!this.passwordIsValid){
        this.toastr.errorToastr("Strong password required.","Error",{position:'bottom-right'});
      }else if(this.converted_timezone ===undefined || this.converted_timezone ===null){
        this.toastr.warningToastr("Timezone should not be empty","Warning",{position:'bottom-right'});
      }
      this.isSignUpButtonAlreadyClicked=true;
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
