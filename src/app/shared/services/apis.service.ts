import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor() { }

  private api(): string {
    return 'api';
  }

  private auth(): string {
    return `${this.api()}/auth`;
  }

  login(): string {
    return `${this.auth()}/login`
  }

  register(): string {
    return `${this.auth()}/register`
  }

  registerConfirm(): string {
    return `${this.auth()}/register-confirm`
  }

  validateToken(): string {
    return `${this.auth()}/validate-token`
  }
}
