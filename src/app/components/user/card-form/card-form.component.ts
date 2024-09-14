import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss'
})
export class CardFormComponent {
  cardForm: FormGroup;

  constructor(private fb: NonNullableFormBuilder) {
    this.cardForm = this.fb.group({
      cardholder: this.fb.control('', [Validators.required]),
      cardnumber: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[0-9]{16}$') // 16-digit card number
      ]),
      expiry: this.fb.control('', [
        Validators.required,
        Validators.pattern('(0[1-9]|1[0-2])\/?([0-9]{2})$') // MM/YY format
      ]),
    });
  }

  submitCardForm() {
    console.log(this.cardForm.value);
  }
}
