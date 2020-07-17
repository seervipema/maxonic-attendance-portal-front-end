import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../_services/admin.service';
import { first } from 'rxjs/operators';
import * as moment from 'moment';
import { catchError } from 'rxjs/operators';
import {AuthenticationService} from '../../_services/authentication.service';

import {ToastrManager} from 'ng6-toastr-notifications';
@Component({
  selector: 'app-holidays-management',
  templateUrl: './holidays-management.component.html',
  styleUrls: ['./holidays-management.component.css']
})
export class HolidaysManagementComponent implements OnInit {

  constructor(private adminService:AdminService,
    private authenticationService:AuthenticationService,
    private toastr:ToastrManager) { }
  loading:boolean=false;
  holidayOccasion:string;
  isHolidayOccasionMessage:boolean=false;
  holidayOccasionMessage="Holiday Occasion should not be empty...!!!";
  dateOfHoliday:Date;
  isDateOfHolidayMessage:boolean=false;
  dateOfHolidayMessage="Date of holiday should not be empty...!!!";
  holidayLoading:boolean=false;
  signUpLoadingMessage:boolean=false;
  message:string;
  is_optional:boolean=true;
  allHolidays:any=[];
  date_of_holiday:Date;
  isDeleteHolidayDateEmpty:boolean=false;
  deleteHolidayDateResponse:string="Date of holiday should not be empty...!!!";
  deleteHolidayloading:boolean=false;
  isDeleteHolidayDateLoadingMessage:boolean=false;
  deleteHolidayDateMessage:string="Please wait for server response ...!!!"
  allHolidayResults:any=[];
  ngOnInit() {
    this.CheckJWTAuthentication();
  this.getting_all_holidays();
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
       this.adminService.changeMessage(false);
    }else{
      this.adminService.changeMessage(true);
    }
  }
)
}
  getting_all_holidays(){
    this.adminService.get_all_holidays().pipe(first()).subscribe(
      result =>{
        this.allHolidays=result["result"];
         this.allHolidayResults=[];
        for(let i=0;i<this.allHolidays.length;i++){
          let tmp={};
           tmp["holiday_date"]=moment(this.allHolidays[i].holiday_date.toString()).format('DD-MM-YYYY');
           tmp["holiday_occasion"]=this.allHolidays[i].holiday_occasion;
           if(this.allHolidays[i].is_optional){
            tmp["is_optional"]="Yes";   
           }else{
            tmp["is_optional"]="No";   
           }  
           this.allHolidayResults.push(tmp);
        }

      }
    )
  }
  OnHolidayOccasionChanged(){
      if(this.holidayOccasion){
          this.isHolidayOccasionMessage=false;
      }else{
            this.isHolidayOccasionMessage=true;

      }
  }
  onHolidayDayChanged(){
      if(this.dateOfHoliday){
        this.isDateOfHolidayMessage=false;
      }else{
        this.isDateOfHolidayMessage=true;
      }
  }
  onCreateHolidayClicked(){

    if(this.holidayOccasion === undefined || this.holidayOccasion === "" || this.dateOfHoliday ===undefined || this.dateOfHoliday ===null ){

      this.message="Please fill all the inputs mentioned in the form"
      this.signUpLoadingMessage=true;
    }else{
      this.holidayLoading=true;
      this.adminService.create_holiday(this.dateOfHoliday.toString(),this.holidayOccasion,this.is_optional,localStorage.getItem('email')).pipe(first()).subscribe(
        result=>{
          this.message= result["message"];
          this,this.toastr.successToastr(result["message"],"Success");
          this.signUpLoadingMessage=true;
          this.holidayLoading=false;
          this.getting_all_holidays();
        }
      )
    }
   
  }
  onMandatoryClicked(){
     this.is_optional=false;
  }
  onOptionalClicked(){
    this.is_optional=true;
  }
  onDeleteHolidayDateChanged(){
      if(this.date_of_holiday){
        this.isDeleteHolidayDateEmpty=false;
      }else{
        this.isDeleteHolidayDateEmpty=true;
      }
  }
  onDeleteHolidayDateCliked(){
         this.deleteHolidayloading=true;
         this.adminService.delete_holiday(this.date_of_holiday,localStorage.getItem('email')).pipe(first()).subscribe(
           result =>{
                 this.deleteHolidayloading=false;
                 this.deleteHolidayDateMessage=result["message"];
                 this.isDeleteHolidayDateLoadingMessage=true;
                 this.getting_all_holidays()
           }
         )
  }
}
