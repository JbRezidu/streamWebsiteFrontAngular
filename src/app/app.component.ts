import {Component} from '@angular/core';
import {UserService} from './shared/services/user/user.service';
import {MatDialog} from '@angular/material/dialog';
import {ConnectionComponent} from './components/connection/connection.component';
import {Observable} from 'rxjs';
import {select} from '@angular-redux/store';
import {AuthenticationActions} from './shared/store/actions/authentication/authentication.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @select(['authentication', 'connectedUser']) connectedUser$: Observable<any>;

  pseudo: string;

  title = 'Alkor_TV';

  anotherTitle = 'On s\'amuse en plus';

  anotherOtherTitle: string;

  array = [{value: 'totot'}, {value: 'tatat'}, {value: 'titi'}];

  users = [];

  constructor(
    private userService: UserService,
    private authenticationActions: AuthenticationActions,
    public dialog: MatDialog
  ) {
    this.anotherOtherTitle = this.title + ' ' + this.anotherTitle;
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.connectedUser$.subscribe(connectedUser => {
      if (connectedUser) {
        this.pseudo = connectedUser.pseudo;
      } else {
        this.pseudo = null;
      }
    });
  }

  login() {
    this.dialog.open(ConnectionComponent, {width: '250px'});
  }

  logout() {
    this.authenticationActions.logout();
  }

  getUsers() {
    this.userService.getUsers().subscribe();
  }
}
