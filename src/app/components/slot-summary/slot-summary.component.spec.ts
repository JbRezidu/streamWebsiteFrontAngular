import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotSummaryComponent } from './slot-summary.component';

describe('SlotSummaryComponent', () => {
  let component: SlotSummaryComponent;
  let fixture: ComponentFixture<SlotSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
