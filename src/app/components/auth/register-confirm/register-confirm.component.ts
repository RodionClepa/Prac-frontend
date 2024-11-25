import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentPageComponent } from '../shared/content-page/content-page.component';
import { AuthService } from '../../../shared/services/auth.service';
import { first } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register-confirm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-confirm.component.html',
  styleUrl: './register-confirm.component.scss'
})
export class RegisterConfirmComponent {
  uuid: string = '';
  email: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID to detect where the code is running
  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (!params['uuid'] || !params['email']) {
        this.router.navigate(['/404']);
      }
      this.uuid = params['uuid'] || '';
      this.email = params['email'] || '';

      if (isPlatformBrowser(this.platformId)) {
        this.authService.register(this.uuid, this.email).subscribe({
          next: (response: any) => {
            console.log(response.token)
            const isProd = environment.production;
            if (isProd) {
              this.cookieService.set('token', response.token, 1, '/', 'your-domain.com', true, 'None');
            } else {
              this.cookieService.set('token', response.token, 1, '/');
            }
            // localStorage.setItem("token", response.token);
            this.router.navigate(['/user/my-profile']);
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
    });
  }
}
