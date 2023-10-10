import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('_saBareFans');
  const userToken = localStorage.getItem('_saBareUser');
  const router = new Router();
  if (token && userToken) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
