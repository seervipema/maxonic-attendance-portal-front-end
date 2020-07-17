import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
const apiUrl=environment.apiUrl;
const URL = '../assets/data.json';
const URL2= '../assets/dataAfterLogin.json'
@Injectable({
  providedIn: 'root'
})
export class ImageSliderDataService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(URL);
  }
  getDataAfterLogin(){
    return this.http.get(URL2);
  }
  getUpcomingBirthday(){
    return this.http.get<any>(`${apiUrl}/user/upcomingBirthday`);
  }
}
