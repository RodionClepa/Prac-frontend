import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApisService } from './apis.service';
import { AuthMethods } from '../../components/auth/shared/types/auth-methods.dictionary';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private apis: ApisService,
    private router: Router
  ) { }

  checkEmail(email: string) {
    return this.http.post(this.apis.register(), email);
  }

  validateSocialToken(token: string, authMethod: AuthMethods) {
    return this.http.post(this.apis.validateToken(), { token, authMethod });
  }

  setLoginParams(token: string) {
    sessionStorage.setItem("token", token);
    this.router.navigate(["/user/dashboard"]);
  }

  register(email: string, uuid: string, password: string) {
    return this.http.post(this.apis.register(), {email, uuid, password});
  }
}
