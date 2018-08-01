import { CustomAction } from '../../store.interfaces';
import { GET_GAMES_SUCCEED } from './../../actions/constants';

export interface GameState {
  games: { label: string }[];
}

const INITIAL_STATE: GameState = {
  games: [],
};

export default function gameReducer(lastState = INITIAL_STATE, action: CustomAction) {
  switch (action.type) {
    case GET_GAMES_SUCCEED:
      return {
        ...lastState,
        games: action.payload
      };

    default:
      return lastState;
  }
}
