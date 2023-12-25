import { TestBed } from '@angular/core/testing';

import { OcrApiService } from './ocr-api.service';

describe('OcrApiService', () => {
  let service: OcrApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcrApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
