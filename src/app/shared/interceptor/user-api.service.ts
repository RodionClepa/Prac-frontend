import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem("token");
    if (token) {
      this.router.navigate(['/auth/login']);
    }

    const apiRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    // send cloned request with header to the next handler.
    return next.handle(apiRequest);
  }
}
