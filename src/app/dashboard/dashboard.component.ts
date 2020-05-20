import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {AuthenticationService } from '../_services/authentication.service';
import {first} from 'rxjs/operators';
import {ImageSliderDataService} from '../_services/image-slider-data.service';
import {DataSharingService} from '../_services/data-sharing.service';
import {
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory
} from '@angular/core';
import {ImageSliderComponent} from '../components/image-slider/image-slider.component';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit  {

  message:string="please wait....";
  isAdminLoggedIn:boolean=false;
  LoginLoadingMessage="please wait for server response....";
  SendEmailLoadingMessage="please wait for server response...";
  confirmPasswordMessage:string="Password didn't match";
  SignPasswordMessage:string="Password should not be empty !!!";
  SignEmailMessage:string="Email should not be empty !!!";
  SignUpDOBMessage:string="Date of birth should not be empty !!!";
  LoginLabelMessage:string ="Email should not be empty !!!";
  LoginPasswordLabelMessage="Login Password should not be empty !!!";
  loginForgotEmailMessage="Forgot email should not be empty !!!";
  isSendEmailLoadingMessage:boolean=false;
  isForgotPasswordClicked:boolean=false;
  forgotLoading:boolean=false;
  forgotEmail:string;
  isLoginForgotEmailEmpty:boolean=false;
  isLoginpPasswordEmpty:boolean=false;
  isLoginpEmailEmpty:boolean=false;
  isSignUpPasswordEmpty:boolean=false;
  isConfirmPasswordMatched:boolean=false;
  isSignUpEmailEmpty:boolean=false;
  isSignUpDOBEmpty:boolean=false;
  isLoginLoadingMessage:boolean=false;
  confirmPassword:string;
  isAnotherComponentClicked:boolean=false;
  isLoggedIn:boolean=false;
  email:string;
  password:string;
  signUpEmail:string;
  signUpPassword:string;
  signUpDOB:Date;
  isToggled:boolean=true;
  isSignUpConfirmPassToggled:boolean=false;
  issignUpPasswordToggled:boolean=false;
  submitted = false;
  loading = false;
  signUpLoading:boolean=false;
  signUpLoadingMessage:boolean=false
  returnUrl: string;
  error = '';
  componentRef: any;
  @ViewChild('slidercontainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  constructor( 
    private router:Router,
    private authenticationService :AuthenticationService ,
    private data: ImageSliderDataService,
    private resolver: ComponentFactoryResolver,
    private dataSharingService:DataSharingService
    ) {
      if(localStorage.getItem('email')==='admin@maxonic.com'){
        this.isAdminLoggedIn=true;
      }else{
        this.isAdminLoggedIn=false;
      }
      if(localStorage.getItem('email')!==undefined || localStorage.getItem('email') !=="" 
      || localStorage.getItem('email')!==null
      ){
        this.isLoggedIn=true;
      }else{
        this.isLoggedIn=false;
      }
      this.dataSharingService.currentMessage.subscribe((message)=>{
        this.isLoggedIn=message;
        if(localStorage.getItem('email')){
          this.isLoggedIn=true;
        }
       
      })
      this.dataSharingService.currentStatusOfIsAdminLoggedIn.subscribe((status)=>{
        this.isAdminLoggedIn=status;
        if(localStorage.getItem('email')==='admin@maxonic.com'){
          this.isAdminLoggedIn=true;
        }
      })
     }

  ngOnInit() {

  this.authenticationService.check_JWT_IS_VALID().pipe(first()).subscribe(
    result=>{
      if(result["failed"]){
          this.authenticationService.logout();  
          //  this.createComponent();
      }
    }
  )  
  }
  onNavBarLoginClicked(){
    this.router.navigateByUrl('login');
   }
   onNavBarSignUpClicked(){
     this.router.navigateByUrl('sign-up');
   }
  // onPasswordChanged(){
  //   if(this.confirmPassword === this.signUpPassword){
  //          this.confirmPasswordMessage="Password Matched"
  //          this.isConfirmPasswordMatched=true
  //          $('#confirmPasswordMessage').css("color","green");
  //   }else{
  //         this.isConfirmPasswordMatched=true;
  //   }
  // }
  // onForgotPasswordClicked(){
  //   this.isForgotPasswordClicked=true
  //   if(this.forgotEmail==="" || this.forgotEmail===undefined){
  //     this.isLoginForgotEmailEmpty=true;
  //   }
  // }
  onSignOutClicked(){
    //remove user from local storage
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isLoggedIn');
    this.router.navigateByUrl('login');
  if(localStorage.getItem('currentUser')){
    this.isLoggedIn=true;
   }else{
    this.isLoggedIn=false;
   }
  //  this.destroyComponent();
  //  this.createComponent();
  //  if(!this.authenticationService.isLogged()){
  //   this.data.getData().subscribe((result: Result) => {
  //     this.entry['_data'].componentView.component.sliderArray = result.sliderArray;
  //   });
  // }else{
  //   this.data.getDataAfterLogin().subscribe((result: Result) => {
  //     this.entry['_data'].componentView.component.sliderArray = result.sliderArray;
  //   });
  // }
  }
//   onEyeIconClick(){
//     this.isToggled=!this.isToggled;
//     let x=document.getElementById('password');
//     if(x["type"]==="password" ){
//      x["type"]="text";
//     }else{
//      x["type"]="password";
//     }
//  }
//  OnEmailTextChanged(){
//    if(this.signUpEmail){
//      this.isSignUpEmailEmpty=false;
//    }else{
//      this.isSignUpEmailEmpty=true;
//    }
//  }
//  onSignUpPasswordChanged(){
//    if(this.signUpPassword){
//      this.isSignUpPasswordEmpty=false;
//    }else{
//      this.isSignUpPasswordEmpty=true;
//    }
//  }
//  onLoginForgotEmailChanged(){
//   if(this.forgotEmail){
//     this.isLoginForgotEmailEmpty=false;
//   }else{
//     this.isLoginForgotEmailEmpty=true;
//   }
//  }
//  OnLoginSendEmailClicked(){
//    this.forgotLoading=true;
//    this.authenticationService.sendEmail(this.forgotEmail).pipe(first()).subscribe(result=>{
//      this.SendEmailLoadingMessage=result["message"];
//      this.isSendEmailLoadingMessage=true;
//      this.forgotLoading=false;
//    })
//  }
//  onLoginEmailChanged(){
//    if(this.email){
//      this.isLoginpEmailEmpty=false;
//    }else{
//      this.isLoginpEmailEmpty=true;
//    }
//  }
//  onLoginPasswordChanged(){
//    if(this.password){
//      this.isLoginpPasswordEmpty=false;
//    }else{
//      this.isLoginpPasswordEmpty=true;
//    }
//  }
//  OnSignUpDobChanged(){
//    if(this.signUpDOB){
//      this.isSignUpDOBEmpty=false;
//    }else{
//      this.isSignUpDOBEmpty=true;
//    }
//  }
//  onConfirmPassEyeIconClick(){
//    this.isSignUpConfirmPassToggled=!this.isSignUpConfirmPassToggled;
//    let x=document.getElementById('Confirmpassword');
//    if(x["type"]==="password" ){
//     x["type"]="text";
//    }else{
//     x["type"]="password";
//    }
//  }
//  onSignUpPasswordEyeIconClick(){
//    this.issignUpPasswordToggled=!this.issignUpPasswordToggled;
//    let x=document.getElementById('signUpPassword');
//    if(x["type"]==="password" ){
//     x["type"]="text";
//    }else{
//     x["type"]="password";
//    }
//  }
//  OnLoginClicked(){
//    if(this.email !==undefined && this.email !=="" && this.password !== undefined && this.password !==""){
//     this.submitted = true;
//     this.loading = true;
//     this.authenticationService.login(this.email, this.password)
//     .pipe(first())
//     .subscribe(
//         data => {
//           if(data["message"]==="Auth successful"){
//             this.destroyComponent();
//             this.createComponent();
//             this.LoginLoadingMessage=data["message"]; 
//             this.isLoginLoadingMessage=true;
//              if(localStorage.getItem('currentUser')){
//                this.isLoggedIn=true;
//               }else{
//                this.isLoggedIn=false;
//               }
//             this.loading=false;
//             $('#exampleModal').modal('hide');
//             $('#exampleModal').modal('hide');
//             $('body').removeClass('modal-open');
//             $('.modal-backdrop').remove();
//           }else{
//             this.LoginLoadingMessage=data["message"] + " Please try Again with correct password"; 
//             this.isLoginLoadingMessage=true;
//             this.loading=false;
//           }
//         },
//         error => {
//             this.error = error;
//             this.loading = false;
//         }
//     )
//    }else{
//      if(this.email === undefined || this.email === ""){
//        this.isLoginpEmailEmpty=true;
//      }else if(this.password ===undefined || this.password === ""){
//        this.isLoginpPasswordEmpty=true;
//      }
//    }
//  }
//  onSubmitCliked(){
//   if(this.signUpEmail !=="" && this.signUpEmail !==undefined && this.signUpPassword !=="" && this.signUpPassword !==undefined && this.signUpDOB !== null && this.signUpDOB !==undefined && this.confirmPassword !==null && this.confirmPassword !==undefined ){
//     this.signUpLoading=true;
//     this.authenticationService.signup(this.signUpEmail,this.signUpPassword,this.signUpDOB).pipe(first()).subscribe(
//       result =>{
//         console.log(result,"successfully signned up")
//         this.message=result["message"]
//         this.signUpLoading=false;
//         this.signUpLoadingMessage=true;
//       }
//     )   
//   }else{
//     if(this.signUpEmail ==="" || this.signUpEmail ===undefined){
//       this.isSignUpEmailEmpty=true;
//     }else if(this.signUpPassword==="" || this.signUpPassword ===undefined){
//       this.isSignUpPasswordEmpty=true;
//     }else if(this.signUpDOB ===undefined){
//       this.isSignUpDOBEmpty=true;
//     }else if(this.confirmPassword === undefined){
//       this.isConfirmPasswordMatched=true;
//     }
//   }

//  }
 createComponent() {
  // this.entry.clear();
  const factory = this.resolver.resolveComponentFactory(ImageSliderComponent);
  this.componentRef = this.entry.createComponent(factory);
  // this.componentRef.instance.message = message;
  //  this.componentRef.instance.sliderArray=[];
  this.componentRef.instance._ref = ImageSliderComponent;
  
  // if(!this.authenticationService.isLogged()){
  //   this.data.getData().subscribe((result: Result) => {
  //     this.entry['_data'].componentView.component.sliderArray = result.sliderArray;
  //   });
  // }else{
  //   this.data.getDataAfterLogin().subscribe((result: Result) => {
  //     this.entry['_data'].componentView.component.sliderArray = result.sliderArray;
  //   });
  // }
}
destroyComponent() {
  if(this.componentRef){
    this.componentRef.destroy();
  }
}
onPfFormClicked(){

  this.destroyComponent();
  this.router.navigateByUrl('pf-form');
}
onEsiFormClicked(){
  this.destroyComponent();
  this.router.navigateByUrl('esi-form');
}
OnHrFormalitiesClicked(){
  this.destroyComponent();
  this.router.navigateByUrl('hr-formalities');
}
OnTimesheetClicked(){
  this.destroyComponent();
  this.router.navigateByUrl(`timesheet/${localStorage.getItem('email')}`);
}
onPdfClicked(){
  this.destroyComponent();
  this.router.navigateByUrl('pdf');
}
onAttendanceClicked(){
  this.destroyComponent();
  this.router.navigateByUrl('attendance');
}
onResetPasswordClicked(){
   this.destroyComponent();
   this.router.navigateByUrl('reset-password');
}
onResignationClicked(){
  this.destroyComponent();
  this.router.navigateByUrl('resignation')
}
onUserManagementClicked(){
  this.destroyComponent();
  this.router.navigateByUrl('user-management')
}
OnCreateEventClicked(){
  this.destroyComponent();
  this.router.navigateByUrl('event-creation')
}
OnHolidaysManagementClicked(){
  this.destroyComponent();
  this.router.navigateByUrl('holidays');
}
OnIntranetClicked(){
  this.destroyComponent();
  this.router.navigateByUrl('intranet');
}
}
