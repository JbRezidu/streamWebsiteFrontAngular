import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { WeekActions } from '../../shared/store/actions/week/week.actions';
import { IWeek } from '../../shared/interfaces/week.interface';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  @select(['week'])
  week$: Observable<IWeek>;

  weekDays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

  week: IWeek;

  constructor(private weekActions: WeekActions) {
    this.weekActions.getCurrentWeek();
    this.week$.subscribe((week) => {
      this.week = week;
    });
  }

  ngOnInit() {}
}
