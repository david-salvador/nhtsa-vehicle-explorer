import { CanActivateFn } from '@angular/router';

export const routeGuard: CanActivateFn = (route, state) => {
  return true;
};
