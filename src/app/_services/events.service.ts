import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from './../../environments/environment';
const apiUrl=environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http:HttpClient) { }

  create_event(event_date:Date,event_name:string,event_description:string,email:string){
     return this.http.post(`${apiUrl}/events`,{event_date,event_name,event_description,email});
  }
  delete_event(event_date:any){
    const options={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body:{
        event_date
      }
    }
    return this.http.delete(`${apiUrl}/events/delete`,options);

  }
  get_all_events(){
    return this.http.get(`${apiUrl}/events`);
  }
}

