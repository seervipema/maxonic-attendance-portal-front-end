import { TestBed, inject } from '@angular/core/testing';

import { HrFormalitiesService } from './hr-formalities.service';

describe('HrFormalitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrFormalitiesService]
    });
  });

  it('should be created', inject([HrFormalitiesService], (service: HrFormalitiesService) => {
    expect(service).toBeTruthy();
  }));
});
