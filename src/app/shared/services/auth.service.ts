import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApisService } from './apis.service';
import { AuthMethods } from '../../components/auth/shared/types/auth-methods.dictionary';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private apis: ApisService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  checkEmail(username: string, email: string, password: string) {
    return this.http.post(this.apis.register(), {username, email, password}, { responseType: 'text' });
  }

  validateSocialToken(token: string, authMethod: AuthMethods) {
    return this.http.post(this.apis.validateToken(), { token, authMethod });
  }

  setLoginParams(token: string) {
    const isProd = environment.production;
    if (isProd) {
      this.cookieService.set('token', token, 1, '/', 'your-domain.com', true, 'None');
    } else {
      this.cookieService.set('token', token, 1, '/');
    }
    // localStorage.setItem("token", token);
    this.router.navigate(["/user/my-profile"]);
  }

  register(uuid: string, email: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apis.registerConfirm(), {uuid, email}, {headers});
  }

  login(email: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apis.login(), {email, password}, {headers});
  }

}
