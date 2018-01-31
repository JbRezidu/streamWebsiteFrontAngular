import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {

  @Input()
  slot: any;

  @ViewChild('slotRef') slotRef: ElementRef;

  constructor() { }

  ngOnInit() {
    console.log(this.slotRef);
    this.slotRef.nativeElement.style.backgroundColor = (this.slot.slot || {}).color || 'grey';
  }
}
