import {Component} from '@angular/core';
import {StreamerService} from './shared/services/streamer/streamer.service';
import {MatDialog} from '@angular/material/dialog';
import {ConnectionComponent} from './components/connection/connection.component';
import {Observable} from 'rxjs';
import {select} from '@angular-redux/store';
import {AuthenticationActions} from './shared/store/actions/authentication/authentication.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @select(['authentication', 'pseudo']) pseudo$: Observable<any>;

  pseudo: string;

  title = 'Alkor_TV';

  anotherTitle = 'On s\'amuse en plus';

  anotherOtherTitle: string;

  array = [{value: 'totot'}, {value: 'tatat'}, {value: 'titi'}];

  streamers = [];

  constructor(
    private streamerService: StreamerService,
    private authenticationActions: AuthenticationActions,
    public dialog: MatDialog
  ) {
    this.anotherOtherTitle = this.title + ' ' + this.anotherTitle;
    this.streamerService.getStreamers().subscribe(streamers => {
      this.streamers = streamers;
    });
    this.pseudo$.subscribe(pseudo => {
      this.pseudo = pseudo;
    });
  }

  login() {
    this.dialog.open(ConnectionComponent, {width: '250px'});
  }

  logout() {
    this.authenticationActions.logout();
  }

  getUsers() {
    this.streamerService.getStreamers().subscribe();
  }
}
