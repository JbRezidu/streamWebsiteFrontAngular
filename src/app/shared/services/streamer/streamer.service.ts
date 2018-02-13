import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {select} from '@angular-redux/store';

@Injectable()
export class StreamerService {

  constructor(private http: HttpClient) {}

  getStreamers(): Observable<any> {
    const url = 'http://localhost:3000/api/streamers';
    return this.http.get(url);
  }
}
