import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  editInfoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.editInfoForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.editInfoForm.valid) {
      console.log('Form Value:', this.editInfoForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  goBack(): void {
    console.log('Going back to the previous page');
  }
}
