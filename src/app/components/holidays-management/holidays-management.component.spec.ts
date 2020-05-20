import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysManagementComponent } from './holidays-management.component';

describe('HolidaysManagementComponent', () => {
  let component: HolidaysManagementComponent;
  let fixture: ComponentFixture<HolidaysManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidaysManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
