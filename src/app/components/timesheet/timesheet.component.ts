import { Component, OnInit,AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
// import * as html2canvas from 'html2canvas';
import {PdfService} from '../../_services/pdf.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TimesheetService} from '../../_services/timesheet.service';
declare var $: any;
@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  allDaysWithdateOfFirstWeek:any=[];
  allDaysWithdateOfSecondWeek:any=[];
  allDaysWithdateOfThirdWeek:any=[];
  allDaysWithdateOfForthWeek:any=[];
  allDaysWithdateOfFifthWeek:any=[];
  totalDayWorkingOfFirstWeek:number;
  totalDayWorkingOfSecondWeek:number;
  totalDayWorkingOfThirdWeek:number;
  totalDayWorkingOfFourthWeek:number;
  totalDayWorkingOfFifthWeek:number;
  allDays:any=[];
  editable:boolean =true;
  paramEmail:string;
  resubmitting_message:string;
  loading:boolean=false;
  firstDayOfMonth:string;
  lastDayOfMonth:string;
  isVerfierLoggedIn:boolean=false;
  constructor(private pdfService:PdfService,  private route: ActivatedRoute,
    private router: Router,
    private toastr:ToastrManager,
    private timesheetService:TimesheetService
    ) {
  
   }
  
  ngOnInit() {
    // this.allDaysWithdate=[];
    if(localStorage.getItem('email')==="paduka@maxonic.com"){
      this.isVerfierLoggedIn=true;
    }
    this.firstDayOfMonth = moment().format("YYYY-MM-01");
    this.lastDayOfMonth = moment().format("YYYY-MM-") + moment().daysInMonth();
    var schedule = this.getDaysArrayByMonth();
   let month_wise_days:any=[];
    schedule.forEach(function(item) {
      
      // console.log(item.format("DD/MM"));
      // console.log(item.format('ddd'));
      var tmp={};
      tmp["date"]=item.format("DD-MM");
      tmp["day"]=item.format('ddd');
      month_wise_days.push(tmp);
    });
    this.allDays=month_wise_days;
  //  this.allDaysWithdate=month_wise_days;
  this.allDaysWithdateOfFirstWeek=[];
  this.allDaysWithdateOfSecondWeek=[];
  this.allDaysWithdateOfThirdWeek=[];
  this.allDaysWithdateOfForthWeek=[];
  this.allDaysWithdateOfFifthWeek=[]; 
   for(let i=month_wise_days.length-1;i>(month_wise_days.length)-8;i--){
     this.allDaysWithdateOfFirstWeek.push(month_wise_days[i]);
   }
   for(let j=month_wise_days.length-8;j>(month_wise_days.length)-15;j--){
    this.allDaysWithdateOfSecondWeek.push(month_wise_days[j]);
  }
  for(let k=month_wise_days.length-15;k>(month_wise_days.length)-22;k--){
    this.allDaysWithdateOfThirdWeek.push(month_wise_days[k]);
  }
  for(let l=month_wise_days.length-22;l>(month_wise_days.length)-29;l--){
    this.allDaysWithdateOfForthWeek.push(month_wise_days[l]);
  }
  for(let m=month_wise_days.length-29;m>=0;m--){
    this.allDaysWithdateOfFifthWeek.push(month_wise_days[m]);
  }




  this.route.params.subscribe(params=>{
    if(params['id']){
      console.log(params['id']);
      this.paramEmail=params['id'];
      this.timesheetService.get_timesheet_status(params['id']).subscribe(result=>{
        if(result["is_present"]){
          if(localStorage.getItem('email')===this.paramEmail){
            this.toastr.infoToastr("You have already submitted your timesheet","info")
          }
          this.editable=false;
          this.timesheetService.get_timesheet_details(params['id']).subscribe(result=>{
            let allRecord=[];
            allRecord=result["data"];
            let count1=0,count2=0,count3=0,count4=0,count5=0;
            for(let i=this.allDays.length-1;i>=0;i--){
              if((this.allDays.length-i-1)<7){
                      if(allRecord[this.allDays.length-i-1]["work_status"]==='W'){
                          count1++;
                      }
              }
              if(((this.allDays.length-i-1)>=7 && (this.allDays.length-i-1)<14)){
                if(allRecord[this.allDays.length-i-1]["work_status"]==='W'){
                  count2++;
              }
              }
              if((this.allDays.length-i-1)>=14 &&(this.allDays.length-i-1)<21){
                if(allRecord[this.allDays.length-i-1]["work_status"]==='W'){
                  count3++;
              }
              }
              if((this.allDays.length-i-1)>=21 &&(this.allDays.length-i-1)<28){
                if(allRecord[this.allDays.length-i-1]["work_status"]==='W'){
                  count4++;
              }
              }
              if((this.allDays.length-i-1)>=28 &&(this.allDays.length-i-1)<31){
                if(allRecord[this.allDays.length-i-1]["work_status"]==='W'){
                  count5++;
              }
              }
              $(`#${this.allDays[i]['date']}`).val(allRecord[this.allDays.length-i-1]['work_status']) 
         }
         this.totalDayWorkingOfFirstWeek=count1;
         this.totalDayWorkingOfSecondWeek=count2;
         this.totalDayWorkingOfThirdWeek=count3;
         this.totalDayWorkingOfFourthWeek=count4;
         this.totalDayWorkingOfFifthWeek=count5;
          })
        }else{
          this.editable=true;
        }
      })
    }
  })
  }
  // ngAfterViewInit(){
  //   console.log(this.element.nativeElement.innerHTML);
  // }
 getDaysArrayByMonth() {
  var daysInMonth = moment().daysInMonth();
  var arrDays = [];

  while(daysInMonth) {
    var current = moment().date(daysInMonth);
    arrDays.push(current);
    daysInMonth--;
  }

  return arrDays;
}
onClickToVerifyClicked(){
  if(!localStorage.getItem('email')){
    this.toastr.warningToastr("Please login first before verify timesheet","Warning");
    this.toastr.warningToastr("Not Verified because you are not logged in","Warning");
  }else{
    this.loading=true;
    this.timesheetService.send_email_to_verify(this.paramEmail).subscribe((result)=>{
      this.loading=false;
      this.toastr.successToastr(result["message"]);
      this.toastr.infoToastr("Timesheet successfully sent for verification","info");
      // this.timesheetService.send_pdf_file(this.paramEmail).subscribe((result)=>{
      //   this.toastr.successToastr(result["message"]);
      // })
    })
  }
 
}
onAskToReSubmit(){
  // this.loading=true;
  this.timesheetService.send_email_to_resubmit(this.paramEmail).subscribe((result)=>{
    this.loading=false;
    this.toastr.successToastr(result["message"]);
  })
}
onSendEmailClicked(){
  var self=this;
  this.editable=false;
  
 console.log($("#02-01").val())
   let work_record_status:any=[];
   let allowed:boolean=true;
  for(let i=this.allDays.length-1;i>=0;i--){
       var tmp={};
      console.log($(`#${this.allDays[i]['date']}`).val());
      if(!$(`#${this.allDays[i]['date']}`).val()){
          this.toastr.errorToastr(`Please fill input of this date ${this.allDays[i]["date"]}`,"Information");
          allowed=false;
          this.editable=true;
          break;
      }
      if($(`#${this.allDays[i]['date']}`).val()){
        tmp["day"]=this.allDays[i]['date'];
        tmp["work_status"]=$(`#${this.allDays[i]['date']}`).val();
        work_record_status.push(tmp);
      }
  }
  if(allowed){
    if(localStorage.getItem('email')!==this.paramEmail){
       this.toastr.warningToastr(`You are not allowed to submit timesheet of ${this.paramEmail} User`,"Warning");
       this.toastr.warningToastr('Submit your timesheet not others','Warning');
    }else{
      this.loading=true;
      this.timesheetService.store_timesheet_details(localStorage.getItem('email'),1,work_record_status).subscribe(result=>{
        // console.log(result);
          this.loading=false;
         this.toastr.successToastr(result["message"],"Success");
      })
    }

  }

  // html2canvas(document.getElementById('container')).then(function(canvas) {
  //   var img = canvas.toDataURL("image/png");
  //    self.pdfService.send_timesheet_by_email(img).subscribe((result)=>{
  //      console.log(result);
  //    })
  //   });
}
}
