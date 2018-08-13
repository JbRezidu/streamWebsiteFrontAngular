import { Component, Input } from '@angular/core';
import { select } from '@angular-redux/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as _cloneDeep from 'lodash/cloneDeep';
import * as _findIndex from 'lodash/findIndex';
import * as _get from 'lodash/get';
import * as _intersection from 'lodash/intersection';
import { CreateSlotComponent } from '../create-slot/create-slot.component';
import { DayActions } from '../../shared/store/actions/day/day.actions';
import { SlotSummaryComponent } from '../slot-summary/slot-summary.component';
import { IDay, IUser, ISlot } from '../../shared/interfaces';
import { ROLES } from '../../shared/enums';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {
  @select(['authentication', 'connectedUser'])
  connectedUser$: Observable<IUser>;

  @Input()
  header: string;

  private _day: IDay;

  @Input()
  set day(day: IDay) {
    this._day = day;
    this.initDaySlots();
  }

  get day(): IDay {
    return this._day;
  }

  private initialSlots = [
    {
      startHour: 8
    },
    {
      startHour: 9
    },
    {
      startHour: 10
    },
    {
      startHour: 11
    },
    {
      startHour: 12
    },
    {
      startHour: 13
    },
    {
      startHour: 14
    },
    {
      startHour: 15
    },
    {
      startHour: 16
    },
    {
      startHour: 17
    },
    {
      startHour: 18
    },
    {
      startHour: 19
    },
    {
      startHour: 20
    },
    {
      startHour: 21
    },
    {
      startHour: 22
    },
    {
      startHour: 23
    },
    {
      startHour: 0
    },
    {
      startHour: 1
    },
    {
      startHour: 2
    }
  ];

  slots: ISlot[];

  constructor(private dialog: MatDialog, private dayActions: DayActions) {}

  initDaySlots() {
    this.slots = _cloneDeep(this.initialSlots);
    const serverSlots = this.day.slots;
    serverSlots.forEach(serverSlot => {
      let slotIndex = _findIndex(this.slots, {
        startHour: serverSlot.startHour
      });
      this.slots[slotIndex] = serverSlot;
    });
  }

  handleClickOnSlot(clickedSlot) {
    // verify if we have the right to click (we can only click on a slot without title if we are an admin or a stream)
    // we can click on a existing slot without role but we won't be able to remove it
    if (_get(clickedSlot, 'title')) {
      const dialogRef = this.dialog.open(SlotSummaryComponent, {
        data: clickedSlot,
        width: '50%'
      });
      dialogRef.afterClosed().subscribe(action => {
        if (action === 'DELETE') {
          this.dayActions.removeSlotToDay(clickedSlot._id, this.day._id);
        }
      });
    } else {
      this.connectedUser$.pipe(take(1)).subscribe(connectedUser => {
        if (
          connectedUser &&
          _intersection(connectedUser.roles, [ROLES.ADMIN, ROLES.STREAMER])
        ) {
          const dialogRef = this.dialog.open(CreateSlotComponent, {
            width: '50%'
          });
          dialogRef.afterClosed().subscribe(slot => {
            if (slot) {
              slot.startHour = clickedSlot.startHour;
              slot.dayId = this.day._id;
              this.dayActions.addSlotToDay(slot);
            }
          });
        }
      });
    }
  }
}
