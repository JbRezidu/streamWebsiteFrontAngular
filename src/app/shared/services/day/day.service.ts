import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DayService {

  constructor(private http: HttpClient) {}

  addSlotToDay(slot): Observable<any> {
    const url = 'http://localhost:3000/api/slot/add';
    return this.http.post(url, slot);
  }

  removeSlotToDay(slotId, dayId): Observable<any> {
    const url = `http://localhost:3000/api/slot?slotId=${slotId}&dayId=${dayId}`;
    return this.http.delete(url);
  }
}
