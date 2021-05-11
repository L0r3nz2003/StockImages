import { TestBed } from '@angular/core/testing';

import { ImagedisplayService } from './imagedisplay.service';

describe('ImagedisplayService', () => {
  let service: ImagedisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagedisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
