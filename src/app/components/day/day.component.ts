import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input()
  header: string;

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

  constructor() { }

  ngOnInit() {
    const serverSlots = <any>[
      {
        'duration': 1,
        'startHour': 16,
        'description': 'a description',
        'title': 'a title',
        'streamer': {
          'pseudo': 'Alkor',
          'color': 'red'
        }
      },
      {
        'duration': 1,
        'startHour': 20,
        'description': 'a description',
        'title': 'a title',
        'streamer': {
          'pseudo': 'Alkor',
          'color': '#000fff'
        }
      }
    ];
    serverSlots.forEach(serverSlot => {
      const effectiveSlot = _.find(this.slots, {startHour: serverSlot.startHour});
      serverSlot.color = serverSlot.streamer.color;
      serverSlot.streamerPseudo = serverSlot.streamer.pseudo;
      delete(serverSlot.streamer);
      delete(serverSlot.duration);
      effectiveSlot.slot = serverSlot;
    });
  }

}
