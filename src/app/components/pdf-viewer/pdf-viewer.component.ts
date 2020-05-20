import { Component, OnInit,AfterViewChecked } from '@angular/core';
import {PdfService} from '../../_services/pdf.service';
import {first} from 'rxjs/operators';
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
  constructor(private pdfService:PdfService) { }
  // loading:boolean=true;
  ngOnInit() {
  
   setInterval(()=>{
    this.pdfSrc="../../../assets/Maxonic_Handbook.pdf";
    this.loading=false;
   },800)
   
  }

  // ngAfterViewChecked(){
  //  this.loading=false

  // }
}
