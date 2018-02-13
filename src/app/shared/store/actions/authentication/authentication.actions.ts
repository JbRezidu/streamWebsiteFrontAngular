import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../index';
import {AUTHENTICATION_LOGIN, AUTHENTICATION_LOGOUT} from '../constants';
import * as Cookies from 'js-cookie';
import * as _ from 'lodash';
import {AuthenticationService} from '../../../services/authentication/authentication.service';

@Injectable()
export class AuthenticationActions {

  constructor(private ngRedux: NgRedux<IAppState>, private authenticationService: AuthenticationService) {}

  login(password) {
    this.authenticationService.login(password).subscribe(
      result => {
        delete (result.color);
        this.setAuthenticationInStore(result);
      },
      error => {
        console.log(error);
      },
    );
  }

  setAuthenticationInStore(authentication) {
    this.ngRedux.dispatch({type: AUTHENTICATION_LOGIN, payload: authentication});
  }

  logout() {
    this.authenticationService.logout().subscribe(
      () => {
        this.ngRedux.dispatch({type: AUTHENTICATION_LOGOUT});
      },
      error => {
        if (_.get(error, 'error.code') === 404) {
          this.ngRedux.dispatch({type: AUTHENTICATION_LOGOUT});
          this.authenticationService.removeAuthenticationCookie();
        }
      }
    );
  }
}
