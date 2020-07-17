import { TestBed, inject } from '@angular/core/testing';

import { ImageSliderService } from './image-slider.service';

describe('ImageSliderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageSliderService]
    });
  });

  it('should be created', inject([ImageSliderService], (service: ImageSliderService) => {
    expect(service).toBeTruthy();
  }));
});
