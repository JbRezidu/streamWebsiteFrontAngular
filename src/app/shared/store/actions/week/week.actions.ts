import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../index';
import {WeekService} from '../../../services/week/week.service';
import {WEEK_UPDATE} from '../constants';

@Injectable()
export class WeekActions {

  constructor(private ngRedux: NgRedux<IAppState>, private weekService: WeekService) {}

  getCurrentWeek() {
    this.weekService.getCurrentWeek().subscribe(currentWeek => {
      this.ngRedux.dispatch({type: WEEK_UPDATE, payload: currentWeek});
    });
  }
}
