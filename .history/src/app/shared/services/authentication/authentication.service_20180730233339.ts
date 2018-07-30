import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as Cookies from 'js-cookie';
import * as moment from 'moment';


@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  login(password): Observable<any> {
    const url = `http://localhost:3000/api/login`;
    return this.http.post(url, {password}).do((result: any) => {
      // set the cookies
      const expireDate = moment(new Date()).add(30, 'm').toDate();
      Cookies.set('authentication', result, {expires: expireDate});
    });
  }

  logout(): Observable<any> {
    const url = 'http://localhost:3000/api/logout';
    return this.http.post(url, {}).do(() => {
      this.removeAuthenticationCookie();
    });
  }

  removeAuthenticationCookie() {
    Cookies.remove('authentication');
  }
}
