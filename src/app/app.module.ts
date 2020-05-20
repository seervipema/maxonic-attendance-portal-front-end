import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule ,Injector} from '@angular/core';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';

import {RouterModule,Routes} from '@angular/router'
import { AppComponent } from './app.component';
import {routing} from './app.routing'
import { DashboardComponent } from './dashboard/dashboard.component';

import { JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { HeaderBeforeLoginComponent } from './components/header-before-login/header-before-login.component';
import { HeaderAfterLoginComponent } from './components/header-after-login/header-after-login.component';
import { PfFormComponent } from './components/pf-form/pf-form.component';
import { EsiFormComponent } from './components/esi-form/esi-form.component';
import { HrFormalitiesComponent } from './components/hr-formalities/hr-formalities.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { ResignationRequestComponent } from './components/resignation-request/resignation-request.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { EventCreationComponent } from './components/event-creation/event-creation.component';
import { HolidaysManagementComponent } from './components/holidays-management/holidays-management.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/sign-up/sign-up.component';
// import { ToastrModule } from 'ng6-toastr-notifications';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ToastrModule } from 'ng6-toastr-notifications';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SpinnerComponent,
    AttendanceComponent,
    HeaderBeforeLoginComponent,
    HeaderAfterLoginComponent,
    PfFormComponent,
    EsiFormComponent,
    HrFormalitiesComponent,
    PdfViewerComponent,
    TimesheetComponent,
    ResignationRequestComponent,
    ImageSliderComponent,
    ResetPasswordComponent,
    UserManagementComponent,
    EventCreationComponent,
    HolidaysManagementComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule,
    HttpClientModule,
    routing,
    FormsModule,
     PdfViewerModule,
     ToastrModule.forRoot(),
     TooltipModule,
     BrowserAnimationsModule
    
    //  ToastrModule.forRoot()
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[ImageSliderComponent]
})
export class AppModule { 

  constructor(private injector: Injector){
   
  }
  ngDoBootstrap() {}
}
