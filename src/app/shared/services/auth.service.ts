import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  checkEmail(username: string, email: string, password: string) {
    return this.http.post(this.apis.register(), {username, email, password}, { responseType: 'text' });
  }

  validateSocialToken(token: string, authMethod: AuthMethods) {
    return this.http.post(this.apis.validateToken(), { token, authMethod });
  }

  setLoginParams(token: string) {
    localStorage.setItem("token", token);
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
