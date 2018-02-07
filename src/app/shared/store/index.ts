import {Action} from 'redux';
import {AUTHENTICATION_LOGIN, AUTHENTICATION_LOGOUT} from './actions/constants';

export interface IAppState {
  authentication: {
    pseudo: string;
    token: string;
  };
}

export interface CustomAction {
  type: string;
  payload: any;
}

export const INITIAL_STATE: IAppState = {
  authentication: {pseudo: null, token: null}
};

export function rootReducer(lastState: IAppState, action: CustomAction): IAppState {
  switch (action.type) {
    case AUTHENTICATION_LOGIN:
      return Object.assign({}, lastState, {authentication: action.payload});

    case AUTHENTICATION_LOGOUT:
      return Object.assign({}, INITIAL_STATE);
  }
  return lastState;
}
