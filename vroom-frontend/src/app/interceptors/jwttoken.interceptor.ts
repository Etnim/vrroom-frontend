import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';

export const jWTtokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return authService.getUserIdToken().pipe(
    switchMap((token) => {
      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(authReq);
      } else {
        return next(req);
      }
    })
  );
};
