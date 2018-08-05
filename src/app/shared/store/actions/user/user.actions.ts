import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../index';
import { GET_STREAMERS_SUCCEED } from '../constants';
import { UserService } from '../../../services/user/user.service';
import {IUser} from '../../../interfaces';

/**
 * Actions that manage games
 *
 * @export
 * @class UserActions
 */
@Injectable()
export class UserActions {
  constructor(private ngRedux: NgRedux<IAppState>, private userService: UserService) {}

  /**
   * Get games from the bdd
   *
   * @memberof UserActions
   */
  getStreamers() {
    this.userService.getStreamers().subscribe((streamers: IUser[]) => {
      this.ngRedux.dispatch({
        type: GET_STREAMERS_SUCCEED,
        payload: streamers,
      });
    });
  }
}
