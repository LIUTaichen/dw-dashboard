import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationStatusMapComponent } from './installation-status-map.component';

describe('InstallationStatusMapComponent', () => {
  let component: InstallationStatusMapComponent;
  let fixture: ComponentFixture<InstallationStatusMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationStatusMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationStatusMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
