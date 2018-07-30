import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class WeekService {

  constructor(private http: HttpClient) { }

  getCurrentWeek(): Observable<any> {
    let url = 'http://localhost:3000/api/weekByDate/';
    const today = new Date();
    url += encodeURIComponent(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`);
    return this.http.get(url);
  }
}
