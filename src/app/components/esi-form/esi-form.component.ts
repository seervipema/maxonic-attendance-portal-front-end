import { Component, OnInit } from '@angular/core';
import {PfFormService} from '../../_services/pf-form.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {AdminService} from '../../_services/admin.service';
import {AuthenticationService} from '../../_services/authentication.service';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-esi-form',
  templateUrl: './esi-form.component.html',
  styleUrls: ['./esi-form.component.css']
})
export class EsiFormComponent implements OnInit {
  serial_Number:string;
  employee_id:string;
  employee:string;
  contact_number:string;
  gender:string;
  marital_status:string;
  DOB:Date;
  date_of_joining:Date;
  father_name:string;
  DOB_father:Date
  mother_name:string;
  DOB_mother:Date;
  spouse_name:string;
  DOB_spouse:Date;
  aadhar_card_number:string;
  pan_card_number:string;
  bank_name:string;
  branch_name:string;
  back_account_number:string;
  IFSC_CODE:string;
  loading:boolean=false;
  constructor(
    private data:AdminService,
    private authenticationService:AuthenticationService,
    private PFService:PfFormService,private toastr:ToastrManager) { }

  ngOnInit() {
    this.CheckJWTAuthentication();
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
  onSendEmailClicked(){
    if(
    this.employee_id === undefined || this.employee_id==="" || this.employee_id===null ||
    this.employee === undefined || this.employee==="" || this.employee===null ||
    this.contact_number === undefined || this.contact_number==="" || this.contact_number===null ||
    this.gender === undefined || this.gender==="" || this.gender===null ||
    this.marital_status === undefined || this.marital_status==="" || this.marital_status===null ||
    this.DOB === undefined  || this.DOB===null ||
    this.date_of_joining === undefined || this.date_of_joining===null ||
    this.father_name === undefined || this.father_name==="" || this.father_name===null ||
    this.DOB_father === undefined || this.DOB_father===null ||
    this.mother_name === undefined || this.mother_name==="" || this.mother_name===null ||
    this.DOB_mother === undefined ||  this.DOB_mother===null ||
    this.aadhar_card_number === undefined || this.aadhar_card_number==="" || this.aadhar_card_number===null ||
    this.pan_card_number === undefined || this.pan_card_number==="" || this.pan_card_number===null ||
    this.bank_name === undefined || this.bank_name==="" || this.bank_name===null ||
    this.back_account_number === undefined || this.back_account_number==="" || this.back_account_number===null ||
    this.IFSC_CODE === undefined || this.IFSC_CODE==="" || this.IFSC_CODE===null 
    ){
        this.toastr.warningToastr("please fill all the neccessary fields","Warning");
    }
    else{
      this.loading=true;
      this.PFService.sending_email_with_ESI_details(
    
      localStorage.getItem('email') , this.serial_Number,this.employee_id,this.employee,this.contact_number,
      this.gender,this.marital_status,this.DOB,this.date_of_joining,
      this.father_name,this.DOB_father,this.mother_name,this.DOB_mother,
       this.spouse_name,this.DOB_spouse,this.aadhar_card_number,this.pan_card_number,
       this.bank_name,this.branch_name,this.back_account_number,this.IFSC_CODE
  
      ).subscribe(
        result=>{
          this.loading=false;
          this.toastr.successToastr(result["message"],"Success");
          // console.log("result",result);
        }
      )
    }
  }
}
