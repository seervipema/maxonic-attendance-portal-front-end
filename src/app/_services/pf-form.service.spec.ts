import { TestBed, inject } from '@angular/core/testing';

import { PfFormService } from './pf-form.service';

describe('PfFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PfFormService]
    });
  });

  it('should be created', inject([PfFormService], (service: PfFormService) => {
    expect(service).toBeTruthy();
  }));
});
