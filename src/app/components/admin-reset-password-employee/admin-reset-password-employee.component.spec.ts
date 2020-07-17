import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResetPasswordEmployeeComponent } from './admin-reset-password-employee.component';

describe('AdminResetPasswordEmployeeComponent', () => {
  let component: AdminResetPasswordEmployeeComponent;
  let fixture: ComponentFixture<AdminResetPasswordEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminResetPasswordEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminResetPasswordEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
