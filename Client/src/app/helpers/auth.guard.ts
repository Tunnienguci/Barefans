import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('_saBareFans');
  if (token) {
    return true;
  } else {
    return false;
  }
};
