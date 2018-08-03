import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const url = 'http://localhost:3000/api/users';
    return this.http.get(url);
  }
}
