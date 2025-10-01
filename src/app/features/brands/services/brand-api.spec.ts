import { TestBed } from '@angular/core/testing';

import { BrandApi } from './brand-api';

describe('BrandApi', () => {
  let service: BrandApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
