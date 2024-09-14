import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentPageComponent } from '../shared/content-page/content-page.component';
import { AuthMethods } from '../shared/types/auth-methods.dictionary';
import { AuthService } from '../../../shared/services/auth.service';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-confirm',
  standalone: true,
  imports: [ReactiveFormsModule, ContentPageComponent, CommonModule],
  templateUrl: './register-confirm.component.html',
  styleUrl: './register-confirm.component.scss'
})
export class RegisterConfirmComponent {
  uuid: string = '';
  email: string = '';
  form: FormGroup;
  passwordMismatch: boolean = false;
  responseMessage: string = "";
  isError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private authMethod: AuthService
  ) {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    if (!queryParams['uuid'] || !queryParams['name'] || !queryParams['email']) {
      this.router.navigate(['ro/not-found']);
    }
    this.uuid = decodeURIComponent(queryParams['uuid'] || '');
    this.email = decodeURIComponent(queryParams['email'] || '');

    this.form = this.fb.group({
      password: this.fb.control(''),
      confirmationPassword: this.fb.control(''),
    });
  }

  register() {
    const formValue = this.form.getRawValue();
    const password = formValue.password;
    const passwordConfirmation = formValue.passwordConfirmation;
    if (password !== passwordConfirmation) {
      this.passwordMismatch = true;
      return;
    }
    this.passwordMismatch = false;
    console.log("Passwords")
    console.log(password)
    console.log(passwordConfirmation)

    this.authMethod.register(this.email, this.uuid, password).pipe(first()).subscribe({
      next: (response) => {
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error(error);
        if (error.status === 409) {
          this.responseMessage = "Something went wrong";
        }
        this.isError = true;
      }
    });
  }

}
