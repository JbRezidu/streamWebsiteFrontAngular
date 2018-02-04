import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {

  password: string;

  constructor(
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<ConnectionComponent>,
  ) { }

  login() {
    console.log(this.password);
    this.authenticationService.login(this.password);
  }
}
