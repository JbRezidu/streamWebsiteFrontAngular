import {Action, combineReducers} from 'redux';
import {AUTHENTICATION_LOGIN, AUTHENTICATION_LOGOUT, WEEK_UPDATE} from './actions/constants';
import authentication, {AuthenticationState} from './reducers/authentication/authentication.reducer';
import week, {WeekState} from './reducers/week/week.reducer';


export class IAppState {
  authentication?: AuthenticationState;
  week?: WeekState;
}

export const rootReducer = combineReducers<IAppState>({
  authentication,
  week,
});
