import { AUTHENTICATION_LOGIN, AUTHENTICATION_LOGOUT } from '../../actions/constants';
import { CustomAction } from '../../store.interfaces';
import { IUser } from '../../../interfaces';

export interface AuthenticationState {
  connectedUser: IUser;
  token: string;
}

const INITIAL_STATE: AuthenticationState = {
  connectedUser: null,
  token: null,
};

export default function authenticationReducer(lastState = INITIAL_STATE, action: CustomAction) {
  switch (action.type) {
    case AUTHENTICATION_LOGIN:
      return Object.assign({}, lastState, action.payload);

    case AUTHENTICATION_LOGOUT:
      return Object.assign({}, lastState, INITIAL_STATE);

    default:
      return lastState;
  }
}
