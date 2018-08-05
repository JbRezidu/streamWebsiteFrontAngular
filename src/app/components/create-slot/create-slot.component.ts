import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { select } from '@angular-redux/store';
import * as _find from 'lodash/find';

import { GameActions } from '../../shared/store/actions/game/game.actions';
import { ErrorSnackBarComponent } from '../snack-bar/error-snack-bar/error-snack-bar.component';
import { UserActions } from '../../shared/store/actions/user/user.actions';
import { IGame, IUser } from '../../shared/interfaces';
import { ROLES } from '../../shared/enums';
import { openWarningSnackBar } from '../../shared/utils';

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
   * @type {Observable<IGame[]>}
   * @memberof CreateSlotComponent
   */
  @select(['game', 'games'])
  games$: Observable<IGame[]>;

  @select(['user', 'streamers'])
  streamers$: Observable<IUser[]>;

  @select(['authentication', 'connectedUser'])
  connectedUser$: Observable<IUser>;

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

  streamerControl = new FormControl();

  /**
   * List of filtered games (games that will be displayed in the autocomplete overlay)
   *
   * @type {IGame[]}
   * @memberof CreateSlotComponent
   */
  filteredGames: IGame[] = [];

  /**
   * List of games
   *
   * @type {IGame[]}
   * @memberof CreateSlotComponent
   */
  games: IGame[];

  streamers: IUser[];

  filteredStreamers: IUser[] = [];

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

  private streamerControlValueChangesSubscription: Subscription;

  private connectedUserSubscription: Subscription;

  private streamerSubscription: Subscription;

  private connectedUser: IUser;

  addForOther = false;

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
    private userActions: UserActions,
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
    this.streamerControlValueChangesSubscription = this.streamerControl.valueChanges.subscribe(
      (value) => {
        this.filteredStreamers = this.filterStreamers(value);
      }
    );
    this.connectedUserSubscription = this.connectedUser$.subscribe((connectedUser) => {
      this.connectedUser = connectedUser;
    });
  }

  /**
   * Filter games depending on the string set by the user
   *
   * @private
   * @param {string} game
   * @returns {IGame[]}
   * @memberof CreateSlotComponent
   */
  private filterGames(game: string): IGame[] {
    const gameValue = (game || '').toLowerCase();
    return this.games.filter((game) => game.label.toLowerCase().indexOf(gameValue) === 0);
  }

  private filterStreamers(streamer: string): IUser[] {
    const streamerValue = (streamer || '').toLowerCase();
    return this.streamers.filter(
      (streamer) => streamer.pseudo.toLocaleLowerCase().indexOf(streamerValue) === 0
    );
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
    if (this.connectedUserSubscription) {
      this.connectedUserSubscription.unsubscribe();
    }
    if (this.streamerSubscription) {
      this.streamerSubscription.unsubscribe();
    }
    if (this.streamerControlValueChangesSubscription) {
      this.streamerControlValueChangesSubscription.unsubscribe();
    }
  }

  /**
   * Handle click on the create slot button
   * Closes the dialog returning form data
   *
   * @memberof CreateSlotComponent
   */
  createSlot() {
    let cancelSlotCreation = false;
    const selectedGame = _find(this.games, { label: this.gameControl.value });
    if (selectedGame) {
      delete selectedGame.base64Img;
    }
    if (this.gameControl.value && !selectedGame) {
      // warn that the game was not on the list and will not be added to the stream slot
      const warningMessage = `Le jeu choisi : "${
        this.gameControl.value
      }" n'est pas dans la base et ne sera donc pas sélectionné pour ce stream !`;
      openWarningSnackBar({
        warningMessage,
        component: ErrorSnackBarComponent,
        snackBar: this.snackBar,
      });
    }
    let selectedStreamer;
    if (this.addForOther) {
      selectedStreamer = _find(this.streamers, { pseudo: this.streamerControl.value });
      if (this.streamerControl.value && !selectedStreamer) {
        // warn that the user was not on the list and the slot won't be created
        cancelSlotCreation = true;
        const warningMessage = `Le streamer choisi : ${
          this.streamerControl.value
        } n'est pas dans la base, le créneau ne peut pas être ajouté`;
        openWarningSnackBar({
          warningMessage,
          component: ErrorSnackBarComponent,
          snackBar: this.snackBar,
        });
      }
    }
    if (!cancelSlotCreation) {
      this.dialogRef.close({
        title: this.title,
        description: this.description,
        game: selectedGame,
        streamer: selectedStreamer
      });
    }
  }

  /**
   *  Precises if we have to display the add for other button
   * We have to display this button if the connectedUser is an admin
   *
   * @returns {boolean}
   * @memberof CreateSlotComponent
   */
  displayAddForOtherButton(): boolean {
    return this.connectedUser.roles.includes(ROLES.ADMIN);
  }

  handleOnClickAddForOther() {
    // gets streamers
    this.userActions.getStreamers();
    if (this.streamerSubscription) {
      this.streamerSubscription.unsubscribe();
    }
    this.streamerSubscription = this.streamers$.subscribe((streamers) => {
      this.streamers = streamers;
      if (this.streamers) {
        this.filteredStreamers = this.filterStreamers(this.streamerControl.value);
      }
      console.log(streamers);
      console.log(this.filteredStreamers);
    });
    this.addForOther = true;
  }

  handleOnClickAddForMyself() {
    this.addForOther = false;
  }
}
