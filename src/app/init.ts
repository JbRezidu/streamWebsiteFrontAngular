import * as Cookies from 'js-cookie';
import * as _ from 'lodash';
import {AuthenticationActions} from './shared/store/actions/authentication/authentication.actions';

export function initApp(authenticationActions: AuthenticationActions) {
  const authentication = Cookies.getJSON('authentication');
  if (!_.isEmpty(authentication)) {
    authenticationActions.setAuthenticationInStore(authentication);
  }
}
