import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const userApiInterceptor: HttpInterceptorFn = (req, next) => {
  const url = new URL(req.url, window.location.origin);
  if (url.pathname.startsWith('/auth')) return next(req);
  console.log("userApiInterceptor");
  const token = localStorage.getItem("token");
  const router = inject(Router);
  if (!token) {
    router.navigate(['/auth/login']);
    console.log("if")
  }
  console.log(token)
  const apiRequest = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });
  console.log(apiRequest)

  // send cloned request with header to the next handler.
  return next(apiRequest);
};
