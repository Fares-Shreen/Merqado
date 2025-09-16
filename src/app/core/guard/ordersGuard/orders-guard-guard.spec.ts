import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ordersGuardGuard } from './orders-guard-guard';

describe('ordersGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ordersGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
