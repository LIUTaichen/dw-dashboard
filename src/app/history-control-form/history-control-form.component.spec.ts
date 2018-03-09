import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryControlFormComponent } from './history-control-form.component';

describe('HistoryControlFormComponent', () => {
  let component: HistoryControlFormComponent;
  let fixture: ComponentFixture<HistoryControlFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryControlFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryControlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
