import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../shared/services/client.service';

export interface Transaction {
  isExpense: boolean;
  type: string;
  amount : number;
  description: string;
}

@Component({
  selector: 'app-add-transactions',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-transactions.component.html',
  styleUrl: './add-transactions.component.scss'
})
export class AddTransactionsComponent {
  transactionForm: FormGroup;

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.transactionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: [''],
      type: ['', Validators.required],
      isExpense: [true],
    });
  }

  options: any = []

  ngOnInit(): void {
    this.clientService.getTypes().subscribe({
      next: (response) => {
        console.log(response);
        this.options = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onSubmit(): void {
    console.log(this.transactionForm.valid)
    if (!this.transactionForm.valid) return;
    const transaction: Transaction = this.transactionForm.value;
    this.clientService.postTransaction(transaction).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
