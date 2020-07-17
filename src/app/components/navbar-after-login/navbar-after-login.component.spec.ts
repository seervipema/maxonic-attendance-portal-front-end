import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAfterLoginComponent } from './navbar-after-login.component';

describe('NavbarAfterLoginComponent', () => {
  let component: NavbarAfterLoginComponent;
  let fixture: ComponentFixture<NavbarAfterLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarAfterLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarAfterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
