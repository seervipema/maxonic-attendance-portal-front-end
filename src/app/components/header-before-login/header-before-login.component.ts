import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import {first} from 'rxjs/operators';
import {AuthenticationService } from '../../_services/authentication.service';
declare var $: any;
import {AppComponent} from '../../app.component';
@Component({
  selector: 'app-header-before-login',
  templateUrl: './header-before-login.component.html',
  styleUrls: ['./header-before-login.component.css']
})
export class HeaderBeforeLoginComponent   implements OnInit {

  // isLoggedIn:boolean=false;
  email:string;
  password:string;
  isToggled:boolean=false;
  isSignUpConfirmPassToggled:boolean=false;
  issignUpPasswordToggled:boolean=false;
  loginForm:FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  error = '';
  constructor(
    public route:ActivatedRoute,
    public router:Router,
    public authenticationService :AuthenticationService 
  ) { 
    
  }

  ngOnInit() {
    if(localStorage.getItem('currentUser')){
      this.router.navigateByUrl('/dashboard')
      // this.isLoggedIn=true;
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
 OnLoginClicked(){
   this.submitted = true;

   // stop if form is invalid
   // if(this.loginForm.invalid){
   //     return;
   // }

   this.loading = true;

   this.authenticationService.login(this.email, this.password)
   .pipe(first())
   .subscribe(
       data => {
           console.log(data);
            this.router.navigateByUrl('/dashboard')
          //  this.isLoggedIn=true;
           this.loading=false;
           $('#exampleModal').modal('hide');
           $('#exampleModal').modal('hide');
           $('body').removeClass('modal-open');
           $('.modal-backdrop').remove();
       },
       error => {
           this.error = error;
           this.loading = false;
       }
   )
 }
 onSubmitCliked(){

 }


}
