import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {Router} from "@angular/router";
import {inject} from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment.development';

// TODO remove wiki
const ALLOWED_URLS = ['/auth', '/api/public', '/api/wiki'];

export const userApiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  console.log(req.url)

  if (ALLOWED_URLS.some(allowedUrl => req.url.startsWith(allowedUrl))) {
    const modifiedReq = req.clone({
      url: environment.apiUrl + req.url
    });
    return next(modifiedReq);
  };
  const cookieService = inject(CookieService);
  const token = cookieService.get('token');
  const router = inject(Router);
  console.log(token)

  if (!token) {
    router.navigate(['/auth/login']);
    return EMPTY;
  }

  const apiRequest = req.clone({
    url: environment.apiUrl + req.url,
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  return next(apiRequest);
};
