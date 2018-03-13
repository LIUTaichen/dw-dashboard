import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySearchResultComponent } from './history-search-result.component';

describe('HistorySearchResultComponent', () => {
  let component: HistorySearchResultComponent;
  let fixture: ComponentFixture<HistorySearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorySearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorySearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
