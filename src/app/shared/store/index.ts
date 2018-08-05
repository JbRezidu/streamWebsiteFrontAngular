import { combineReducers } from 'redux';
import authentication, {
  AuthenticationState,
} from './reducers/authentication/authentication.reducer';
import week from './reducers/week/week.reducer';
import game, { GameState } from './reducers/game/game.reducer';
import user, { UserState } from './reducers/user/user.reducer';
import { IWeek } from '../interfaces/week.interface';

export class IAppState {
  authentication?: AuthenticationState;
  week?: IWeek;
  game?: GameState;
  user?: UserState;
}

export const rootReducer = combineReducers<IAppState>({
  authentication,
  week,
  game,
  user,
});
