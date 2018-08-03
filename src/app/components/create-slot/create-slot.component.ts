import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { select } from '@angular-redux/store';
import * as _find from 'lodash/find';

import { GameActions } from '../../shared/store/actions/game/game.actions';
import {ErrorSnackBarComponent} from '../snack-bar/error-snack-bar/error-snack-bar.component';

/**
 * Manages the creation of a stream slot
 *
 * @export
 * @class CreateSlotComponent
 */
@Component({
  selector: 'app-create-slot',
  templateUrl: './create-slot.component.html',
  styleUrls: ['./create-slot.component.scss'],
})
export class CreateSlotComponent implements OnInit {
  /**
   * Observable on games property of the game reducer
   *
   * @type {Observable<{ label: string, base64Img: string, _id: string }[]>}
   * @memberof CreateSlotComponent
   */
  @select(['game', 'games'])
  games$: Observable<{ label: string; base64Img: string; _id: string }[]>;

  /**
   * Title of the stream slot
   *
   * @type {string}
   * @memberof CreateSlotComponent
   */
  title: string;

  /**
   * Description of the stream slot
   *
   * @type {string}
   * @memberof CreateSlotComponent
   */
  description: string;

  /**
   * Form control for the game field
   *
   * @memberof CreateSlotComponent
   */
  gameControl = new FormControl();

  /**
   * List of filtered games (games that will be displayed in the autocomplete overlay)
   *
   * @type {{ label: string, base64Img: string, _id: string }[]}
   * @memberof CreateSlotComponent
   */
  filteredGames: { label: string; base64Img: string; _id: string }[] = [];

  /**
   * List of games
   *
   * @type {{ label: string, base64Img: string, _id: string }[]}
   * @memberof CreateSlotComponent
   */
  games: { label: string; base64Img: string; _id: string }[];

  /**
   * Ref to the subscription of the games$ observable
   *
   * @private
   * @type {Subscription}
   * @memberof CreateSlotComponent
   */
  private gamesSubscription: Subscription;

  /**
   * Ref to the subscription of the gameControl value changes observable
   *
   * @private
   * @type {Subscription}
   * @memberof CreateSlotComponent
   */
  private gameControlValueChangesSubscription: Subscription;

  /**
   *Creates an instance of CreateSlotComponent.
   * @param {GameActions} gameActions
   * @param {MatSnackBar} snackBar
   * @param {MatDialogRef<CreateSlotComponent>} dialogRef
   * @memberof CreateSlotComponent
   */
  constructor(
    private gameActions: GameActions,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateSlotComponent>
  ) {}

  /**
   * Lifecycle hook
   * Gets games and subscribe to it
   * Subscribe to the changes of the game control, to filter games
   *
   * @memberof CreateSlotComponent
   */
  ngOnInit() {
    this.gameActions.getGames();
    this.gamesSubscription = this.games$.subscribe((games) => {
      this.games = games;
      if (this.games) {
        this.filteredGames = this.filterGames(this.gameControl.value);
      }
    });
    this.gameControlValueChangesSubscription = this.gameControl.valueChanges.subscribe((value) => {
      this.filteredGames = this.filterGames(value);
    });
  }

  /**
   * Filter games depending on the string set by the user
   *
   * @private
   * @param {string} game
   * @returns {{ label: string, base64Img: string, _id: string }[]}
   * @memberof CreateSlotComponent
   */
  private filterGames(game: string): { label: string; base64Img: string; _id: string }[] {
    const gameValue = (game || '').toLowerCase();
    return this.games.filter((game) => game.label.toLowerCase().indexOf(gameValue) === 0);
  }

  /**
   * Lifecycle hook
   * Unsubscribes to subscriptions
   *
   * @memberof CreateSlotComponent
   */
  ngOnDestroy() {
    if (this.gamesSubscription) {
      this.gamesSubscription.unsubscribe();
    }
    if (this.gameControlValueChangesSubscription) {
      this.gameControlValueChangesSubscription.unsubscribe();
    }
  }

  /**
   * Handle click on the create slot button
   * Closes the dialog returning form data
   *
   * @memberof CreateSlotComponent
   */
  createSlot() {
    const selectedGame = _find(this.games, { label: this.gameControl.value });
    if (selectedGame) {
      delete (selectedGame.base64Img);
    }
    if (this.gameControl.value && !selectedGame) {
      // TODO : warn that the game was not on the list and will not be added to the stream slot
      this.snackBar.openFromComponent(ErrorSnackBarComponent, {
        data: {
          warningMessage: `Le jeu choisi : "${this.gameControl.value}" n'est pas dans la base et ne sera donc pas sélectionné pour ce stream !`
        },
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['warn-snackbar']
      });
    }
    this.dialogRef.close({
      title: this.title,
      description: this.description,
      game: _find(this.games, { label: this.gameControl.value }),
    });
  }
}
