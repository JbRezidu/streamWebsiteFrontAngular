import { combineReducers } from 'redux';
import authentication, { AuthenticationState } from './reducers/authentication/authentication.reducer';
import week, { WeekState } from './reducers/week/week.reducer';
import game, { GameState } from './reducers/game/game.reducer';

export class IAppState {
  authentication?: AuthenticationState;
  week?: WeekState;
  game?: GameState;
}

export const rootReducer = combineReducers<IAppState>({
  authentication,
  week,
  game
});
