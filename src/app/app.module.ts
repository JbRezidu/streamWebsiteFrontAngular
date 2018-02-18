import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {NgReduxModule, NgRedux, DevToolsExtension} from '@angular-redux/store';
import {rootReducer} from './shared/store/index';
import {initApp} from './init';
import {CustomHttpInterceptor} from './shared/services/http/http-interceptor';

/** COMPONENTS **/
import {AppComponent} from './app.component';
import {ScheduleComponent} from './components/schedule/schedule.component';
import {DayComponent} from './components/day/day.component';
import {SlotComponent} from './components/slot/slot.component';
import {ConnectionComponent} from './components/connection/connection.component';
import {CreateSlotComponent} from './components/create-slot/create-slot.component';
import {SlotSummaryComponent} from './components/slot-summary/slot-summary.component';

/** SERVICES **/
import {StreamerService} from './shared/services/streamer/streamer.service';
import {WeekService} from './shared/services/week/week.service';
import {AuthenticationService} from './shared/services/authentication/authentication.service';
import {DayService} from './shared/services/day/day.service';

/** ACTIONS **/
import {WeekActions} from './shared/store/actions/week/week.actions';
import {AuthenticationActions} from './shared/store/actions/authentication/authentication.actions';
import {DayActions} from './shared/store/actions/day/day.actions';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    DayComponent,
    SlotComponent,
    ConnectionComponent,
    CreateSlotComponent,
    SlotSummaryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    NgReduxModule,
  ],
  providers: [
    StreamerService,
    AuthenticationService,
    WeekService,
    DayService,
    AuthenticationActions,
    WeekActions,
    DayActions,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
  ],
  entryComponents: [ConnectionComponent, AppComponent, CreateSlotComponent, SlotSummaryComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<any>,
    private reduxDevTool: DevToolsExtension,
    private authencationActions: AuthenticationActions,
  ) {
    ngRedux.configureStore(rootReducer, {}, [], [reduxDevTool.isEnabled() ? reduxDevTool.enhancer() : f => f]);
    initApp(this.authencationActions);
  }
}
