import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StreamerService } from './shared/services/streamer.service';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { DayComponent } from './components/day/day.component';
import { SlotComponent } from './components/slot/slot.component';


@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    DayComponent,
    SlotComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [StreamerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
