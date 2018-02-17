import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-slot',
  templateUrl: './create-slot.component.html',
  styleUrls: ['./create-slot.component.css']
})
export class CreateSlotComponent {

  title: string;

  description: string;

  constructor(public dialogRef: MatDialogRef<CreateSlotComponent>) {}

  createSlot() {
    this.dialogRef.close({title: this.title, description: this.description});
  }
}
