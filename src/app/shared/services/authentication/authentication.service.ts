import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AuthenticationActions} from '../../store/actions/authentication/authentication.actions';
import * as Cookies from 'js-cookie';
import * as moment from 'moment';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient, private authenticationAction: AuthenticationActions) { }

  login(password) {
    const url = `http://localhost:3000/api/login`;
    return this.http.post(url, { password }).subscribe((result: any) => {
      delete(result.color);
      this.authenticationAction.login(result);
      // set the cookies
      const expireDate = moment(new Date()).add(30, 'm').toDate();
      Cookies.set('authentication', result, {expires: expireDate});
    });
  }

  logout() {
  }
}
