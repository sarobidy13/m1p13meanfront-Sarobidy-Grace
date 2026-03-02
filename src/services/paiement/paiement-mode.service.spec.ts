import { TestBed } from '@angular/core/testing';

import { PaiementModeService } from './paiement-mode.service';

describe('PaiementModeService', () => {
  let service: PaiementModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaiementModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
