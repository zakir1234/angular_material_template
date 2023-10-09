import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const token = localStorage.getItem('token');
  const authService = new UserAuthService();

  if (token != null && token) {
    const role = route.data['roles'] as Array<string>;

    if (role) {
      let match = authService.isMatched(role);
      if (match) {
        return true;
      } else {
        router.navigate(['/forbidden']);
        return false;
      }
    }
    return false;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
