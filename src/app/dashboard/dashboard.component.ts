import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {AuthenticationService } from '../_services/authentication.service';
import {first} from 'rxjs/operators';
import {AdminService} from '../_services/admin.service';
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
    private data: AdminService,
    private resolver: ComponentFactoryResolver,
    private dataSharingService:DataSharingService
    ) {
      if(localStorage.getItem('email')==='admin@maxonic.com'){
        this.isAdminLoggedIn=true;
      }else{
        this.isAdminLoggedIn=false;
      }
      // this.dataSharingService.currentMessage.subscribe((message)=>{
      //   this.isLoggedIn=message;
      //   if(localStorage.getItem('email')){
      //     this.isLoggedIn=true;
      //   }
       
      // })
      // this.dataSharingService.currentStatusOfIsAdminLoggedIn.subscribe((status)=>{
      //   this.isAdminLoggedIn=status;
      //   if(localStorage.getItem('email')==='admin@maxonic.com'){
      //     this.isAdminLoggedIn=true;
      //   }
      // })
     }

  ngOnInit() {
 // this.data.emailMessage.subscribe((message)=>{
    //   console.log("mesage",message);
    //   if(message){
    //      //do nothing
    //   }else{
    //     this.authenticationService.check_JWT_IS_VALID().pipe(first()).subscribe(
    //       result=>{
    //         if(result["failed"]){
    //             this.authenticationService.logout();
    //             // this.router.navigateByUrl('/');
    //             // if(localStorage.getItem('currentUser')){
    //             //   this.isLoggedIn=true;
    //             //  }else{
    //             //   this.isLoggedIn=false;
    //             //  }
    //             this.isLoggedIn=false;
                 
    //         }else{
    //           // console.log("Token is still valid")
    //           // if(localStorage.getItem('currentUser')){
    //           //   this.isLoggedIn=true;
    //           //  }else{
    //           //   this.isLoggedIn=false;
    //           //  }
    //           this.isLoggedIn=true;
    //         }
    //       }
    //     ) 
    //   }
    // })
    
    this.data.currentMessage.subscribe(message =>
      {
         this.isLoggedIn = message
        //  console.log(this.isLoggedIn)
      }
         )
         this.data.isAdminLogged.subscribe(message =>
          {
             this.isAdminLoggedIn = message
            //  console.log(this.isLoggedIn)
          }
             )
      
     if(localStorage.getItem('email')==='admin@maxonic.com'){
       this.isAdminLoggedIn=true;
     }else{
       this.isAdminLoggedIn=false;
     }
     
    
  //   // this.router.navigateByUrl('intranet');
 
   
   
  
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
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isLoggedIn');
    this.router.navigateByUrl('login');
  if(localStorage.getItem('currentUser')){
    this.isLoggedIn=true;
   }else{
    this.isLoggedIn=false;
   }
  } 
 createComponent() {
  const factory = this.resolver.resolveComponentFactory(ImageSliderComponent);
  this.componentRef = this.entry.createComponent(factory);
  this.componentRef.instance._ref = ImageSliderComponent;
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
onResetPasswordForEmployeeClicked(){
  this.router.navigateByUrl('admin-reset-password');
}
}
