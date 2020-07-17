import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationRequestComponent } from './resignation-request.component';

describe('ResignationRequestComponent', () => {
  let component: ResignationRequestComponent;
  let fixture: ComponentFixture<ResignationRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResignationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
