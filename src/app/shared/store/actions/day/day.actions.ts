import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../index';
import {DayService} from '../../../services/day/day.service';

@Injectable()
export class DayActions {

  constructor(private ngRedux: NgRedux<IAppState>, private dayService: DayService) {}

  addSlotToDay(payload) {
    this.dayService.addSlotToDay(payload).subscribe(savedSlot => {
      // this.ngRedux.dispatch({type: WEEK_UPDATE, payload: currentWeek});
    });
  }
}
