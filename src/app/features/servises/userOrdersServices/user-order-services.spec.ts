import { TestBed } from '@angular/core/testing';

import { UserOrderServices } from './user-order-services';

describe('UserOrderServices', () => {
  let service: UserOrderServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserOrderServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
