import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(password) {
    const url = `http://localhost:3000/api/login`;
    return this.http.post(url, { password }).subscribe(token => {
      console.log(token);
    });

  }

  logout() {

  }
}
