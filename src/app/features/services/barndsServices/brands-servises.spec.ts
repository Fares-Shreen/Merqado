import { TestBed } from '@angular/core/testing';

import { BrandsServises } from './brands-servises';

describe('BrandsServises', () => {
  let service: BrandsServises;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandsServises);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
