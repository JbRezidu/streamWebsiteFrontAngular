import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IAppState } from '../../index';
import { WeekService } from '../../../services/week/week.service';
import {
  GET_CURRENT_WEEK_SUCCEED,
  INSTANCIATE_CURRENT_WEEK_SUCCEED,
} from '../constants';

/**
 * Manages week actions
 *
 * @export
 * @class WeekActions
 */
@Injectable()
export class WeekActions {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private weekService: WeekService
  ) {}

  /**
   * Get the current week
   *
   * @memberof WeekActions
   */
  getCurrentWeek() {
    this.weekService.getCurrentWeek().subscribe(
      currentWeek => {
        this.ngRedux.dispatch({
          type: GET_CURRENT_WEEK_SUCCEED,
          payload: currentWeek,
        });
      },
      (error: HttpErrorResponse) => {
        // If we do not find current week we have to create one
        if (error.status === 404 && error.error === 'No week found') {
          this.instanciateCurrentWeek();
        }
      }
    );
  }

  /**
   * Instanciates the current week
   *
   * @memberof WeekActions
   */
  instanciateCurrentWeek() {
    this.weekService.instanciateCurrentWeek().subscribe(currentWeek => {
      this.ngRedux.dispatch({
        type: INSTANCIATE_CURRENT_WEEK_SUCCEED,
        payload: currentWeek,
      });
    });
  }
}
