import { Component, OnInit, ViewEncapsulation,Input} from '@angular/core';
import {Result} from './result';
import {ImageSliderDataService} from '../../_services/image-slider-data.service';
import {AuthenticationService} from '../../_services/authentication.service';
import * as moment from 'moment';
import {Router} from '@angular/router'
@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class ImageSliderComponent implements OnInit {
  
  @Input() message: string;
  @Input() sliderArray: object[];
  transform: number;
  selectedIndex = 0;
  messageForBirthday:any;
  
  constructor(private data: ImageSliderDataService,
    private authenticateService:AuthenticationService,
    private router:Router
    
    ) {
    this.sliderArray = [];
    this.selectedIndex = 0;
    this.transform = 100;
   }
   _ref:any;   
   removeObject(){
     this._ref.destroy();
   } 

  ngOnInit() {
    this.sliderArray=[];
    this.data.getUpcomingBirthday().subscribe(result =>{
      console.log(result);
      if(result["failed"]){
              this.authenticateService.logout();
              // this.router.navigateByUrl('/')
      }else{
        if(result===0){
          this.messageForBirthday=result["message"];
        }
      }
    })
    if(!this.authenticateService.isLogged()){
      this.data.getData().subscribe((result: Result) => {
        this.sliderArray = result.sliderArray;
      });
    }else{
      this.data.getDataAfterLogin().subscribe((result: Result) => {
        this.sliderArray = result.sliderArray;
      });
    }
    
  }
  selected(x) {
    this.downSelected(x);
    this.selectedIndex = x;
   }

   keySelected(x) {
    this.downSelected(x);
    this.selectedIndex = x;
  }

   downSelected(i) {
   this.transform =  100 - (i) * 55;
     this.selectedIndex = this.selectedIndex + 1;
     if (this.selectedIndex > 4) {
       this.selectedIndex = 0;
     }
   }

}
