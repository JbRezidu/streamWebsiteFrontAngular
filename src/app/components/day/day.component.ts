import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import {MatDialog} from '@angular/material/dialog';
import {CreateSlotComponent} from '../create-slot/create-slot.component';
import {DayActions} from '../../shared/store/actions/day/day.actions';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
})
export class DayComponent implements OnInit {

  @Input()
  header: string;

  @Input()
  day;

  slots = [
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

  constructor(private dialog: MatDialog, private dayActions: DayActions) { }

  ngOnInit() {
    const serverSlots = this.day.slots;
    serverSlots.forEach(serverSlot => {
      const effectiveSlot = _.find(this.slots, {startHour: serverSlot.startHour});
      serverSlot.color = serverSlot.streamer.color;
      serverSlot.streamerPseudo = serverSlot.streamer.pseudo;
      delete(serverSlot.streamer);
      delete(serverSlot.duration);
      effectiveSlot.slot = serverSlot;
    });
  }

  handleClickOnSlot(clickedSlot) {
    console.log(this.day._id);
    console.log(clickedSlot);
    const dialogRef = this.dialog.open(CreateSlotComponent, {width: '50%'});
    dialogRef.afterClosed().subscribe(slot => {
      slot.startHour = clickedSlot.startHour;
      slot.dayId = this.day._id;
      console.log('our');
      if (slot) {
        console.log('in actions');
        this.dayActions.addSlotToDay(slot);
      }
    });
  }

}
