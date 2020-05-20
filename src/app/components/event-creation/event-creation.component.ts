import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../_services/events.service';
import { first } from 'rxjs/operators';
import * as moment from 'moment';
@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.css']
})
export class EventCreationComponent implements OnInit {

  constructor(private eventService:EventsService) { }
  eventName:string;
  eventDate:Date;
  eventDescription:string;
  isEventNameEmpty:boolean=false;
  isDateOfEventEmpty:boolean=false; 
  isEventDescriptionEmpty:boolean=false;
  isEventCreationResponseEmpty:boolean=false;
  eventNameMessage:string="Event name sholud not be empty ...!!!";
  dateOfEventMessage:string="Date of event sholud not be empty ...!!!";
  eventDescriptionMessage:string="Event Description shuold not be empty ...!!!";
  eventCreationResponseMessage:string="Please wait for server response...!!!";
  loading:boolean=false;
  createdEventList:any=[];
  ngOnInit() {
    this.get_all_events();
  }
  get_all_events(){
    this.eventService.get_all_events().pipe(first()).subscribe(result=>{
      this.createdEventList=[];
      let allEvents=[];
      allEvents=result["result"];
      for(let i=0;i<(allEvents).length;i++){
        let obj={};
        obj["event_date"]=allEvents[i].event_date;
        obj["event_name"]=allEvents[i].event_name;
        obj["event_description"]=allEvents[i].event_description;
        this.createdEventList.push(obj);
      }
    })
  }
  onEventNameChanged(){
     if(this.eventName){
       this.isEventNameEmpty=false;
     }else{
       this.isEventNameEmpty=true;
     }
  }
  onEventDateChanged(){
     if(this.eventDate){
       this.isDateOfEventEmpty=false;
     }else{
       this.isDateOfEventEmpty=true;
     }
  }
  onEventDescriptionChanged(){
      if(this.eventDescription){
        this.isEventDescriptionEmpty=false;
      }else{
        this.isEventDescriptionEmpty=true;
      }
  }
  onCreateEventClicked(){
     if(this.eventName === undefined || this.eventName ==="" || this.eventDate ===undefined || this.eventDate ===null || this.eventDescription ===undefined || this.eventDescription ===""){
        this.eventCreationResponseMessage ="Please fill all the form then proceed...";
        this.isEventCreationResponseEmpty=true;
     }else{
        this.loading=true;
        this.eventService.create_event(this.eventDate,this.eventName,this.eventDescription,localStorage.getItem('email')).pipe(first()).subscribe(
          result =>{
            this.isEventCreationResponseEmpty=true;
            this.eventCreationResponseMessage=result["message"];
            this.get_all_events();
          }
        )

     }
  }
  OnDeleteClicked(event_date:any){
            this.eventService.delete_event(moment(event_date).format('YYYY-MM-DD')).pipe(first()).subscribe(
              result=>{
                console.log(result);
                this.get_all_events();
              }
            )
  }
}
