import { Component, OnInit, Input } from '@angular/core';
import {PfFormService} from '../../_services/pf-form.service';
import {ToastrManager} from 'ng6-toastr-notifications'
@Component({
  selector: 'app-pf-form',
  templateUrl: './pf-form.component.html',
  styleUrls: ['./pf-form.component.css']
})
export class PfFormComponent implements OnInit {


  constructor(private pfService:PfFormService,private toastr:ToastrManager) { }
  emp_code:string;
  complete_previous_establishment_pf_no:string;
  employee:string;
  aadhaar_number:string;
  gender:string;
  marital_status:string;
  DOB:Date;
  date_of_joining:Date;
  father_or_husband_name:string;
  UAN_no_from_previous_employement_if_any:string;
  relationship:string;
  qualification:string;
  actual_monthly_gross_salary:string;
  actual_monthly_basic_DA:string;
  back_account_number:string;
  IFSC_CODE:string;
  loading:boolean=false;
  ngOnInit() {
    
  
    
  }
  onSendEmailClicked(){
    if(this.emp_code===undefined || this.emp_code ==="" || this.emp_code ===null ||
    this.employee===undefined || this.employee ==="" || this.employee ===null ||
    this.aadhaar_number===undefined || this.aadhaar_number ==="" || this.aadhaar_number ===null || 
    this.gender===undefined || this.gender ==="" || this.gender ===null ||
    this.marital_status===undefined || this.marital_status ==="" || this.marital_status ===null ||
    this.DOB===undefined  || this.DOB ===null ||
    this.date_of_joining===undefined  || this.date_of_joining ===null ||
    this.father_or_husband_name===undefined || this.father_or_husband_name ==="" || this.father_or_husband_name ===null ||
    this.relationship===undefined || this.relationship ==="" || this.relationship ===null ||
    this.qualification===undefined || this.qualification ==="" || this.qualification ===null ||
    this.actual_monthly_gross_salary===undefined || this.actual_monthly_gross_salary ==="" || this.actual_monthly_gross_salary ===null ||
    this.actual_monthly_basic_DA===undefined || this.actual_monthly_basic_DA ==="" || this.actual_monthly_basic_DA ===null ||
    this.back_account_number===undefined || this.back_account_number ==="" || this.back_account_number ===null ||
    this.IFSC_CODE===undefined || this.IFSC_CODE ==="" || this.IFSC_CODE ===null 
    ){
       this.toastr.warningToastr("Please fill all the neccessary fields","Warning");      
    }else{
      this.loading=true;
      this.pfService.Sending_email_pf_details(localStorage.getItem('email'),
       this.emp_code,this.complete_previous_establishment_pf_no,this.employee,
        this.aadhaar_number,this.gender,
        this.marital_status,this.DOB,this.date_of_joining,
        this.father_or_husband_name,this.UAN_no_from_previous_employement_if_any,
        this.relationship,this.qualification,
        this.actual_monthly_gross_salary,this.actual_monthly_basic_DA,
        this.back_account_number,this.IFSC_CODE
        ).subscribe(
        result=>{
          this.loading=false;
          this.toastr.successToastr(result["message"],"Success");
        }
      )
    }
  }


}
