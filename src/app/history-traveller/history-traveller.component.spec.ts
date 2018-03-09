import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTravellerComponent } from './history-traveller.component';

describe('HistoryTravellerComponent', () => {
  let component: HistoryTravellerComponent;
  let fixture: ComponentFixture<HistoryTravellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryTravellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTravellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
