import { TestBed } from '@angular/core/testing';

import { CheckOrdersServices } from './check-orders-services';

describe('CheckOrdersServices', () => {
  let service: CheckOrdersServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckOrdersServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
