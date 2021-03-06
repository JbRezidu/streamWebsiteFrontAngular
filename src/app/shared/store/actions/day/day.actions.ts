import {Injectable} from '@angular/core';
import {DayService} from '../../../services/day/day.service';
import {WeekActions} from '../week/week.actions';

@Injectable()
export class DayActions {

  constructor(private dayService: DayService, private weekActions: WeekActions) {}

  addSlotToDay(slot) {
    this.dayService.addSlotToDay(slot).subscribe(() => {
      this.weekActions.getCurrentWeek();
    });
  }

  removeSlotToDay(slotId, dayId) {
    this.dayService.removeSlotToDay(slotId, dayId).subscribe(() => {
      this.weekActions.getCurrentWeek();
    });
  }
}
