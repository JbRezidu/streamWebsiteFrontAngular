import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select } from '@angular-redux/store';
import * as _intersection from 'lodash/intersection';
import { Observable, Subscription } from 'rxjs';
import { IUser, ISlot } from '../../shared/interfaces';
import { ROLES } from '../../shared/enums';

@Component({
  selector: 'app-slot-summary',
  templateUrl: './slot-summary.component.html',
  styleUrls: ['./slot-summary.component.scss'],
})
export class SlotSummaryComponent implements OnInit, OnDestroy {
  @select(['authentication', 'connectedUser'])
  connectedUser$: Observable<IUser>;

  slot: ISlot;

  private connectedUser: IUser;

  private connectedUserSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<SlotSummaryComponent>,
    @Inject(MAT_DIALOG_DATA) data: ISlot
  ) {
    this.slot = data;
  }

  ngOnInit() {
    this.connectedUserSubscription = this.connectedUser$.subscribe((connectedUser) => {
      this.connectedUser = connectedUser;
    });
  }

  ngOnDestroy() {
    if (this.connectedUserSubscription) {
      this.connectedUserSubscription.unsubscribe();
    }
  }

  deleteSlot() {
    this.dialogRef.close('DELETE');
  }

  /**
   * Precises if we can delete the slot
   * We can only remove the slot if we are an admin or a streamer
   * If we are a streamer we can only remove the slot if it is our slot
   *
   * @memberof SlotSummaryComponent
   */
  canDeleteSlot() {
    if (
      this.connectedUser &&
      _intersection(this.connectedUser.roles, [ROLES.ADMIN, ROLES.STREAMER])
    ) {
      // if there is no admin role we need to verify that the slot is the connected streamer slot
      if (!this.connectedUser.roles.includes(ROLES.ADMIN)) {
        if (this.connectedUser.pseudo === this.slot.streamer.pseudo) {
          return true;
        }
        return false;
      }
      return true;
    }
    return false;
  }
}
