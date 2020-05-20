import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
const apiUrl=environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class HrFormalitiesService {

  constructor(private http:HttpClient) { }
  postFile(DOBFileToUpload:File,HEDFileToUpload:File,addressProofFileToUpload:File,
    passwordCopyFileToUpload:File,panCardCopyFileToUpload:File,HDFCAccountDetailsFileToUpload:File,
    photographFileToUpload:File,forAdharCardCopyFileToUpload:File
    ){
    const endpoint = `${apiUrl}/email/send-hr-files`;
    const formData: FormData = new FormData();
    formData.append('DOBFile', DOBFileToUpload, DOBFileToUpload.name);
    formData.append('HEDFile', HEDFileToUpload, HEDFileToUpload.name);
    formData.append('addressProofFile', addressProofFileToUpload, addressProofFileToUpload.name);
    formData.append('passwordCopyFile', passwordCopyFileToUpload, passwordCopyFileToUpload.name);
    formData.append('panCardCopyFile', panCardCopyFileToUpload, panCardCopyFileToUpload.name);
    formData.append('HDFCAccountDetailsFile', HDFCAccountDetailsFileToUpload, HDFCAccountDetailsFileToUpload.name);
    formData.append('photographFile', photographFileToUpload, photographFileToUpload.name);
    formData.append('forAdharCardCopyFile', forAdharCardCopyFileToUpload, forAdharCardCopyFileToUpload.name);
    return this.http.post(endpoint, formData, { });
  }
  postFileForExperienced(DOBFileToUpload:File,HEDFileToUpload:File,addressProofFileToUpload:File,
    passwordCopyFileToUpload:File,panCardCopyFileToUpload:File,HDFCAccountDetailsFileToUpload:File,
    photographFileToUpload:File,forAdharCardCopyFileToUpload:File,employerSalarySlip:File,employerAppoinmentLetter:File
    ){
    const endpoint = `${apiUrl}/email/send-hr-files/experienced`;
    const formData: FormData = new FormData();
    formData.append('DOBFile', DOBFileToUpload, DOBFileToUpload.name);
    formData.append('HEDFile', HEDFileToUpload, HEDFileToUpload.name);
    formData.append('addressProofFile', addressProofFileToUpload, addressProofFileToUpload.name);
    formData.append('passwordCopyFile', passwordCopyFileToUpload, passwordCopyFileToUpload.name);
    formData.append('panCardCopyFile', panCardCopyFileToUpload, panCardCopyFileToUpload.name);
    formData.append('HDFCAccountDetailsFile', HDFCAccountDetailsFileToUpload, HDFCAccountDetailsFileToUpload.name);
    formData.append('photographFile', photographFileToUpload, photographFileToUpload.name);
    formData.append('forAdharCardCopyFile', forAdharCardCopyFileToUpload, forAdharCardCopyFileToUpload.name);
    formData.append('employerSalarySlip',employerSalarySlip,employerSalarySlip.name);
    formData.append('employerAppoinmentLetter',employerAppoinmentLetter,employerAppoinmentLetter.name);
    return this.http.post(endpoint, formData, { });
  }
}
