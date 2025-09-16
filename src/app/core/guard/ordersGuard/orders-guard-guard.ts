import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../../services/auth/auth';

export const ordersGuardGuard: CanActivateFn = (route, state) => {
  const _Auth: Auth = inject(Auth);
  const _Router: Router = inject(Router);
  if (_Auth.userData.getValue()!=null) {
    return true;
  }
  _Router.navigate(["/login"])
  return false;
};
