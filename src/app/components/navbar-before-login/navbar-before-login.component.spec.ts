import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBeforeLoginComponent } from './navbar-before-login.component';

describe('NavbarBeforeLoginComponent', () => {
  let component: NavbarBeforeLoginComponent;
  let fixture: ComponentFixture<NavbarBeforeLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarBeforeLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarBeforeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
