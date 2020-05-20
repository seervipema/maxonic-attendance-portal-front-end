import {Routes,RouterModule, Router} from '@angular/router';

import {AppComponent} from './app.component';
import {AuthGuard} from './_guards/auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component'
import {AttendanceComponent} from './components/attendance/attendance.component';
import {PfFormComponent } from './components/pf-form/pf-form.component';
import {EsiFormComponent} from './components/esi-form/esi-form.component';
import {HrFormalitiesComponent} from './components/hr-formalities/hr-formalities.component';
import {PdfViewerComponent} from './components/pdf-viewer/pdf-viewer.component';
import {TimesheetComponent} from './components/timesheet/timesheet.component';
import {ResignationRequestComponent} from './components/resignation-request/resignation-request.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {UserManagementComponent} from './components/user-management/user-management.component';
import {EventCreationComponent} from './components/event-creation/event-creation.component';
import {HolidaysManagementComponent } from './components/holidays-management/holidays-management.component';
import { LoginComponent } from './components/login/login.component';
import {SignupComponent} from './components/sign-up/sign-up.component';
import {HeaderAfterLoginComponent} from './components/header-after-login/header-after-login.component';
const appRoutes:Routes =[
    {
      path:'login',component:LoginComponent
    },
    {
       path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]
    },
    {
        path:'attendance',component:AttendanceComponent,canActivate:[AuthGuard] 
    },
    {
         path:'pf-form',component:PfFormComponent,canActivate:[AuthGuard]
    },
    {
         path:'esi-form',component:EsiFormComponent,canActivate:[AuthGuard]
    },
    {
         path:'hr-formalities',component:HrFormalitiesComponent,canActivate:[AuthGuard]  
    },
    {
         path:'pdf',component:PdfViewerComponent,canActivate:[AuthGuard]
    },
    {
         path:'experiment',component:HeaderAfterLoginComponent  
    },
    {
         path:'timesheet/:id',component:TimesheetComponent,canActivate:[AuthGuard]
    },
    {
         path:'resignation',component:ResignationRequestComponent,canActivate:[AuthGuard]
    },
    {
         path:'reset-password',component:ResetPasswordComponent,canActivate:[AuthGuard]
    },
    {
         path:'user-management',component:UserManagementComponent,canActivate:[AuthGuard]
    },
    {
         path:'event-creation',component:EventCreationComponent,canActivate:[AuthGuard]
    },
    {
         path:'holidays',component:HolidaysManagementComponent,canActivate:[AuthGuard]
    },
    {
         path:'sign-up',component:SignupComponent
    },
    {
     path:'',redirectTo:'attendance',pathMatch:'full'
    },
    {
        path:'**',redirectTo:'attendance'
    }
];
export const routing =RouterModule.forRoot(appRoutes);