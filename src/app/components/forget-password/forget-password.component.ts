import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";
import {ToastrManager} from 'ng6-toastr-notifications';
import {UserService} from '../../_services/user.service';
import {AdminService} from '../../_services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute, private toastr:ToastrManager,
    private userService:UserService,private fb: FormBuilder,private data:AdminService) { 
      this.route.paramMap.subscribe(queryParams => {
        // console.log("email",queryParams.get("email"))
        this.email=queryParams.get("email");
        this.token= queryParams.get("token");
        if(this.email && this.token){
           this.data.changeEmailStatus(true);
        }else{
          this.toastr.errorToastr("Don't change url.","Error",{position:'bottom-right'});
        }
        // console.log("token",this.token);
      })
    }
  passwordForm: FormGroup;
  passwordIsValid = false;
 email:string;
 isPasswordchanged:boolean=false;
 token:string;
 signUpPassword:string;
 isValidPassword:boolean=false;
 isSignUpConfirmPassToggled:boolean=false;
 issignUpPasswordToggled:boolean=false;
 confirmPassword:string;
 signUpLoadingMessage:boolean=false
 confirmPasswordMessage:string="Password didn't match";
 isConfirmPasswordMatched:boolean=false;
 isSignUpPasswordEmpty:boolean=false;
 loading:boolean=false;
//  isStrong:boolean=false;
  ngOnInit() {
    this.isPasswordchanged=false;
    this.passwordForm = this.fb.group({
      signUpPassword: ['', Validators.required],
      confirmPassword:['',Validators.required]
  });
    this.route.paramMap.subscribe(queryParams => {
      // console.log("email",queryParams.get("email"))
      this.email=queryParams.get("email");
      this.token= queryParams.get("token");
      if(this.email && this.token){
         this.data.changeEmailStatus(true);
      }else{
        this.toastr.errorToastr("Don't change url.","Error",{position:'bottom-right'});
      }
      // console.log("token",this.token);
    })
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
  // displayStrength(event:any){
  //   if(event >=3){
  //    this.isStrong=true;
  //   }else{
  //     this.isStrong=false;
  //   }
    
  // }
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
  onSubmitCliked(){
    // console.log(this.passwordForm.value.signUpPassword);
    if(this.passwordForm.value.signUpPassword && (this.passwordForm.value.signUpPassword === this.passwordForm.value.confirmPassword )){
      this.loading=true;
       this.userService.reset_password(this.email,this.token,this.passwordForm.value.signUpPassword).pipe(
        result=>{
          return result;
        },
        catchError(
          (err)=>{
                this.loading=false;
               this.toastr.errorToastr(err,"Error",{position:'bottom-right'});
               return "";
          }
        )
      ).subscribe(result=>{
        this.loading=false;
        this.toastr.infoToastr(result["message"],"Info",{position:'bottom-right'})
        if(result["message"]){
          this.isPasswordchanged=true;
        }
      })
    }else{
      if(this.passwordForm.value.signUpPassword==="" || this.passwordForm.value.signUpPassword ===undefined){
        this.loading=false;
        this.toastr.errorToastr("Password should not be empty","Error",{position:'bottom-right'});
        this.isSignUpPasswordEmpty=true;
      }else if(this.passwordForm.value.signUpPassword !==this.passwordForm.value.confirmPassword){
        this.toastr.warningToastr("Password and confirm password are not same.","Warning",{position:'bottom-right'});
      }
    }
  }
}
