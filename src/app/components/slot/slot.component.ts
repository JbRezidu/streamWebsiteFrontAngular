import {Component, OnInit, Input, ElementRef, ViewChild, Renderer2} from '@angular/core';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent {

  private _slot;

  @Input()
  set slot(slot: any) {
    this._slot = slot;
    this.initSlot();
  }

  get slot() {
    return this._slot;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  initSlot() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', (this.slot.slot || {}).color || 'grey');
  }
}
