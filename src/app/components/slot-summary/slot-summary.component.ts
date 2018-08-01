import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-slot-summary',
  templateUrl: './slot-summary.component.html',
  styleUrls: ['./slot-summary.component.scss']
})
export class SlotSummaryComponent {

  slot: any;

  constructor(public dialogRef: MatDialogRef<SlotSummaryComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.slot = data;
  }

  deleteSlot() {
    this.dialogRef.close('DELETE');
  }
}
