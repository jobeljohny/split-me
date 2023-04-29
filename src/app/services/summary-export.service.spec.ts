import { TestBed } from '@angular/core/testing';

import { SummaryExportService } from './summary-export.service';

describe('SummaryExportService', () => {
  let service: SummaryExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummaryExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
