import { CustomAction } from '../../store.interfaces';
import { GET_STREAMERS_SUCCEED } from '../../actions/constants';
import {IUser} from '../../../interfaces';

export interface UserState {
  streamers: IUser[];
}

const INITIAL_STATE: UserState = {
  streamers: [],
};

export default function userReducer(lastState = INITIAL_STATE, action: CustomAction) {
  switch (action.type) {
    case GET_STREAMERS_SUCCEED:
      return {
        ...lastState,
        streamers: action.payload,
      };

    default:
      return lastState;
  }
}
