 import { Component } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';


// import {FormBuilder,FormGroup,Validators} from "@angular/forms";
// import {first} from 'rxjs/operators';
// import {AuthenticationService } from './_services/authentication.service';
// declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // isLoggedIn:boolean=false;
  // email:string;
  // password:string;
  //  isToggled:boolean=false;
  // isSignUpConfirmPassToggled:boolean=false;
  // issignUpPasswordToggled:boolean=false;
  // loginForm:FormGroup;
  // submitted = false;
  // loading = false;
  // returnUrl: string;
  // error = '';
 
  constructor(
    // private formBuilder:FormBuilder,
  //  public route:ActivatedRoute,
  //  private router:Router,
  //  public authenticationService :AuthenticationService 
  
  ){}
  ngOnInit(){

      //  if(localStorage.getItem('currentUser')){
      //   this.router.navigateByUrl('/dashboard')
      //   this.isLoggedIn=true;
      //  }else{
      //   this.isLoggedIn=false;
      //  }
      // this.router.navigateByUrl('/dashboard')
      
  }
 
  title = 'app';
  // onEyeIconClick(){
  //    this.isToggled=!this.isToggled;
  //    let x=document.getElementById('password');
  //    if(x["type"]==="password" ){
  //     x["type"]="text";
  //    }else{
  //     x["type"]="password";
  //    }
  // }
  // onConfirmPassEyeIconClick(){
  //   this.isSignUpConfirmPassToggled=!this.isSignUpConfirmPassToggled;
  //   let x=document.getElementById('Confirmpassword');
  //   if(x["type"]==="password" ){
  //    x["type"]="text";
  //   }else{
  //    x["type"]="password";
  //   }
  // }
  // onSignUpPasswordEyeIconClick(){
  //   this.issignUpPasswordToggled=!this.issignUpPasswordToggled;
  //   let x=document.getElementById('signUpPassword');
  //   if(x["type"]==="password" ){
  //    x["type"]="text";
  //   }else{
  //    x["type"]="password";
  //   }
  // }
  // OnLoginClicked(){
  //   this.submitted = true;

    

  //   this.loading = true;

  //   this.authenticationService.login(this.email, this.password)
  //   .pipe(first())
  //   .subscribe(
  //       data => {
  //           console.log(data);
  //           this.router.navigateByUrl('/dashboard')
  //           this.isLoggedIn=true;
  //           this.loading=false;
  //           $('#exampleModal').modal('hide');
  //           $('#exampleModal').modal('hide');
  //           $('body').removeClass('modal-open');
  //           $('.modal-backdrop').remove();
  //       },
  //       error => {
  //           this.error = error;
  //           this.loading = false;
  //       }
  //   )
  // }
  // onSubmitCliked(){

  // }

}
