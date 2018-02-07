import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../index';
import {AUTHENTICATION_LOGIN, AUTHENTICATION_LOGOUT} from '../constants';
import * as Cookies from 'js-cookie';

@Injectable()
export class AuthenticationActions {

  constructor(private ngRedux: NgRedux<IAppState>) {}

  login(payload) {
    this.ngRedux.dispatch({type: AUTHENTICATION_LOGIN, payload});
  }

  logout() {
    this.ngRedux.dispatch({type: AUTHENTICATION_LOGOUT});
    Cookies.remove('authentication');
  }
}
