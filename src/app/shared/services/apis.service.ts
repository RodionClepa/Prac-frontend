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
    return `/auth/social-login`
  }

  getTypes(): string {
    return `${this.api()}/transactions/types`
  }

  putProfile(): string {
    return `${this.api()}/me`
  }

  postTransaction(): string {
    return `${this.api()}/transactions`
  }

  deleteTransaction(): string {
    return `${this.api()}/transactions`
  }

  getTransaction(): string {
    return `${this.api()}/transactions`
  }

  getMe(): string {
    return `${this.api()}/me`
  }
}
