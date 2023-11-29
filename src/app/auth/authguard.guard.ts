


import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TodoService } from './todo.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(TodoService);
  const router = inject(Router);
  if (!authService.isLogin()) {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
