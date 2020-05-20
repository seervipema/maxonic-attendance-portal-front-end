import { Component, OnInit,AfterViewChecked,ViewContainerRef } from '@angular/core';
import {AttedanceService} from '../../_services/attedance.service';
import * as moment from 'moment';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../_services/authentication.service';
import {Router,ActivatedRoute, Data} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';
import {DataSharingService} from '../../_services/data-sharing.service';
import {catchError} from 'rxjs/operators';
declare var $: any;
// import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

   loading:boolean=true;
  //  isAttendanceRecordPresent:boolean=true;
  constructor(private attendanceService:AttedanceService,
    // public toastr: ToastrManager
    private authenticateService:AuthenticationService,
    private router:Router,
    private toastr: ToastrManager,
    private data:DataSharingService
    ) {
      
     }
  attendanceBasedOnDate:any=[]; 
  allAttendanceDetails:any=[];
  pema:any=[];
  allAttendanceDetailsBasedOnEmail:any=[];
  isAdminLoggedIn:boolean=false;
  ngOnInit() {
  
     this.data.currentStatusOfIsAdminLoggedIn.subscribe((status)=>{
        this.isAdminLoggedIn=status;
        if(localStorage.getItem('email')==='admin@maxonic.com'){
          this.isAdminLoggedIn=true;
        }
     })
    this.gettingAttendanceDetails();
 
    
  }
  gettingAttendanceDetails(){
    this.attendanceService.attendanceBasedOnEmail(localStorage.getItem('email')).pipe(first()).subscribe(
      results=>{
        
        if(results["failed"]){
             this.authenticateService.logout();
             this.router.navigateByUrl('/');
        }else{
          this.pema=[];
         this.allAttendanceDetailsBasedOnEmail=results["results"];
          
         for(let i=0;i<(this.allAttendanceDetailsBasedOnEmail.length);i++){
           let x={};
           x["Date"] =this.allAttendanceDetailsBasedOnEmail[i].Date;
           x["Email"]=this.allAttendanceDetailsBasedOnEmail[i].Email;
           x["check_in"]=this.allAttendanceDetailsBasedOnEmail[i].check_in;
           x["check_out"]=this.allAttendanceDetailsBasedOnEmail[i].check_out;
          var startTime= moment(this.allAttendanceDetailsBasedOnEmail[i].check_in,"HH:mm:ss")
          var endTime= moment(this.allAttendanceDetailsBasedOnEmail[i].check_out,"HH:mm:ss")
          var m = moment.utc(moment(endTime, "HH:mm:ss").diff(moment(startTime, "HH:mm:ss"))).format("mm");
          var h = moment.utc(moment(endTime, "HH:mm:ss").diff(moment(startTime, "HH:mm:ss"))).format("HH");
          var s = moment.utc(moment(endTime, "HH:mm:ss").diff(moment(startTime, "HH:mm:ss"))).format("ss");
          var totalDuration = moment.duration(endTime.diff(startTime));  
          // duration in hours
          var _hours = totalDuration.asHours();

          // duration in minutes
          var _minutes = totalDuration.asMinutes()%60;     
          
          //duration in second
          var _second = totalDuration.asSeconds()%60;
          
          

          if(m=="Invalid date"){
            x["duration"]=""
          }else{
           x["duration"] = h+":"+m+":"+s;
          }
         
          if(parseInt(h)<6){
           x["status"]="Half Day"
           }else if(parseInt(h)>=6){
             x["status"]="Full Day"
           }else{
            x["status"]="Half Day"
           }
           x["h"]=parseInt(h);
          x["check_in_ip"]=this.allAttendanceDetailsBasedOnEmail[i].check_in_ip;
          x["check_out_ip"]=this.allAttendanceDetailsBasedOnEmail[i].check_out_ip;
          
           this.pema.push(x);
          
         }
         console.log("pema",this.pema);
         this.loading=false;
        }
       
        
        
      }
    )
  }
  ngAfterViewChecked(){
    this.setMobileTable('table');

  }
  // colorChangingOnCondition(){

  // }
  setMobileTable(selector){
    // if (window.innerWidth > 600) return false;
    const tableEl = document.querySelector(selector);
    const thEls = tableEl.querySelectorAll('thead th');
    console.log(thEls);
    const tdLabels = Array.from(thEls).map(el => el["innerText"])
    tableEl.querySelectorAll('tbody tr').forEach( tr => {
      Array.from(tr.children).forEach( 
        (td, ndx) =>  td["setAttribute"]('label', tdLabels[ndx])
      );
    });
    }

    onCheckInClicked(){
      //  this.toastr.successToastr('You are awesome!', 'Success!');
      console.log($("#check_in").text())
      
      $("#check_in").text("Already clicked for check in")
       
      console.log(moment().format("hh:mm:ss"));
      console.log(moment().format("YYYY/MM/DD"))
      this.attendanceService.doCheckIn(localStorage.getItem('email'),moment().format("YYYY/MM/DD"),moment().format()).pipe(
        (result)=>{
                    return result;
        },
        catchError(
        (err)=>{
                   this.toastr.errorToastr(err ,"Error");
                   return "";
        }
        )
      ).subscribe(
        result=>{
            if(result['success'] ===true){
              $("#check_in").text("Successfully Checked In")
              this.toastr.successToastr("Successfully checked in ","Success");
             }else if(result['success']==='checkedIn'){
              $("#check_in").text("You are already checked in")
              this.toastr.infoToastr("You are already Checked In ","info");
             }
             this.gettingAttendanceDetails();
          
        }
      )

    }
    onCheckOutClicked(){
     
      console.log($("#check_out").text())
      
      $("#check_out").text("Already clicked for check out")
       
      console.log(moment().format("hh:mm:ss"));
      console.log(moment().format("YYYY/MM/DD"))
      this.attendanceService.doCheckOut(localStorage.getItem('email'),moment().format("YYYY/MM/DD"),moment().format()).pipe(
        (result)=>{
          return result;
         },
         catchError(
       (err)=>{
         this.toastr.errorToastr(err ,"Error");
         return "";
          }
          )
      ).subscribe(
        result=>{
           if(result['success'] ===true){
            $("#check_out").text("Successfully checked cut");
            this.toastr.successToastr("Successfully checked out ","Success");
           }else if(result['success']==='checkedOut'){
            $("#check_out").text("You are already checked out");
            this.toastr.infoToastr("You are already checked out ","info");
           }
        this.gettingAttendanceDetails();
        }
      )

    }
    getColor(IP){

      switch (IP) {
        case "106.51.81.123":
          return '#006400';
        case "106.51.73.205":
          return '#006400';
        default:
          return '#1d1d7b';
      }
    }
}
