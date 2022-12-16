import { TestBed } from '@angular/core/testing';

import { CalculateTaxService } from './calculate-tax.service';

describe('CalculateTaxService', () => {
  let service: CalculateTaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateTaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
