import { Component, OnInit } from "@angular/core";
import { WeekActions } from "../../shared/store/actions/week/week.actions";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs";
import { WeekState } from "../../shared/store/reducers/week/week.reducer";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.css"]
})
export class ScheduleComponent implements OnInit {
  @select(["week"])
  week$: Observable<any>;

  weekDays = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche"
  ];

  week: WeekState;

  constructor(private weekActions: WeekActions) {
    this.weekActions.getCurrentWeek();
    this.week$.subscribe(week => {
      this.week = week;
    });
  }

  ngOnInit() {}
}
