import { GET_CURRENT_WEEK_SUCCEED, INSTANCIATE_CURRENT_WEEK_SUCCEED } from '../../actions/constants';
import { CustomAction } from '../../store.interfaces';
import {IWeek} from '../../../interfaces/week.interface';

const INITIAL_STATE: IWeek = {
  days: [],
  startDate: null,
  endDate: null,
};

export default function weekReducer(lastState = INITIAL_STATE, action: CustomAction) {
  switch (action.type) {
    case GET_CURRENT_WEEK_SUCCEED:
    case INSTANCIATE_CURRENT_WEEK_SUCCEED:
      return Object.assign({}, lastState, action.payload);

    default:
      return lastState;
  }
}
