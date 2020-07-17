import { Component, OnInit,AfterViewChecked } from '@angular/core';
import {PdfService} from '../../_services/pdf.service';
import {first} from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import {AdminService} from '../../_services/admin.service';
import {AuthenticationService} from '../../_services/authentication.service';
import {ToastrManager} from 'ng6-toastr-notifications';
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
  // pdfSrc ="http://localhost:3000/pdf_download/pdf"
  // pdfSrc="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"
  pdfSrc="";
  loading:boolean=true;
  constructor(private pdfService:PdfService,
    private data:AdminService,
    private toastr:ToastrManager,
    private authenticationService:AuthenticationService
    
    ) { }
  // loading:boolean=true;
  ngOnInit() {
    this.CheckJWTAuthentication();
  
   setInterval(()=>{
    this.pdfSrc="../../../assets/Maxonic_Handbook.pdf";
    this.loading=false;
   },800)
   
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

  // ngAfterViewChecked(){
  //  this.loading=false

  // }
}
