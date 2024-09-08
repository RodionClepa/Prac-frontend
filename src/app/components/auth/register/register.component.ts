import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { GoogleAuthService } from '../../../shared/services/social-auth/google-auth.service';
import { FacebookAuthService } from '../../../shared/services/social-auth/facebook-auth.service';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentPageComponent } from "../shared/content-page/content-page.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ContentPageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form: FormGroup;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  public googleService: GoogleAuthService,
  public facebookService: FacebookAuthService,
  private fb: NonNullableFormBuilder) {
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
    console.log(response)
    console.log('ID Token:', response.credential);
    const responsePayload = this.googleService.decodeJwtResponse(response.credential);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
  }

  handleFacebookLogin() {
    const res = this.facebookService.handleFacebookLogin();
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.getRawValue());
  }
}
