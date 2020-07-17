import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import { catchError } from 'rxjs/operators';
import {AdminService} from '../../_services/admin.service';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
  selector: 'app-admin-reset-password-employee',
  templateUrl: './admin-reset-password-employee.component.html',
  styleUrls: ['./admin-reset-password-employee.component.css']
})
export class AdminResetPasswordEmployeeComponent implements OnInit {

  constructor(private userService:UserService, private toastr:ToastrManager,
    private data:AdminService,
    private authenticationService:AuthenticationService
    ) { }
  loading:boolean=false;
  isResetPasswordClicked:boolean=false;
  allEmployees=[];

  ngOnInit() {
    this.CheckJWTAuthentication();
    this.userService.get_all_users()
    .pipe(
      result=>{
        return result;
      },
      catchError(
        (err)=>{
             this.toastr.errorToastr(err,"Error",{position:'bottom-right'});
             return "";
        }
      )
    ).subscribe((result)=>{
      if(result){
      this.allEmployees=result["result"];
      }
    })
  }
  CheckJWTAuthentication(){
    this.authenticationService.check_JWT_IS_VALID().pipe(
      result=>{
        return result;
      },
      catchError(
        (err)=>{
             this.toastr.errorToastr(err,"Error",{position:'bottom-right'});
             return "";
        }
      )
    ).subscribe(
  result=>{
    if(result["failed"]){
        // this.authenticationService.logout();
        // this.router.navigateByUrl('/');
       this.data.changeMessage(false);
    }else{
      this.data.changeMessage(true);
    }
  }
)
}
  onResetPasswordClicked(email){
    this.loading=true
    this.isResetPasswordClicked=true;
    if(email && localStorage.getItem('email')){
        this.userService.admin_reset_password_for_employee(email,localStorage.getItem('email'))
        .pipe(
          result=>{
            return result;
          },
          catchError(
            (err)=>{
                  this.loading=false;
                  this.isResetPasswordClicked=false;
                 this.toastr.errorToastr(err,"Error",{position:'bottom-right'});
                 return "";
            }
          )
        ).subscribe((result)=>{
          this.loading=false;
          this.isResetPasswordClicked=false;
          if(result){
            this.toastr.successToastr(result["message"],"Warning",{position:'bottom-right'});
          }
        })
    }else{
        this.isResetPasswordClicked=false;
      if(!email){
        this.toastr.warningToastr("Email should not be empty","Warning",{position:'bottom-right'});
      }else if(!localStorage.getItem('email')){
        this.toastr.warningToastr("Admin email should not be empty","Warning",{position:'bottom-right'});
      }
    }
  }
}
