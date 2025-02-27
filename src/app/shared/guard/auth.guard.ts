import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { ClientService } from '../services/client.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private clientService: ClientService, private cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    console.log("canActivate")
    const token = this.cookieService.get('token');
    // const token = localStorage.getItem("token");
    if (!token) {
      console.log(token);
      console.log("if")
      this.router.navigate(['/auth/login']);
      return false;
    }
    console.log(token);
    return new Observable<boolean>((observer) => {
      this.clientService.checkJwt().subscribe({
        next: (response) => {
          return true;
        },
        error: (error) => {
          this.cookieService.delete('token');
          // localStorage.removeItem("token");
          this.router.navigate(['/auth/login']);
          return false;
        }
      });
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    console.log("canActivateChild")
    return this.canActivate(route, state);
  }
}