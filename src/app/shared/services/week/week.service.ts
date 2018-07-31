import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

/**
 * Manages week http calls
 *
 * @export
 * @class WeekService
 */
@Injectable()
export class WeekService {
  /**
   *Creates an instance of WeekService.
   * @param {HttpClient} http
   * @memberof WeekService
   */
  constructor(private http: HttpClient) {}

  /**
   * Get current weeks (http call)
   *
   * @returns {Observable<any>}
   * @memberof WeekService
   */
  getCurrentWeek(): Observable<any> {
    const today = new Date();
    const url = environment.week.currentWeek(
      encodeURIComponent(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`)
    );
    return this.http.get(url);
  }

  /**
   * Instanciates current week
   *
   * @returns {Observable<any>}
   * @memberof WeekService
   */
  instanciateCurrentWeek(): Observable<any> {
    const url = environment.week.instanciateCurrentWeek;
    return this.http.post(url, {});
  }
}
