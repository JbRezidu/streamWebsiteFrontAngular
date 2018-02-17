import {WEEK_UPDATE} from '../../actions/constants';
import {CustomAction} from '../../store.interfaces';

export interface WeekState {
  days: any[];
  startDate: string;
  endDate: string;
}

const INITIAL_STATE: WeekState = {
  days: [],
  startDate: null,
  endDate: null,
};

export default function weekReducer(lastState = INITIAL_STATE, action: CustomAction) {
  switch (action.type) {
    case WEEK_UPDATE:
      return Object.assign({}, lastState, action.payload);

    default:
      return lastState;
  }
}
