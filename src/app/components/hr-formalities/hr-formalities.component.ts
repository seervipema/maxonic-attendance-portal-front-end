import { Component, OnInit } from '@angular/core';
import {HrFormalitiesService} from '../../_services/hr-formalities.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import { catchError } from 'rxjs/operators';
import {AdminService} from '../../_services/admin.service';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
  selector: 'app-hr-formalities',
  templateUrl: './hr-formalities.component.html',
  styleUrls: ['./hr-formalities.component.css']
})
export class HrFormalitiesComponent implements OnInit {

  constructor(private hr:HrFormalitiesService,
    private data:AdminService,
    private authenticationService:AuthenticationService,
    private toastr:ToastrManager) { }
  DOBFileToUpload:File=null;
  HEDFileToUpload:File=null;
  addressProofFileToUpload:File=null;
  passwordCopyFileToUpload:File=null;
  panCardCopyFileToUpload:File=null;
  HDFCAccountDetailsFileToUpload:File=null;
  photographFileToUpload:File=null;
  forAdharCardCopyFileToUpload:File=null;
  employerSalarySlip:File=null;
  employerAppoinmentLetter:File=null;
  loading:boolean=false;
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
  handleFileUploadForDOB(files: FileList){
    this.DOBFileToUpload = files.item(0);
  }
  handleFileUploadForHED(files: FileList){
    this.HEDFileToUpload = files.item(0);
  }
  handleFileUploadForAddressProof(files: FileList){
    this.addressProofFileToUpload = files.item(0);
  }
  handleFileUploadForPasswordCopy(files: FileList){
    this.passwordCopyFileToUpload = files.item(0);
  }
  handleFileUploadForPanCardCopy(files: FileList){
    this.panCardCopyFileToUpload = files.item(0);
  }
  handleFileUploadForHDFCAccountDetails(files: FileList){
    this.HDFCAccountDetailsFileToUpload = files.item(0);
  }
  handleFileUploadForPhotograph(files: FileList){
    this.photographFileToUpload = files.item(0);
  }
  handleFileUploadForAdharCardCopy(files: FileList){
    this.forAdharCardCopyFileToUpload = files.item(0);
  }
  handleFileUploadForEmployerSalarySlip(files: FileList){
    this.employerSalarySlip = files.item(0);
  }
  handleFileUploadForAppoinmentLetter(files: FileList){
    this.employerAppoinmentLetter = files.item(0);
  }
  onSendEmailClicked(){
    if(this.DOBFileToUpload ===undefined || this.DOBFileToUpload ===null || 
      this.HEDFileToUpload ===undefined || this.HEDFileToUpload ===null  ||
      this.addressProofFileToUpload ===undefined || this.addressProofFileToUpload ===null  ||
      this.passwordCopyFileToUpload ===undefined || this.passwordCopyFileToUpload ===null  ||
      this.panCardCopyFileToUpload ===undefined || this.panCardCopyFileToUpload ===null  ||
      this.HDFCAccountDetailsFileToUpload ===undefined || this.HDFCAccountDetailsFileToUpload ===null  ||
      this.photographFileToUpload ===undefined || this.photographFileToUpload ===null  ||
      this.forAdharCardCopyFileToUpload ===undefined || this.forAdharCardCopyFileToUpload ===null   
      ){
         this.toastr.warningToastr("Please fill all the inputs then proceed","Warning");
      }else{
        this.loading=true;
        this.hr.postFile(this.DOBFileToUpload,this.HEDFileToUpload,this.addressProofFileToUpload,
          this.passwordCopyFileToUpload,this.panCardCopyFileToUpload,this.HDFCAccountDetailsFileToUpload,
          this.photographFileToUpload,this.forAdharCardCopyFileToUpload
          ).subscribe((result)=>{
            this.toastr.successToastr(result["message"],"Success");
            this.loading=false;
          console.log(result);
        })
      }
  }
  onSendEmailClickedOfExperienced(){
    if(this.DOBFileToUpload ===undefined || this.DOBFileToUpload ===null || 
      this.HEDFileToUpload ===undefined || this.HEDFileToUpload ===null  ||
      this.addressProofFileToUpload ===undefined || this.addressProofFileToUpload ===null  ||
      this.passwordCopyFileToUpload ===undefined || this.passwordCopyFileToUpload ===null  ||
      this.panCardCopyFileToUpload ===undefined || this.panCardCopyFileToUpload ===null  ||
      this.HDFCAccountDetailsFileToUpload ===undefined || this.HDFCAccountDetailsFileToUpload ===null  ||
      this.photographFileToUpload ===undefined || this.photographFileToUpload ===null  ||
      this.forAdharCardCopyFileToUpload ===undefined || this.forAdharCardCopyFileToUpload ===null ||
      this.employerAppoinmentLetter ===undefined || this.employerAppoinmentLetter ===null ||
      this.employerSalarySlip ===undefined || this.employerSalarySlip ===null 
      ){
         this.toastr.warningToastr("Please fill all the inputs then proceed","Warning");
      }else{
        this.loading=true;
        this.hr.postFileForExperienced(this.DOBFileToUpload,this.HEDFileToUpload,this.addressProofFileToUpload,
          this.passwordCopyFileToUpload,this.panCardCopyFileToUpload,this.HDFCAccountDetailsFileToUpload,
          this.photographFileToUpload,this.forAdharCardCopyFileToUpload,this.employerSalarySlip,this.employerAppoinmentLetter
          ).subscribe((result)=>{
            this.toastr.successToastr(result["message"],"Success");
            this.loading=false;
          console.log(result);
        })
      }
  }
}
