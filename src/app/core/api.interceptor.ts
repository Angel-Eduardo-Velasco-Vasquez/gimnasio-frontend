import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req.clone({ withCredentials: true })).pipe(
    catchError(err => {
      // Sesión caducada: regresar al login (el API lo indica con 401)
      if (err.status === 401 && !req.url.includes('/auth/login')) {
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};