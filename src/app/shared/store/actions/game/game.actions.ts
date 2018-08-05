import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../index';
import { GameService } from '../../../services/game/game.service';
import { GET_GAMES_SUCCEED } from '../constants';
import {IGame} from '../../../interfaces';

/**
 * Actions that manage games
 *
 * @export
 * @class GameActions
 */
@Injectable()
export class GameActions {
  constructor(private ngRedux: NgRedux<IAppState>, private gameService: GameService) {}

  /**
   * Get games from the bdd
   *
   * @memberof GameActions
   */
  getGames() {
    this.gameService.getGames().subscribe((games: IGame[]) => {
      this.ngRedux.dispatch({
        type: GET_GAMES_SUCCEED,
        payload: games,
      });
    });
  }
}
