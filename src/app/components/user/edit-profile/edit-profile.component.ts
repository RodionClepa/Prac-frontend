import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../shared/services/client.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  editInfoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService, private router: Router) {
    this.editInfoForm = this.formBuilder.group({
      username: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.editInfoForm.valid) {
      this.clientService.editProfile(this.editInfoForm.value).subscribe({
        next: (response: any) => {
        },
        error: (error) => {
          console.error(error);
        }
      });
      
    } else {
      console.log('Form is invalid');
    }
  }

  goBack(): void {
    console.log('Going back to the previous page');
  }
}
