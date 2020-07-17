import { TestBed, inject } from '@angular/core/testing';

import { ImageSliderDataService } from './image-slider-data.service';

describe('ImageSliderDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageSliderDataService]
    });
  });

  it('should be created', inject([ImageSliderDataService], (service: ImageSliderDataService) => {
    expect(service).toBeTruthy();
  }));
});
