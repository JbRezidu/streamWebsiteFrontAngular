import {Component, OnInit, Input} from '@angular/core';
import * as _ from 'lodash';
import {MatDialog} from '@angular/material/dialog';
import {CreateSlotComponent} from '../create-slot/create-slot.component';
import {DayActions} from '../../shared/store/actions/day/day.actions';
import * as _cloneDeep from 'lodash/cloneDeep';
import * as _get from 'lodash/get';
import {SlotSummaryComponent} from '../slot-summary/slot-summary.component';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
})
export class DayComponent {

  @Input()
  header: string;

  private _day;

  @Input()
  set day(day: any) {
    this._day = day;
    this.initDaySlots();
  }

  get day() {
    return this._day;
  }

  private initialSlots = [
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
      startHour: 24
    },
  ];

  slots;

  constructor(private dialog: MatDialog, private dayActions: DayActions) {}

  initDaySlots() {
    this.slots = _cloneDeep(this.initialSlots);
    const serverSlots = this.day.slots;
    serverSlots.forEach(serverSlot => {
      const effectiveSlot = _.find(this.slots, {startHour: serverSlot.startHour});
      serverSlot.color = serverSlot.streamer.color;
      serverSlot.streamerPseudo = serverSlot.streamer.pseudo;
      delete (serverSlot.streamer);
      delete (serverSlot.duration);
      effectiveSlot.slot = serverSlot;
    });
  }

  handleClickOnSlot(clickedSlot) {
    if (_get(clickedSlot, 'slot.title')) {
      const dialogRef = this.dialog.open(SlotSummaryComponent, {
        data: clickedSlot.slot,
        width: '50%',
      });
      dialogRef.afterClosed().subscribe(action => {
        if (action === 'DELETE') {
          this.dayActions.removeSlotToDay(clickedSlot.slot._id, this.day._id);
        }
      });
    } else {
      const dialogRef = this.dialog.open(CreateSlotComponent, {width: '50%'});
      dialogRef.afterClosed().subscribe(slot => {
        if (slot) {
          slot.startHour = clickedSlot.startHour;
          slot.dayId = this.day._id;
          this.dayActions.addSlotToDay(slot);
        }
      });
    }
  }
}
