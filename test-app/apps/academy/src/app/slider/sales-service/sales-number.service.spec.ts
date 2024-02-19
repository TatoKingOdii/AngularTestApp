import { TestBed } from '@angular/core/testing';

import { SalesNumberService } from './sales-number.service';

describe('SalesNumberService', () => {
  let service: SalesNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
