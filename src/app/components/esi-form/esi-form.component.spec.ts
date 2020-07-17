import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsiFormComponent } from './esi-form.component';

describe('EsiFormComponent', () => {
  let component: EsiFormComponent;
  let fixture: ComponentFixture<EsiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsiFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
