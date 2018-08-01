import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthenticationActions} from '../../shared/store/actions/authentication/authentication.actions';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent {

  password: string;

  constructor(
    private authenticationActions: AuthenticationActions,
    public dialogRef: MatDialogRef<ConnectionComponent>,
  ) {}

  login() {
    this.authenticationActions.login(this.password);
  }
}
