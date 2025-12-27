import { TestBed } from '@angular/core/testing';

import { ProduitservicesService } from './api.service';

describe('ProduitservicesService', () => {
  let service: ProduitservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
