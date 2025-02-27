import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ContentPageComponent } from "../shared/content-page/content-page.component";
import { isPlatformBrowser } from '@angular/common';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoogleAuthService } from '../../../shared/services/social-auth/google-auth.service';
import { FacebookAuthService } from '../../../shared/services/social-auth/facebook-auth.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment.development';
import { AuthMethods } from '../shared/types/auth-methods.dictionary';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ContentPageComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  userMessage: string = "";

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    public googleService: GoogleAuthService,
    public facebookService: FacebookAuthService,
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService) {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email.bind(Validators)]),
      password: this.fb.control('', [Validators.required.bind(Validators)]),
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.googleService.loadGoogleSignInScript(this.handleGoogleCredentialResponse.bind(this));
      this.facebookService.loadFacebookSDK();
    }
  }

  handleGoogleCredentialResponse(response: any) {
    const token: string = response.credential;
    this.authService.validateSocialToken(token, AuthMethods.GOOGLE).pipe(first()).subscribe({
      next: (response: any) => {
        console.log(response);
        this.authService.setLoginParams(response.token)
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  handleFacebookLogin() {
    const res = this.facebookService.handleFacebookLogin();
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.getRawValue());
    const { email, password } = this.form.getRawValue();
    this.userMessage = "Loading...";
    this.authService.login(email, password).subscribe({
      next: (response: any) => {
        console.log(response.token)
        const isProd = environment.production;
        if (isProd) {
          this.cookieService.set('token', response.token, 1, '/', 'your-domain.com', true, 'None');
        } else {
          this.cookieService.set('token', response.token, 1, '/');
        }
        this.userMessage = "Redirecting to home";
        // localStorage.setItem("token", response.token);
        this.router.navigate(['/user/my-profile']);
      },
      error: (error) => {
        console.error(error);
        if (error.status === 404) this.userMessage = "Invalid Data"
      }
    });
  }
}
