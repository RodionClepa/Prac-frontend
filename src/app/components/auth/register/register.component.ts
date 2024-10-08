import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { GoogleAuthService } from '../../../shared/services/social-auth/google-auth.service';
import { FacebookAuthService } from '../../../shared/services/social-auth/facebook-auth.service';
import { AbstractControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ContentPageComponent } from "../shared/content-page/content-page.component";
import { AuthService } from '../../../shared/services/auth.service';
import { first } from 'rxjs';
import { AuthMethods } from '../shared/types/auth-methods.dictionary';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ContentPageComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form: FormGroup;
  responseMessage: string = "";
  isError: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    public googleService: GoogleAuthService,
    public facebookService: FacebookAuthService,
    private fb: NonNullableFormBuilder,
    private authService: AuthService) {
    this.form = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email.bind(Validators)]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
        this.strongPasswordValidator
      ]),
    });
  }

  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    return !valid
      ? { strongPassword: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.' }
      : null;
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
      next: (response) => {
        this.authService.setLoginParams(response as string)
      },
      error: (error) => {
        console.error(error);
        if (error.status === 403) {
          this.responseMessage = 'Something Went Wrong';
        }

        else if (error.status === 409) {
          this.responseMessage = 'Account already exists';
        }
        this.isError = true;
      }
    });
  }

  async handleFacebookLogin() {
    try {
      const res = await this.facebookService.handleFacebookLogin();
      const facebookToken = res.accessToken;
      this.authService.validateSocialToken(facebookToken, AuthMethods.FACEBOOK).pipe(first()).subscribe({
        next: (response) => {
          this.authService.setLoginParams(response as string)
        },
        error: (error) => {
          console.error(error);
          if (error.status === 403) {
            this.responseMessage = 'Something Went Wrong';
          }

          else if (error.status === 409) {
            this.responseMessage = 'Account already exists';
          }
          this.isError = true;
        }
      });
    } catch (error) {
      console.error('Error fetching Facebook user info:', error);
    }
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.getRawValue());
    const { username, email, password } = this.form.getRawValue();
    this.isError = false;
    this.authService.checkEmail(username, email, password).pipe(first()).subscribe({
      next: (response) => {
        this.responseMessage = "Check your inbox to confirm your email.";
      },
      error: (error) => {
        console.error(error);
        if (error.status === 409) {
          this.responseMessage = "Account already exists.";
        }
        this.isError = true;
      }
    });
  }
}
