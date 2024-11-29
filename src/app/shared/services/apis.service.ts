import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor() { }

  private api(): string {
    return "/api";
  }

  private auth(): string {
    return `/auth`;
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
    return `${this.api()}/api/me`
  }

  getTypes(): string {
    return `${this.api()}/transactions/types`
  }

  postTransaction(): string {
    return `${this.api()}/transactions`
  }

  getTransaction(): string {
    return `${this.api()}/transactions`
  }

  getMe(): string {
    return `${this.api()}/me`
  }
}
