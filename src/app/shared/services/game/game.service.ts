import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

/**
 * Service that manages games
 *
 * @export
 * @class GameService
 */
@Injectable()
export class GameService {
  /**
   *Creates an instance of GameService.
   * @param {HttpClient} http
   * @memberof GameService
   */
  constructor(private http: HttpClient) {}

  /**
   * Get games from database
   *
   * @returns {Observable<any>}
   * @memberof GameService
   */
  getGames(): Observable<any> {
    const url = environment.game.getGames;
    return this.http.get(url);
  }
}
