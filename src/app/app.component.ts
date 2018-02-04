import { Component } from '@angular/core';
import { StreamerService } from './shared/services/streamer/streamer.service';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionComponent } from './components/connection/connection.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Alkor_TV';

  anotherTitle = 'On s\'amuse en plus';

  anotherOtherTitle: string;

  array = [{ value: 'totot' }, { value: 'tatat' }, { value: 'titi' }];

  streamers = [];

  constructor(private streamerService: StreamerService, public dialog: MatDialog) {
    this.anotherOtherTitle = this.title + ' ' + this.anotherTitle;
    this.streamerService.getStreamers().subscribe(streamers => {
      this.streamers = streamers;
    });
  }

  test() {
    console.log('click');
    this.dialog.open(ConnectionComponent, { width: '250px' });
  }
}
