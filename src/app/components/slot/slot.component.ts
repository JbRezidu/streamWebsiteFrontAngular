import { Component, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import {ISlot, IUser} from '../../shared/interfaces';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss'],
})
export class SlotComponent {
  private _slot: ISlot;

  @Input()
  set slot(slot: ISlot) {
    this._slot = slot;
    this.initSlot();
  }

  get slot(): ISlot {
    return this._slot;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  initSlot() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'backgroundColor',
      (this.slot.streamer || <IUser>{}).color || 'grey'
    );
  }
}
