import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
const apiUrl=environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class PfFormService {

  constructor(private http:HttpClient) { }


  Sending_email_pf_details(email:string,emp_code:string,complete_previous_establishment_pf_no:string,employee:string,
    aadhaar_number:string,gender:string,
    marital_status:string,DOB:Date,date_of_joining:Date,
    father_or_husband_name:string,UAN_no_from_previous_employement_if_any:string,
    relationship:string,qualification:string,
    actual_monthly_gross_salary:string,actual_monthly_basic_DA:string,back_account_number:string,IFSC_CODE:string){
    return this.http.post<any>(`${apiUrl}/email/pf-details`,{email,emp_code,complete_previous_establishment_pf_no,
     employee,aadhaar_number,gender,marital_status,DOB,date_of_joining,father_or_husband_name,UAN_no_from_previous_employement_if_any,
     relationship,qualification,actual_monthly_gross_salary,actual_monthly_basic_DA,
     back_account_number,IFSC_CODE
  }).pipe( 
        result =>{
          return result;
        }
    )
  }
  sending_email_with_ESI_details( 
    email:string,
    serial_Number:string,
    employee_id:string,
    employee:string,
    contact_number:string,
    gender:string,
    marital_status:string,
    DOB:Date,
    date_of_joining:Date,
    father_name:string,
    DOB_father:Date,
    mother_name:string,
    DOB_mother:Date,
    spouse_name:string,
    DOB_spouse:Date,
    aadhar_card_number:string,
    pan_card_number:string,
    bank_name:string,
    branch_name:string,
    back_account_number:string,
    IFSC_CODE:string
    ){
    return this.http.post<any>(`${apiUrl}/email/esi-details`,{
      email,
      serial_Number,
      employee_id,
      employee,
      contact_number,
      gender,
      marital_status,
      DOB,
      date_of_joining,
      father_name,
      DOB_father,
      mother_name,
      DOB_mother,
      spouse_name,
      DOB_spouse,
      aadhar_card_number,
      pan_card_number,
      bank_name,
      branch_name,
      back_account_number,
      IFSC_CODE
    }).pipe(
      result=>{
        return result;
      }
    )
  }
}
