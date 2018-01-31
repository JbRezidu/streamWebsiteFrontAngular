import { Component } from '@angular/core';
import { StreamerService } from './shared/services/streamer.service';

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

  constructor(private streamerService: StreamerService) {
    this.anotherOtherTitle = this.title + ' ' + this.anotherTitle;
    this.streamerService.getStreamers().subscribe(streamers => {
      console.log(streamers);
      this.streamers = streamers;
    });
  }
}
