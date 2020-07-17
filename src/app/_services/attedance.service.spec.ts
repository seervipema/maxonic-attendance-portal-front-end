import { TestBed, inject } from '@angular/core/testing';

import { AttedanceService } from './attedance.service';

describe('AttedanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttedanceService]
    });
  });

  it('should be created', inject([AttedanceService], (service: AttedanceService) => {
    expect(service).toBeTruthy();
  }));
});
