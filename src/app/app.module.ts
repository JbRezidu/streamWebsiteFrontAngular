import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {StreamerService} from './shared/services/streamer/streamer.service';
import {ScheduleComponent} from './components/schedule/schedule.component';
import {DayComponent} from './components/day/day.component';
import {SlotComponent} from './components/slot/slot.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConnectionComponent} from './components/connection/connection.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from './shared/services/authentication/authentication.service';
import {NgReduxModule, NgRedux} from '@angular-redux/store';
import {IAppState, rootReducer, INITIAL_STATE} from './shared/store/index';
import {AuthenticationActions} from './shared/store/actions/authentication/authentication.actions';
import {initApp} from './init';
import {CustomHttpInterceptor} from './shared/services/http/http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    DayComponent,
    SlotComponent,
    ConnectionComponent
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
    AuthenticationActions,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
  ],
  entryComponents: [ConnectionComponent, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, private authencationActions: AuthenticationActions) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
    initApp(this.authencationActions);
  }
}
