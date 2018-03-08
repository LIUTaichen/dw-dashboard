import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationStatusListComponent } from './installation-status-list.component';

describe('InstallationStatusListComponent', () => {
  let component: InstallationStatusListComponent;
  let fixture: ComponentFixture<InstallationStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
