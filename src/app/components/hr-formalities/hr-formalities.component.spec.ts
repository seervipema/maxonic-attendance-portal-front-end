import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrFormalitiesComponent } from './hr-formalities.component';

describe('HrFormalitiesComponent', () => {
  let component: HrFormalitiesComponent;
  let fixture: ComponentFixture<HrFormalitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrFormalitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrFormalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
